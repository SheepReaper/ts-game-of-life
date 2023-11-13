[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# Typescript + p5.js quick-start template

This template is a variation of [this template](https://github.com/SheepReaper/typescript-quickstart) that includes a wrapped version of p5.js (p5i) and a canvas all ready to go.

This template allows you to just start coding in src/index.ts and live-edit an app without having to mess about with dependencies.

This template provides lots of help as well:

Features:

- Yarn 2 - awesome package manager, configured for zero-install
- Prettier - tidy up your code
- Eslint - find design-time errors
- Yarn sdks (IDE support) - allow eslint, prettier, typescript, and their respective vscode extensions to use yarn 2's virtual packages
- Parcel - this bundler can build an run your application with HMR support. It can also build a static version, ready to be served.

Usage:

Put your code into src/index.ts

```shell
yarn dev
```

Will start parcel's development server after building your app.

You can then (if using vscode) hit F5 to start a debugging session from vscode, launching chrome to browse your app.

Alternatively:

```shell
yarn build
```

Will build and output your app to dist/ ready to be served.