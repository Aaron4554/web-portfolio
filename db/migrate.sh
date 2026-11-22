#!/usr/bin/env bash
set -euo pipefail

DB="${1:?usage: bash db/migrate.sh <database name>}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$HERE/migrations"
COMPOSE="$HERE/docker-compose.yml"

run_psql() {
  sudo /usr/bin/docker compose -f "$COMPOSE" exec -T postgres \
    psql -h 127.0.0.1 -p 5432 -U portfolio_admin -d "$DB" -X -q -v ON_ERROR_STOP=1
}

run_psql <<'SQL'
CREATE TABLE IF NOT EXISTS schema_migrations (
  filename   text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);
SQL

applied="$(printf '%s\n' \
  '\pset tuples_only on' \
  '\pset format unaligned' \
  'SELECT filename FROM schema_migrations;' | run_psql)"

shopt -s nullglob
for file in "$DIR"/*.sql; do
  name="$(basename "$file")"

  [[ "$name" =~ ^[0-9A-Za-z_.-]+\.sql$ ]] || { echo "Bad migration file name: $name" >&2; exit 1; }

  if grep -qxF -- "$name" <<< "$applied"; then
    continue
  fi

  echo "Applying $name to $DB"
  {
    echo "BEGIN;"
    cat "$file"
    echo
    echo "INSERT INTO schema_migrations (filename) VALUES ('$name');"
    echo "COMMIT;"
  } | run_psql
done

echo "Database $DB is up to date."
