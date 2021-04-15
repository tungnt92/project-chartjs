<template>
  <div class="chart">
    <ul class="chart__list"
        @click.prevent="getCurrentDate"
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

      <!--Line click-->
      <li :style="{left: this.positionLine + 'px'}"
          class="line"/>
    </ul>
  </div>
</template>

<script>
import Bar from './Bar.vue';
import * as moment from "moment";
export default {
  name: 'Chart',

  components: {
    Bar
  },

  data () {
    return {
      positionLine: 0
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
        console.log(e)
        console.log('start-date:', this.startDate)
        console.log('width click', e.offsetX)
        console.log('total date', Math.ceil((e.offsetX / 10)))
        this.positionLine = e.offsetX
        let currentDate = moment(this.startDate, this.typeFormat).add(totalDay, 'days')
        console.log('current date', moment(currentDate).format(this.typeFormat))
      }
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
      margin-left: 50px;
    }
    &__frame {
      position: absolute;
      height: 100%;
      top: 0;
      left: 50px;
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

      .line {
        position: absolute;
        height: 100%;
        border-left: 1px dashed #333333;
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
  }

  ul {
    padding: 0;
    list-style: none;
  }
</style>
