<template>
  <div class="duration">
    <ul>
      <li v-for="date in durations" v-text="date.date" :style="{'padding-right': date.days*5 - 15 + 'px'}"/>
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
      }
    },

    computed: {
      durations () {
        let currentDate = this.startDate
        let listDate = []
        for (let i = 0; i <= 12; i++) {
          let date = moment(currentDate).add(i, 'months').calendar(null, {
            sameDay: 'YYYY-MM-DD',
            nextDay: 'YYYY-MM-DD',
            nextWeek: 'YYYY-MM-DD',
            lastDay: 'YYYY-MM-DD',
            lastWeek: 'YYYY-MM-DD',
            sameElse: 'YYYY-MM-DD'
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
  .duration {
    ul {
      display: flex;
      padding: 0;
      list-style: none;
      margin: 0;

      li {
        white-space: nowrap;
        margin: 0;
        padding: 15px;
        border-bottom: 1px solid #333333;


        &:not(:last-child) {
          padding-right: 150px;
        }
      }
    }
  }
</style>
