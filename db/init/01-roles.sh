#!/bin/bash
(
	set -euo pipefail

psql_as_super(){
		psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" "$@"
	}
	psql_as_super --dbname postgres \
		-v admin_pw="$PORTFOLIO_ADMIN_PASWORD" \
		-v ro_pw="$PORTFOLIO_RO_PASSWORD" <<'SQL'
CREATE ROLE portfolio_admin LOGIN PASSWORD :'admin_pw';
CREATE ROLE portfolio_ro    LOGIN PASSWORD :'ro_pw';
SQL
	IFS=',' read -ra extras <<< "${EXTRA_DATABASES:-}"
	for db in "${extras[@]}"; do
		db="${db// /}"
		[ -z "$db" ] && continue
		psql_as_super --dbname postgres -v db="$db" <<'SQL'
CREATE DATABASE :"db";
SQL
	done
	 for db in "$POSTGRES_DB" "${extras[@]}"; do
		db="${db// /}"
		[ -z "$db" ] && continue
		psql_as_super --dbname "$db" -v db="$db" <<'SQL'
ALTER DATABASE :"db" OWNER TO portfolio_admin;
REVOKE ALL ON DATABASE :"db" FROM PUBLIC;
GRANT CONNECT ON DATABASE :"db" TO portfolio_ro;
GRANT USAGE ON SCHEMA public TO portfolio_ro;
ALTER DEFAULT PRIVILEGES FOR ROLE portfolio_admin IN SCHEMA public
  GRANT SELECT ON TABLES TO portfolio_ro;
SQL
	done
)
