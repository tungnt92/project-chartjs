# Project-chartjs

[![Build Status](https://travis-ci.com/tungnt92/project-chartjs.svg?branch=master)](https://travis-ci.com/tungnt92/project-chartjs) [![dependencies Status](https://david-dm.org/tungnt92/project-chartjs/status.svg)](https://david-dm.org/tungnt92/project-chartjs) [![devDependencies Status](https://david-dm.org/tungnt92/project-chartjs/dev-status.svg)](https://david-dm.org/tungnt92/project-chartjs?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Happy hacking =)

# Features

* **ES6/ESNext** - Write _ES6_ code and _Babel_ will transpile it to ES5 for backwards compatibility
* **Test** - _Mocha_ with _Istanbul_ coverage
* **Lint** - Preconfigured _ESlint_ with _Airbnb_ config
* **CI** - _TravisCI_ configuration setup
* **Minify** - Built code will be minified for performance

# Commands
- `yarn clean` - Remove `lib/` directory
- `yarn test` - Run tests with linting and coverage results.
- `yarn test:only` - Run tests without linting or coverage.
- `yarn test:watch` - You can even re-run tests on file changes!
- `yarn test:prod` - Run tests with minified code.
- `yarn test:examples` - Test written examples on pure JS for better understanding module usage.
- `yarn lint` - Run ESlint with airbnb-config
- `yarn cover` - Get coverage report for your code.
- `yarn build` - Babel will transpile ES6 => ES5 and minify the code.
- `yarn prepublish` - Hook for npm. Do all the checks before publishing your module.

# License

MIT © Dinesh Pandiyan
