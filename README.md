# A web portfolio built with a React, Typescript, Oxlint frontend. Python middleware, and a PostgreSQL database.
Development - staging.ajrtech.dev\
Production - portfolio.ajrtech.dev\
Domain: ajrtech.dev - Cloudflare

## CICD
Github runner:
On push. Runner pulls code, cd's to the deployment path, pulls down changes, npm install, npm run dev -- --host

## Learning notes
WSL2 was preventing the site from being reachable. (likely due to firewalls)

## TODO
In no particular order
1. When user clicks a link (LinkedIn, Github, Email, Github), collect UID from header, send get request to a middleware API (inside /web-portfolio/middleware) that then sends a get request to a backend (inside /web-portfolio/backend) backend is going to be a postgreSQL database
2. Make staging.ajrtech.dev exclusivly available if VPN enabled back to home server.
3. Make postgreSQL tables for development and production sites. with RBAC. (Roles: Admin: Read Write, only from inside server; ro, Read only, what middleware will use)
