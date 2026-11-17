# Database (backend) readme

Backend is going to be PostgreSQL holding:
links to: Certification verification, Github Repositories, Github Profile, and Linkedin. 
A PDF of my resume.

Folder structure:
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

PostgreSQL accounts:
portfolio_admin - Read and write permissions
portfolio_ro - Read only permissions, this is what middleware will use, and the only thing the frontend/users will have access to
