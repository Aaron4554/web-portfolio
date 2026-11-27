BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'valid_link'
    ) THEN
        CREATE DOMAIN valid_link AS text
        CHECK (VALUE ~'^(https://|mailto:|/([^/]|$))');
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS certifications(
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text   NOT NULL UNIQUE,
  link       valid_link NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects(
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text   NOT NULL UNIQUE,
  link       valid_link NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS social_links(
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text   NOT NULL UNIQUE,
  link       valid_link NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS resume(
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text   NOT NULL UNIQUE,
  link       valid_link NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS schema_migrations (
  filename  text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

COMMIT;
