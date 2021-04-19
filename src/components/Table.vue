<template>
    <div class="pms-chart__table-container">
      <a-spin :spinning="loading"
              class="custom-spin-container"
              size="large">
        <div class="table-chart-wrapper"
             :style="{'max-height': options.scroll ? '400px' : 'unset',
                       'overflow': loading ? 'unset' : 'auto'}"
              :class="showPopup ? 'show-infor' : 'hide-infor'">

        <div class="project-col">
          <h3 class="project__title" v-text="'Project'" />

          <div class="project-wrap" :style="{'min-height': (!project.projects) ? '400px' : 'unset'}">
            <Project :data="project"
                     :options="options"
                     @handleCollapse="handleCollapse($event)"/>
          </div>
        </div>

        <div class="chart-col">
          <div class="chart__timeline">
            <Duration :start-date="project.start_time" :type-format="options.date_format"/>
          </div>

          <div class="chart__wrap">
            <Chart @clickChart="getCurrentDate"
                   :data="project" :start-date="project.start_time"
                   :type-format="options.date_format"
                   :show-name-project="options.show_name_project"
                   :show-line="showLine"
                   :positionLine="positionLine"/>

            <SideBar :current-day="currentDay"
                     :data="dataFilter"
                     :show-popup="showPopup"
                     :options="options"
                     @close="closePopUp"/>
          </div>
        </div>
      </div>
      </a-spin>
    </div>
</template>

<script>
import Duration from './Duration.vue';
import Project from './Project.vue';
import Chart from './Chart.vue';
import SideBar from './SideBar.vue';
import isEmpty from '../helpers';
import * as moment from "moment";
import {groupBy} from "lodash";

export default {
  name: 'ChartTable',

  components: {
    Duration,
    Project,
    Chart,
    SideBar
  },

  data () {
    return {
      loading: false,
      project: {},
      options: {
        scroll: false,
        date_format: 'YYYY-MM-DD',
        dark_mode: false,
        show_name_project: true,
        collapse: false
      },
      showPopup: false,
      showLine: false,
      dataFilter: {},
      currentDay: '',
      positionLine: 0
    }
  },

  mounted() {
    window.projectChart.$on('chartOptions', (options) => {
      if (!isEmpty(options)) {
        this.options = {...this.options, ...options}
      }
    })

    window.projectChart.$on('chartData', (data) => {
      this.project = data
      this.project.projects.forEach(obj => {
        obj.open = true;
      })
    })

    window.projectChart.$on('loading', (loading) => {
      this.loading = loading
    })
  },

  methods: {
    handleCollapse(e) {
      if (this.options.collapse) {
        let index = this.project.projects.findIndex(obj => obj.name === e)

        if (index !== -1) {
          this.project.projects[index].open = !this.project.projects[index].open
          // ASSIGN DATA
          this.project = {...this.project}
        }
      }
    },

    getCurrentDate(e) {
      this.showPopup = true;
      this.showLine = true
      this.positionLine = e.offsetX + e.target.offsetLeft
      let totalDay = Math.floor((this.positionLine/ 10))
      let currentDate = moment(this.project.start_time, this.options.date_format).add(totalDay, 'days')
      this.currentDay = currentDate.format(this.options.date_format)
      this.handleFilterData(currentDate)
    },

    handleFilterData(dateClick) {
      let dataFilter = []

      this.project.projects.map(project => {
        project.position.map(position => {
          position.members.map(member => {
            member.work.map(time => {
              if (dateClick.isBetween(moment(time.join_date), moment(time.leave_date).add(1,'days'))) {
                dataFilter.push({
                  project: project.name,
                  position: position.name,
                  member: member.name,
                  ...time
                })
              }
            })
          })
        })
      })

      this.dataFilter = groupBy(dataFilter, 'project')
    },

    closePopUp () {
      this.showPopup = false
      this.showLine = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/variable.scss";

  .pms-chart__table-container {
    box-shadow: 0 0 4px 0 rgba(0,0,0,.5);
    padding: 20px;
    border-radius: 20px;
    background-color: $main-bg;
  }

  .custom-spin-container {
    overflow: hidden;
  }

  .table-chart-wrapper {
    display: flex;
    border-radius: 20px;

    &.show-infor {
      animation: fadeTable .3s linear forwards;
    }

    .project-col {
      position: sticky;
      display: flex;
      flex-flow: column;
      left: 0;
      background-color: $main-bg;
      z-index: 4;
      height: fit-content;
      width: 180px;
      flex-shrink: 0;
    }

    .project__title {
      margin: 0;
      padding: 15px;
      font-size: 16px !important;
      color: $main-color;
      border-bottom: 1px solid $main-color;
      border-right: 1px solid $main-color;
    }

    .project-wrap {
      border-right: 1px solid $main-color;
      padding-bottom: 20px;
      background-color: $main-bg;
      z-index: 2;
    }

    .chart__timeline, .project__title {
      position: sticky;
      top: 0;
      background-color: $main-bg;
      z-index: 3;
    }

    .chart__wrap {
      padding-bottom: 10px;
      margin-left: 50px;
    }

    .chart-col {
      height: fit-content;
      background-color: $main-bg;
    }
  }

  @keyframes fadeTable {
    from {
      width: 100%;
    }
    to {
      width: calc(100% - 250px);
    }
  }
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar
  {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #c1c1c1;
  }
</style>
