<template>
  <div class="table-wrap">
    <div class="project-col">
      <p class="project__title">Project</p>
      <div ref="project" class="project-wrap" @scroll="scroll">
        <Project :data="data" @scroll="scroll"/>
      </div>
    </div>
    <div class="chart-col">
      <div class="chart__timeline">
        <Duration :start-date="data.startTime"/>
      </div>
      <div ref="chart" class="chart__wrap" @scroll="scroll">
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
      scrollAmount: 0
    }
  },

  methods: {
    scroll ({target: {scrollTop}}) {
      this.scrollAmount = scrollTop
    }
  },

  mounted() {

  }
};
</script>

<style lang="scss" scoped>
  .table-wrap {
    display: flex;
    max-height: 400px;
    overflow: scroll;

    .project-col {
      position: sticky;
      display: flex;
      flex-flow: column;
      left: 0;
      background-color: #ffffff;
      z-index: 2;
    }

    .project__title {
      margin: 0;
      padding: 15px;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }

    .project-wrap {
      border-right: 1px solid #000;
    }

    .chart__timeline, .project__title {
      position: sticky;
      top: 0;
      background-color: #ffffff;
      z-index: 1;
    }

    .chart-col {
      max-width: 100%;
    }
  }
</style>
