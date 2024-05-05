# poeditor-client

Unofficial node client for PO Editor API

## requirements

* Node v18.16.0+

## usage

```sh
npm i @xplora-uk/poeditor-client
```

## maintenance

### installation

```sh
npm i
```

### code

```plain
src/
  __tests__/
    component/      component tests
  index.ts          main file that exports features of this library
```

### build

```sh
npm run build
```

### tests

You can run tests with/without coverage info.

```sh
npm run test:unit
npm run test:coverage
```

### publish

It is important to increment version number using semantic versioning in `package.json` and re-create `package-lock.json`

```sh
# https://docs.npmjs.com/cli/v9/commands/npm-login
# using a member in xplora-uk
npm login

# https://docs.npmjs.com/cli/v9/commands/npm-publish
npm publish --access public
```
