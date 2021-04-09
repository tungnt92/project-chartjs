<template>
  <div id="chart" class="chart">
    <!--Search-->
    <Search/>

    <!--Chart-->
    <div class="chart__container">
      <!--Left-->
      <div class="left">
        <h4>Project</h4>

        <Project :projects="chart.projects"/>
      </div>

      <!--Right-->
      <div class="right">
        <!--Duration-->
        <Duration :dateRange="dateRange"/>

        <!--Line chart -->
        <LineChart :projects="chart.projects"
                   :period-start="chart.period_start"
                   :period_end="chart.period_end"/>
      </div>
    </div>
    <hr>
    <p>Current date : {{currentDate}}</p>
  </div>
</template>

<script>
  import moment from 'moment';
  import Search from "./components/Search.vue";
  import Duration from "./components/Duration.vue";
  import Project from "./components/Project.vue";
  import LineChart from "./components/LineChart.vue";

  export default {
    components: {
      LineChart,
      Project,
      Duration,
      Search
    },

    data() {
      return {
        chart: {
          period_start: '2021-04-09',
          period_end: '2022-04-09',
          projects: [
            {
              id: 1,
              project_name: 'Newphoria',
              position: [
                {
                  position_name: 'Front End',
                  members: [
                    {
                      id: 1,
                      name: 'Hugh',
                      color: '#ff9e9e',
                      work: [
                        {
                          join_date: '2021-05-09',
                          leave_date: '2021-06-09',
                          number: 1
                        },
                        {
                          join_date: '2021-06-09',
                          leave_date: '2021-08-09',
                          number: 0.5
                        }
                      ]
                    },
                    {
                      id: 2,
                      name: 'Kuro',
                      color: '#5eba7d',
                      work: [
                        {
                          join_date: '2021-06-01',
                          leave_date: '2021-07-01',
                          number: 1
                        },
                        {
                          join_date: '2021-07-15',
                          leave_date: '2021-09-01',
                          number: 0.5
                        }
                      ]
                    },
                  ]
                },
                {
                  position_name: 'Back End',
                  members: [
                    {
                      id: 1,
                      name: 'Riki',
                      color: '#ffbf00',
                      work: [
                        {
                          join_date: '2021-04-09',
                          leave_date: '2021-05-09',
                          number: 0.5
                        },
                        {
                          join_date: '2021-05-09',
                          leave_date: '2021-06-09',
                          number: 1
                        }
                      ]
                    },
                  ]
                }
              ]
            },
            {
              id: 2,
              project_name: 'Asura',
              position: [
                {
                  position_name: 'Front End',
                  members: [
                    {
                      id: 1,
                      name: 'Chain',
                      color: '#04ff00',
                      work: [
                        {
                          join_date: '2021-08-09',
                          leave_date: '2021-10-09',
                          number: 0.5
                        },
                        {
                          join_date: '2021-10-09',
                          leave_date: '2021-12-09',
                          number: 1
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      };
    },

    computed: {
      dateRange () {
        let result = [];
        let startDate = moment(this.chart.period_start);
        let endDate = moment(this.chart.period_start).add(1, 'year');
        let today = this.currentDate.slice(8,10)

        if (endDate.isBefore(startDate)) {
          throw "End date must be greated than start date."
        }

        while (startDate.isBefore(endDate)) {
          result.push({
            date: startDate.format(`YYYY-MM-${today}`),
            daysInMonth: startDate.daysInMonth()
          });
          startDate.add(1, 'month');
        }

        return result
      },

      currentDate () {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        return today
      }
    }
  };
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .chart {
    width: 1000px;
    margin: auto;
    padding: 30px 0;
    &__container {
      display: flex;
      .left {
        border-right: 1px solid #bbbbbb;
        width: 150px;
        flex-shrink: 0;
        h4 {
          border-bottom: 1px solid #bbbbbb;
          padding: 15px;
          font-size: 14px;
          font-weight: normal;
        }
      }
      .right {
        width: 100%;
        overflow: auto;
      }
    }
  }
</style>
