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
1.Home server hosts frontend. When a User clicks a link, their UID from their header needs to be grabbed and request post requested to a middleware API; that, after verification, sends a get request to a backend database.
2. Make staging.ajrtech.dev exclusivly available if VPN enabled back to home server.
