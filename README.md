# A web portfolio project built with React, Typescript, Oxlint.
Development - staging.ajrtech.dev\
Production - portfolio.ajrtech.dev\
Domain: ajrtech.dev - Cloudflare

## CICD
Github runner:
Runner is implemented in Development and will be in Production once prod is stood up.
On push. Runner pulls code, cd's to the deployment path, pulls down changes, npm install, npm run dev -- --host

## Learning notes
WSL's firewall blocks the ports I use, making sites (or containers I run) non-existant.\
The staging site is hosted on my server (R720).

## TODO
1. Home server holds front end (currently the entire folder of web-portfolio, should move everything in here to /web-portfolio/frontend). When user clicks a link (LinkedIn, Github, Email, Github), collect UID from header, send post request to a middleware API (inside /web-portfolio/middleware) that then sends a get request to a backend (inside /web-portfolio/backend) backend being a simple python script that grabs from a file, or better, a SQL/noSQL database.
2. Make staging.ajrtech.dev exclusivly available if VPN enabled back to home server.
