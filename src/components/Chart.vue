<template>
  <div class="chart"
       ref="chart"
       @click.prevent="getCurrentDate">
    <ul class="chart__list"
        v-for="(project, index) in data.projects"
        :key="index"
    >
      <h3 >&#8203;</h3>

      <template v-if="'open' in project && project.open"
      >
        <li v-for="(item, i) in project.position"
            :key="i" class="chart__item"
        >
          <p class="chart__position">&#8203;</p>

          <ul class="item__member-list">
            <Bar v-for="(member, ind) in item.members"
                 :key="ind"
                 :data="member.work"
                 :bg-color="member.bg_color"
                 :start-day="data.start_time"
                 :project-name="project.name"
                 class="member__item"
            />
          </ul>
        </li>
      </template>
    </ul>

    <ul class="chart__frame">
      <li v-for="(date, index) in durations"
          :key="index"
          :style="{'width': date.days*10 + 'px'}">
        <span v-for="frame in 3"
              :key="frame"/>
      </li>
    </ul>

    <!--Line click-->
    <div class="line-wrap">
      <div :style="{left: this.positionLine + 'px'}"
           class="line"/>

      <div :style="{left: this.positionLine - 200 + 'px'}"
           class="data-popup"
           v-show="showPopup">
        <h3 class="popup-header">
          {{ currentDay }}
          <button @click="!showPopup" class="btn-close">x</button>
        </h3>
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
</template>

<script>
import Bar from './Bar.vue';
import PopUp from './PopUp.vue'
import * as moment from "moment";
import {groupBy} from 'lodash'
export default {
  name: 'Chart',

  components: {
    Bar,
    PopUp
  },

  data () {
    return {
      positionLine: 0,
      dataFilter: {},
      currentDay: '',
      showPopup: false
    }
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    },
    startDate: {
      type: String,
      default: ''
    },
    typeFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },

  computed: {
    durations () {
      let currentDate = this.startDate
      let listDate = []
      for (let i = 0; i <= 12; i++) {
        let date = moment(currentDate).add(i, 'months').calendar(null, {
          sameDay: this.typeFormat,
          nextDay:  this.typeFormat,
          nextWeek:  this.typeFormat,
          lastDay:  this.typeFormat,
          lastWeek:  this.typeFormat,
          sameElse:  this.typeFormat
        })
        let days = moment(date, 'YYYY-MM').daysInMonth()
        listDate.push({ date: date, days: days })
      }
      return listDate
    }
  },

  methods: {
    getCurrentDate (e) {
      let totalDay = Math.ceil((e.offsetX / 10))
      this.showPopup = true
      if (totalDay > 0) {
        this.positionLine = e.offsetX + e.target.offsetLeft
        let currentDate = moment(this.startDate, this.typeFormat).add(totalDay, 'days')
        // handle filter data with current date
        this.currentDay = currentDate.format(this.typeFormat)
        this.handleFilterData(currentDate)
      }
    },

    handleFilterData (dateClick) {
      let dataFilter = []

      this.data.projects.map(project => {
        project.position.map(position => {
          position.members.map(member => {
            member.work.map(time => {
              if (dateClick.isBetween(moment(time.join_date), moment(time.leave_date))) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
  .chart {
    position: relative;
    width: fit-content;
    &__list {
      padding: 20px 0 0 0;
      margin-bottom: 0;

      h3 {
        user-select: none;
      }
    }
    &__frame {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      z-index: -1;
      li {
        flex-shrink: 0;
        display: flex;
        &:first-child {
          span {
            &:first-child {
              border-left: 1px solid #e3e3e3;
            }
          }
        }
        span {
          border-right: 1px solid #e3e3e3;
          width: 100%;
          display: block;
        }
      }
    }
    &__item {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__position {
      margin-bottom: 10px;
    }

    .line {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-left: 1px dashed #333333;
      z-index: 2;
    }

    .data-popup {
      position: absolute;
      left: 0;
      top: 50px;
      z-index: 2;
      background-color: #ffffff;
      border-radius: 10px;
      width: 200px;
      border: 1px solid #cccccc;
      max-height: 300px;
      overflow-y: scroll;

      .project-wrap {
        padding: 15px;

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
    }
  }

  .project__list {
    margin: 0;
    list-style: none;

    p {
      margin: 0 0 10px;
    }

    .list__item {
      &:not(:last-child) {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #cccccc;
      }
    }

    .item__member-list {
      .member__item {
        padding-left: 10px;

        &:last-child {
          margin: 0
        }
      }
    }

    ul {
      list-style: none;
      padding: 0 10px;

      li {
        white-space: nowrap;
        margin-bottom: 10px;
      }
    }
  }

  ul {
    padding: 0;
    list-style: none;
  }
</style>
