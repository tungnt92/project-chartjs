<template>
  <div class="chart"
       ref="chart"
       @click.prevent="getCurrentDate">
    <ul class="chart__list"
        v-for="(project, index) in data.projects"
        :key="index"
    >
      <h3>&#8203;</h3>

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
    <div :style="{left: this.positionLine + 'px'}"
        class="line"/>
  </div>
</template>

<script>
import Bar from './Bar.vue';
import * as moment from "moment";
import {groupBy} from 'lodash'
export default {
  name: 'Chart',

  components: {
    Bar
  },

  data () {
    return {
      positionLine: 0,
      dataFilter: []
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

      if (totalDay > 0) {
        this.positionLine = e.offsetX + e.target.offsetLeft
        let currentDate = moment(this.startDate, this.typeFormat).add(totalDay, 'days')

        // handle filter data with current date
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

      this.dataFilter = dataFilter
      console.log('group', groupBy(this.dataFilter, 'project'))
    },

    // getDiffDay (dateStart, dateEnd) {
    //   const dateFrom = new Date(dateStart);
    //   const dateTo = new Date(dateEnd);
    //   const diffTime = Math.abs(dateTo - dateFrom);
    //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //
    //   return diffDays
    // }
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
  }

  ul {
    padding: 0;
    list-style: none;
  }
</style>
