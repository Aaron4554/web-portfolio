BEGIN;

CREATE TABLE personal_links(
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text    NOT NULL UNIQUE,
  link       text    NOT NULL
             CHECK (link ~ '^(https://|mailto:|/[^/])'),
  sort_order integer NOT NULL DEFAULT 0
);

COMMIT;
