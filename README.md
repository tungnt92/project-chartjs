# Project-chartjs

[![Build Status](https://travis-ci.com/tungnt92/project-chartjs.svg?branch=master)](https://travis-ci.com/tungnt92/project-chartjs) [![dependencies Status](https://david-dm.org/tungnt92/project-chartjs/status.svg)](https://david-dm.org/tungnt92/project-chartjs) [![devDependencies Status](https://david-dm.org/tungnt92/project-chartjs/dev-status.svg)](https://david-dm.org/tungnt92/project-chartjs?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Happy hacking =)

# Require
```
$ node -v
v14.4.0
```

#Development
Develop Directory
```
./src
```
Start webpack dev server
```
$ yarn start
```
or
```
$ npm run start
```

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

# Add Library
```
<script src="build/bundle.js"></script>
```

# Sample Chart Data
```
const data =
{
    "start_time": "yyyy-mm-dd",
    "end_time": "yyyy-mm-dd",
    "projects": [
        {
            "id": 1,
            "name": "Sample Project",
            "position": [
                {
                    "name": "FE",
                    "members": [
                        {
                            "id": 1,
                            "name": "John",
                            "bg_color": "#eb4034",
                            "work": [
                                {
                                    "join_date": "yyyy-mm-dd",
                                    "leave_date": "yyyy-mm-dd",
                                    "work_status": 1
                                },
                                ...
                            ]
                        },
                        ...
                    ]
                },
                ...
            ]
        },
        ...
    ]
}
```

# How To Import Data
```
window.projectChart.$emit('chartData', data)
```

# How To Import Options
```
window.projectChart.$emit('chartOptions', {
    scroll: false,
    collapse: true,
    date_format: 'YYYY-MM-DD',
    ...
})
```

# Chart Options
| Option  | Type | Default | Description |
| :---: | :---: | :---: | :--- |
| scroll | boolean | false | show or hide scroll bar in y-axis |
| date_format | string | 'YYYY-MM-DD' | set date format of duration bar |
| collapse | boolean | false | add collapse for each project in project list |
| full_width | boolean | false | set width of container , default is max-width: 1200px |
| dark_mode | boolean | false | set chart's theme, default is light mode |
| show_name_project | boolean | true | show or hide project name |
# License

MIT © gumiviet
