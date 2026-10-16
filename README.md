# A web portfolio built with React, Typescript, Oxlint.
Development - Self hosted at staging.ajrtech.dev\
Production - portfolio.ajrtech.dev\
Domain: ajrtech.dev - Cloudflare\

## CICD
Github runner
On push. Runner pulls code, cd's to the deployment path, pulls down changes, npm install, npm run dev -- --host

## TODO
install Nginx - then change `npm run dev` to `npm run host`. else, the runner will run forever... also, best practice

## Learning notes
WSL's firewall blocks the ports I use, making sites (or containers I run) non-existant.\
So The staging site is hosted on my server (R720).

Right now to get changes over. git push origin <branch_name>, ssh into the server, git pull origin <branch_name>. Soon it will just be git push, then a github runner will pull the changes to the server.

The site is reachable thanks to a Cloudflare tunnel. And editing the vite.config.ts to include 'server: {allowedHosts: ['.ajrtech.dev'],},'


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
