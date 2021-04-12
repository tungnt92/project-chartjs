<template>
  <div class="table-wrap" :style="{'max-height': options.scroll ? '400px' : 'unset'}">
    <div class="project-col">
      <h4 class="project__title" v-text="'Project'" />

      <div class="project-wrap">
        <Project :data="data"/>
      </div>
    </div>

    <div class="chart-col">
      <div class="chart__timeline">
        <Duration :start-date="data.start_time"/>
      </div>

      <div class="chart__wrap">
        <Chart :data="data"/>
      </div>
    </div>
  </div>
</template>

<script>
import Projects from '../projects.json'
import Duration from './Duration.vue';
import Project from './Project.vue';
import Chart from './Chart.vue';

export default {
  name: 'ChartTable',

  components: {
    Duration,
    Project,
    Chart
  },

  data () {
    return {
      data: Projects,
      options: {
        scroll: true,
        format_date: 'yyyy-mm-dd',
        collapse: false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .table-wrap {
    display: flex;
    overflow: scroll;

    .project-col {
      position: sticky;
      display: flex;
      flex-flow: column;
      left: 0;
      background-color: #ffffff;
      z-index: 4;
    }

    .project__title {
      margin: 0;
      padding: 15px;
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
    }

    .chart-col {
      max-width: 100%;
    }
  }
</style>
