<template>
  <div class="pms-chart__duration">
    <ul>
      <li v-for="(date, index) in durations" :style="{'width': date.days*10 + 'px'}">
        <span :key="index" v-text="date.date" />
      </li>
    </ul>
  </div>
</template>

<script>
import * as moment from 'moment'
  export default {
    name: "Duration",

    props: {
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
        currentDate = moment(this.startDate).isValid() ? this.startDate : Date.now()
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
    }
  }
</script>

<style lang="scss" scoped>
  .pms-chart__duration {
    ul {
      display: flex;
      padding: 0 0 0 50px;
      list-style: none;
      margin: 0;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 50px;
        height: 1px;
        background-color: #000000;
        bottom: 0;
        left: 0;
      }

      li {
        white-space: nowrap;
        margin: 0;
        padding: 15px 0 15px;
        border-bottom: 1px solid #333333;
        flex-shrink: 0;
        position: relative;
        background-color: #ffffff;
        z-index: 3;

        &:first-child {
          &::before {
            left: 0;
          }
        }

        &::before {
          position: absolute;
          content: '';
          width: 1px;
          height: 5px;
          background-color: #333333;
          bottom: 0;
          left: -1px;
        }

        span {
          width: fit-content;
          transform: translateX(-50%);
          display: block;
          font-size: 16px !important;
        }
      }
    }
  }
</style>
