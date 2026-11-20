# Database (backend) readme
While it would be easier to use static links, I wanted to make this site more than just a self hosted react frontend. That could have been accomplished with an API that grabs from a .json, I want some experince working with postgreSQL and SQL in general.

Backend is going to be PostgreSQL holding:\
links to: Certification verification, Github Repositories, Github Profile, and Linkedin.\
A PDF of my resume.

## Folder structure:
```
db/
  |- init/
    |- 01-roles.sh
  |- migrations/
    |-001_init.sql
    |-002_...sql
  seed.sql
  docker-compose.yml
  .env.example
```

## Database structure

| Column | Data Type | Contraints | Description |
| --- | --- | --- | --- |
| ID | SERIAL | PRIMARY KEY | Unique identifier |
| sites | VARCHAR(255) | NOT NULL | href of site |
| Resume | TEXT | NULL | /path/to/resume.pdf |

## PostgreSQL accounts:
portfolio_admin - Read and write permissions\
portfolio_ro - Read only permissions, this is what middleware will use, and the only thing the frontend/users will have access to

### TODO
1. Write seed.sql
2. make deploy action run sql scripts
