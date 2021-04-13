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

# License

MIT © gumiviet

# Add Library
```
<script src="build/bundle.js"></script>
```

# Import Sample Data
```
window.projectChart.$emit('chartData', {
    "start_time": "2020-04-09",
    "end_time": "2020-05-06",
    "projects": [
      {
        "id": 1,
        "name": "Asura",
        "position": [
          {
            "name": "FE",
            "members": [
              {
                "id": 1,
                "name": "Tun",
                "bg_color": "#eb4034",
                "work": [
                  {
                    "join_date": "2020-04-04",
                    "leave_date": "2020-04-16",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-06",
                    "leave_date": "2020-05-16",
                    "work_status": 0.5
                  }
                ]
              },
              {
                "id": 2,
                "name": "Tim",
                "bg_color": "#ebeb34",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-06",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-06",
                    "leave_date": "2020-05-16",
                    "work_status": 0.5
                  }
                ]
              },
              {
                "id": 3,
                "name": "Kuro",
                "bg_color": "#eba234",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-06",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-06",
                    "leave_date": "2020-05-16",
                    "work_status": 0.5
                  }
                ]
              }
            ]
          },
          {
            "name": "BE",
            "members": [
              {
                "id": 1,
                "name": "Tun",
                "bg_color": "#7deb34",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-06",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-06",
                    "leave_date": "2020-05-26",
                    "work_status": 0.5
                  }
                ]
              },
              {
                "id": 2,
                "name": "Tim",
                "bg_color": "#34d3eb",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-06",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-06",
                    "leave_date": "2020-05-20",
                    "work_status": 0.5
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "NewPho",
        "position": [
          {
            "name": "FE",
            "members": [
              {
                "id": 1,
                "name": "Tun",
                "bg_color": "#3477eb",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-04-26",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-04-26",
                    "leave_date": "2020-05-06",
                    "work_status": 0.5
                  }
                ]
              },
              {
                "id": 2,
                "name": "Tim",
                "bg_color": "#6e34eb",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-04-20",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-04-20",
                    "leave_date": "2020-05-26",
                    "work_status": 0.5
                  }
                ]
              }
            ]
          },
          {
            "name": "BE",
            "members": [
              {
                "id": 1,
                "name": "Tun",
                "bg_color": "#b734eb",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-16",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-16",
                    "leave_date": "2020-06-26",
                    "work_status": 0.5
                  }
                ]
              },
              {
                "id": 2,
                "name": "Tim",
                "bg_color": "#eb34ba",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-06",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-06",
                    "leave_date": "2020-06-26",
                    "work_status": 0.5
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "Dnavi",
        "position": [
          {
            "name": "FE",
            "members": [
              {
                "id": 1,
                "name": "Tun",
                "bg_color": "#ff8100",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-04-26",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-04-26",
                    "leave_date": "2020-05-06",
                    "work_status": 0.5
                  }
                ]
              },
              {
                "id": 2,
                "name": "Tim",
                "bg_color": "#ff8100",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-04-20",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-04-20",
                    "leave_date": "2020-05-26",
                    "work_status": 0.5
                  }
                ]
              }
            ]
          },
          {
            "name": "BE",
            "members": [
              {
                "id": 1,
                "name": "Tun",
                "bg_color": "#ff8100",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-16",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-16",
                    "leave_date": "2020-06-26",
                    "work_status": 0.5
                  }
                ]
              },
              {
                "id": 2,
                "name": "Tim",
                "bg_color": "#eb34ba",
                "work": [
                  {
                    "join_date": "2020-04-06",
                    "leave_date": "2020-05-06",
                    "work_status": 1
                  },
                  {
                    "join_date": "2020-05-06",
                    "leave_date": "2020-06-26",
                    "work_status": 0.5
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
```

# Import Sample Options
```
window.projectChart.$emit('chartOptions', {
    scroll: false,
    collapse: true,
    date_format: 'YYYY-MM-DD'
})
```
