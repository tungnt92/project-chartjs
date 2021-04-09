<template>
  <div class="chart">
    <ul class="chart__list" v-for="project in data.projects">
      <li  v-for="item in project.position" class="chart__item">
        <ul class="item__member-list">
          <Bar v-for="(member, index) in item.members"
               :key="index"
               :data="member.work"
               :bg-color="member.bg_color"
               :start-day="data.start_time"
               class="member__item"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Bar from './Bar.vue';
export default {
  name: 'Chart',

  components: {
    Bar
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.chart__list {
  margin: 20px 0 0 50px;

  .chart__item {
    padding-top: 41px;

    &:first-child {
      padding-top: 65px;
    }
  }
}

  ul {
    padding: 0;
    list-style: none;
  }
</style>
