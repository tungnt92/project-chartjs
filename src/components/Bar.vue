<template>
    <li class="bar-wrap" :style="{'width': maxWidth + 'px'}">
      <span class="bar" v-for="(work, index) in data"
            :key="index"
            :style="{
              'background-color': bgColor,
              'height': work.work_status*21 + 'px',
              'width': getDays(startDay, work.join_date) >= 0 ? (getDays(work.join_date, work.leave_date) *10 + 10) + 'px' : (getDays(startDay, work.leave_date) *10 + 10)+ 'px',
              'left': getDays(startDay, work.join_date) >= 0 ? getDays(startDay, work.join_date)*10 + 'px' : 0
            }"
            @mousemove="onMouseMove($event, work)"
            @mouseleave="hidePopUp"
      />
    </li>
</template>

<script>
import * as moment from 'moment'
import PopUp from './PopUp.vue'
import {mapMutations} from 'vuex'

export default {
  name: 'Bar',

  components: {
    PopUp
  },

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

    },
    projectName: {
      type: String,
      default: ''
    }
  },

  computed: {
    maxWidth () {
      let currentDate = this.startDate
      let maxWidth = 0
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
        maxWidth += days*10
      }
      return maxWidth
    }
  },

  data () {
    return {
      show: false,
      index: 0
    }
  },

  methods: {
    ...mapMutations(['setPopupState', 'setPopUpData', 'setPopupPosition', 'setPopupDirection']),

    getDays (start, end) {
      let startTime = moment(start, 'YYYY-MM-DD')
      let endTime = moment(end, 'YYYY-MM-DD')
      return endTime.diff(startTime, 'days')
    },

    onMouseMove (e, data) {
      this.setPopupPosition({
        pageX: e.pageX,
        pageY: e.pageY
      })
      this.setPopupDirection({
        clientX: e.clientX,
        clientY: e.clientY
      })
      this.setPopupState(true)
      this.setPopUpData({
        ...data,
        project_name: this.projectName
      })
    },

    hidePopUp () {
      this.setPopupState(false)
      this.setPopUpData({})
    }
  }
};
</script>

<style lang="scss" scoped>
  .bar-wrap {
    position: relative;
    height: 21px;
    overflow: hidden;

    span {
      position: absolute;
      top: 0;
      border-radius: 3px;
      transition: .3s ease-in-out;

      &:hover {
        border: 1px solid #000;
      }

      &:not(:first-child) {
        margin-left: 1px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  span {
    display: block;
  }
</style>
