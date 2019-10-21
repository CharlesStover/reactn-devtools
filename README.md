# ReactN DevTools [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=ReactN%20DevTools%20allow%20you%20to%20view%20your%20ReactN%20global%20state%20with%20the%20Redux%20DevTools%20browser%20extension.&url=https://github.com/CharlesStover/reactn-devtools&via=CharlesStover&hashtags=react,reactjs,javascript,typescript,webdev,webdevelopment) [![version](https://img.shields.io/npm/v/reactn-devtools.svg)](https://www.npmjs.com/package/reactn-devtools) [![minzipped size](https://img.shields.io/bundlephobia/minzip/reactn-devtools.svg)](https://www.npmjs.com/package/reactn-devtools) [![downloads](https://img.shields.io/npm/dt/reactn-devtools.svg)](https://www.npmjs.com/package/reactn-devtools) [![build](https://api.travis-ci.com/CharlesStover/reactn-devtools.svg)](https://travis-ci.com/CharlesStover/reactn-devtools/) [![chat](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/Tae4vuX)

ReactN DevTools allow you to view your ReactN state with the Redux DevTools
browser extension.

## Install

Install the DevTools package as a dependency in your project with:

* `npm install reactn-devtools` or
* `yarn add reactn-devtools`

## Use

If you are unsure whether or not you need to add ReactN DevTools to your
default global state or to a Provider, then you need to add ReactN DevTools to
your default global state.

### Default Global State

To attach ReactN DevTools to your default global state (most common use case),
add the following code snippet to your `src/index.js` file:

```javascript
import addReactNDevTools from 'reactn-devtools';
addReactNDevTools();
```

### Default Global State with Options

To attach ReactN DevTools to your default global state with options, add the
following code snippet to your `src/index.js` file:

```javascript
import addReactNDevTools from 'reactn-devtools';
addReactNDevTools({ /* options here */ });
```

For a list of options, see
[`redux-devtools-extension`'s Options](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md).

### Provider

To attach ReactN DevTools to your ReactN Provider, add the following code
snippet to the file that creates the Provider:

```javascript
import { createProvider } from 'reactn';
import addReactNDevTools from 'reactn-devtools';

const Provider = createProvider({
  // ...
});

addReactNDevTools(Provider);
```

### Provider with Options

To attach ReactN DevTools to your ReactN Provider with options, add the
following code snippet to the file that creates the Provider:

```javascript
import { createProvider } from 'reactn';
import addReactNDevTools from 'reactn-devtools';

const Provider = createProvider({
  // ...
});

addReactNDevTools(Provider, { /* options */ });
```

For a list of options, see
[`redux-devtools-extension`'s Options](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md).

## Sponsor 💗

If you are a fan of this project, you may
[become a sponsor](https://github.com/sponsors/CharlesStover)
via GitHub's Sponsors Program.
