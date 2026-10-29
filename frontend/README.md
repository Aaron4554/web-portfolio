# A web portfolio built with React, Typescript, Oxlint.
Development - Self hosted at staging.ajrtech.dev\
Production - portfolio.ajrtech.dev\
Domain: ajrtech.dev - Cloudflare

## CICD
Github runner:
On push. Runner pulls code, cd's to the deployment path, pulls down changes, npm install, npm run dev -- --host.

## TODO - In no particular order
1. Home server holds front end (currently the entire folder of web-portfolio, should move everything in here to /web-portfolio/frontend). When user clicks a link (LinkedIn, Github, Email, Github), collect UID from header, send post request to a middleware API (inside /web-portfolio/middleware) that then sends a get request to a backend (inside /web-portfolio/backend) backend being a simple python script that grabs from a file, or better, a SQL/noSQL database.
2. Add a 'click' event to tiles. mouseDown event - Raise tile stright up. mouseUp event - Drop tile, *waves wow*.
3. For tiles with links. mouseDown event - Raise tile straight up. mouseUp event - turn tile (lightmode: white; darkmode: grey) and expand to fill screen. Then open link in same page.

## Learning notes
WSL's firewall blocks the ports I use, making sites (or containers I run) non-existant.\
The staging site is hosted on my server (R720).

The site is reachable thanks to a Cloudflare tunnel. And editing the vite.config.ts to include 'server: {allowedHosts: ['.ajrtech.dev'],},'
Github Runner does and should have it's own user account.
The site folders do and should have group access controlls.

TODO #1. this is to prevent XSS.
