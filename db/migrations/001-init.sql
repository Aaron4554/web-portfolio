BEGIN;

CREATE TABLE IF NOT EXISTS personal_links(
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text    NOT NULL UNIQUE,
  link       text    NOT NULL
             CHECK (link ~ '^(https://|mailto:|/([^/]|$))'),
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS schema_migrations (
  filename  text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

COMMIT;
