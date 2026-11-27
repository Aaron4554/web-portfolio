# Database (backend) readme
While it would be easier to use static links, I wanted to make this site more than just a self hosted react frontend. That could have been accomplished with an API that grabs from a .json, I want some experince working with postgreSQL and SQL in general.

Backend is two PostgreSQL databases (prod | dev) holding:\
links to: Certification verification, Github Repositories, Github Profile, and Linkedin.\
A PDF of my resume.

## Folder structure
```
db/
  |- init/
    |- 01-roles.sh
  |- migrations/
    |-001_init.sql
    |-002_...sql
  migrate.sh
  seed.sql
  docker-compose.yml
  .env.example
```

## Database structure
Domains:
valid_link

certifications | projects | social_links | resume
| Column | Data Type | Contraints | Description |
| --- | --- | --- | --- |
| id | integer | PRIMARY KEY | Unique identifier |
| name | TEXT | NOT NULL UNIQUE | name |
| link | valid_link | NOT NULL | link to cert validation |
| sort order | NOT NULL default 0 | sort the items |

schema_migrations
| Column | Data Type | Contraints | Description |
| --- | --- | --- | --- |
| filename | text | PRIMARY KEY | name of .sql ran |
| applied_at | timestampz | NOT NULL | time .sql ran |

## PostgreSQL accounts
portfolio_admin - Read and write permissions\
portfolio_ro - Read only permissions, this is what middleware will use, and the only thing the frontend/users will have access to

### TODO
