# A web portfolio project built with React, Typescript, Oxlint.
Development - staging.ajrtech.dev\
Production - portfolio.ajrtech.dev\
Domain: ajrtech - Cloudflare

## CICD
<<<<<<< HEAD
Github runner:
Runners (to be) implemented in both Development and Production environments.
=======
Github runner
On push. Runner pulls code, cd's to the deployment path, pulls down changes, npm install, npm run dev -- --host

## TODO
Install Nginx - then change `npm run dev` to `npm run host`. else, the runner will run forever... also, best practice

## Learning notes
WSL's firewall blocks the ports I use, making sites (or containers I run) non-existant.\
So The staging site is hosted on my server (R720).
>>>>>>> 3f145e3 (Readme update)

## TODO
1.Home server hosts frontend. When a User clicks a link, their UID from their header needs to be grabbed and request post requested to a middleware API; that, after verification, sends a get request to a backend database.
2. Make staging.ajrtech.ev only available if VPN enabled back to home server.
