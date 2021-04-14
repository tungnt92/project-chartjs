<template>
  <div class="chart">
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
  .chart {
    &__list {
      padding: 20px 0 0 50px;
      margin-bottom: 0;
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
