<template>
  <div style="overflow: hidden">
    <div class="pms-chart__chart"
         ref="chart"
         @click.prevent="$emit('clickChart', $event)">
      <ul class="chart__list"
          v-for="(project, index) in data.projects"
          :key="index"
      >
        <h3 v-if="showNameProject">&#8203;</h3>

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
      </div>
    </div>

  </div>

</template>

<script>
import Bar from './Bar.vue';
import PopUp from './PopUp.vue'
import * as moment from "moment";
export default {
  name: 'Chart',

  components: {
    Bar,
    PopUp
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
    },
    positionLine: {
      type: Number,
      default: 0
    },
    showNameProject: {
      type: Boolean,
      default: false
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
};
</script>

<style lang="scss" scoped>
.pms-chart__chart {
  position: relative;
  width: fit-content;
  .chart__list {
    padding: 20px 0 0 0;
    margin-bottom: 0;

    h3 {
      user-select: none;
    }
  }
  .chart__frame {
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
  .chart__item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .chart__position {
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
