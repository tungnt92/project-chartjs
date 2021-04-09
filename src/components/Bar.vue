<template>
  <li class="bar-wrap">
    <span class="bar" v-for="(work, index) in data"
          :key="index"
          :style="{
            'background-color': bgColor,
            'height': work.work_status*21 + 'px',
            'width': getDays(startDay, work.join_date) >= 0 ? getDays(work.join_date, work.leave_date) *10 + 'px' : getDays(startDay, work.leave_date) *10 + 'px',
            'left': getDays(startDay, work.join_date) >= 0 ? getDays(startDay, work.join_date)*10 + 'px' : 0
          }"
    />
  </li>
</template>

<script>
import * as moment from 'moment'

export default {
  name: 'Bar',

  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    bgColor: {
      type: String,
      default: '#000'
    },
    startDay: {
      type: String,
      default: ''
    }
  },

  methods: {
    getDays (start, end) {
      let startTime = moment(start, 'YYYY-MM-DD')
      let endTime = moment(end, 'YYYY-MM-DD')
      return endTime.diff(startTime, 'days')
    }
  }
};
</script>

<style lang="scss" scoped>
  .bar-wrap {
    position: relative;
    height: 21px;

    span {
      position: absolute;
      top: 0;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  span {
    display: block;
  }
</style>
