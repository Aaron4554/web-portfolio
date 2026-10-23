# A web portfolio project built with React, Typescript, Oxlint.
Development - staging.ajrtech.dev\
Production - portfolio.ajrtech.dev\
Domain: ajrtech - Cloudflare

## CICD
Github runner:
Runners (to be) implemented in both Development and Production environments.

## TODO
1. Install Nginx - change `npm run dev` to `npm run host`. using dev is just for initial ease of use
2. <Get a VPC (Virtual Private Cloud) to host Nginx, VPN back to home server.> This may not be needed. Since the Cloudflare tunnel hides my Home IP addresses; would be useful for load balencing though. Home server hosts frontend. When a User clicks a link, their UID from their header needs to be grabbed and request post requested to a middleware API; that, after verification, sends a get request to a backend database.
3. Make staging.ajrtech.ev only available if VPN enabled back to home server.
