#!/usr/bin/env bash
set -euo pipefail

DB="${1:?usage: bash/db/migrate.sh <database name>}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/migrations"
PSQL=(psql -h 127.0.0.1 -p 5432 -U portfolio_admin -d "$DB" -X -q -v ON_ERROR_STOP=1)

"${PSQL[@]}" -c "CREATE TABLE IF NOT EXISTS schema_migrations (
  filename  text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
)"

shopt -s nullglob
for file in "$DIR"/*.sql; do
	name="$(basename "$file")"

	[[ "$name" =~ ^[0-9A-Za-z_.-]+\.sql$ ]] || { echo "Bad migrations file name: $name" >&2; exit 1; }

	already="$("${PSQL[@]}" -tA -c "SELECT 1 FROM schema_migrations WHERE filename = '$name'")"
	[ -n "$already" ] && continue

	echo "Applying $name to $DB"
	"${PSQL[@]}" --single-transaction -f "$file" \
	  -c "INSERT INTO schema_migrations (filename) VALUES ('$name')"
done

echo "Database $DB is up to date."
