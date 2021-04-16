<template>
    <div class="table-container">
      <a-spin :spinning="loading" size="large">
        <div class="table-wrap"
             :style="{'max-height': options.scroll ? '400px' : 'unset',
                       'overflow': loading ? 'unset' : 'auto'}"
              :class="showPopup ? 'show-infor' : ''">

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
                   :positionLine="positionLine"/>

            <div class="data-popup" v-show="showPopup">
              <h3 class="popup-header">
                {{ currentDay }}
                <button @click="showPopup = false" class="btn-close">x</button>
              </h3>
              <h3 v-if="isEmpty(dataFilter)" class="infor-warning">Không có dữ liệu</h3>
              <div class="project-wrap" v-for="(value, key) in dataFilter" :key="key">

                <h3>Project: {{ key }}</h3>

                <ul class="project__list" >
                  <li class="list__item"
                      v-for="(item, index) in value"
                      :key="index">
                    <p v-text="`Member: ${item.member}`" />
                    <p v-text="`Position: ${item.position}`" />
                    <p v-text="`Work Status: ${item.work_status}`" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </a-spin>
    </div>
</template>

<script>
// import Projects from '../projects.json'
import Duration from './Duration.vue';
import Project from './Project.vue';
import Chart from './Chart.vue';
import * as moment from "moment";
import {groupBy} from "lodash";

export default {
  name: 'ChartTable',

  components: {
    Duration,
    Project,
    Chart
  },

  data () {
    return {
      loading: false,
      // use for dev
      project: {},
      options: {},
      showPopup: false,
      dataFilter: {},
      currentDay: '',
      positionLine: 0
    }
  },

  mounted() {
    // use for build
    window.projectChart.$on('chartOptions', (options) => {
      this.options = options
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

    // use for dev
    // this.project.projects.forEach(obj => {
    //   obj.open = true;
    // })
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

    isEmpty(obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-container {
    box-shadow: 0 0 4px 0 rgba(0,0,0,.5);
    padding: 20px;
    border-radius: 20px;
  }

  .table-wrap {
    display: flex;
    border-radius: 20px;
    &.show-infor {
      width: calc(100% - 250px);
    }

    .project-col {
      position: sticky;
      display: flex;
      flex-flow: column;
      left: 0;
      background-color: #ffffff;
      z-index: 4;
      height: fit-content;
      width: 180px;
      flex-shrink: 0;
    }

    .project__title {
      margin: 0;
      padding: 15px;
      font-size: 16px !important;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }

    .project-wrap {
      border-right: 1px solid #000;
      padding-bottom: 20px;
      background-color: #ffffff;
      z-index: 2;
    }

    .chart__timeline, .project__title {
      position: sticky;
      top: 0;
      background-color: #ffffff;
      z-index: 3;
    }

    .chart__wrap {
      padding-bottom: 10px;
      margin-left: 50px;
    }

    .chart-col {
      height: fit-content;
    }
  }
  .data-popup {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #ffffff;
    width: 250px;
    border: 1px solid #cccccc;
    max-height: 100%;
    overflow-y: scroll;
    min-height: 100%;

    .project-wrap {
      padding: 15px;
      border-right: 0;

      &:not(:last-child) {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }
    }

    .popup-header {
      padding: 15px;
      position: sticky;
      top: 0;
      background-color: #e3e3e3;
      border-bottom: 1px solid rgba(0,0,0,.125);
    }
    .infor-warning {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
    }
    .btn-close {
      position: absolute;
      right: 5px;
      top: 5px;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      font-size: 10px;
      &:hover {
        background: #ddd;
        color: #ffffff;
      }
      &:focus {
        outline: none;
      }
    }
    ul {
      list-style: none;
      padding: 0 10px;

      li {
        border-bottom: 1px solid rgba(0,0,0,.125);
        white-space: nowrap;
        margin-bottom: 10px;
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
</style>
