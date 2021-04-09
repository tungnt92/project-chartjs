<template>
  <div class="chart">
    <ul class="chart__list" v-for="project in data.projects">
      <li  v-for="item in project.position" class="chart__item">
        <ul class="item__member-list">
          <li v-for="member in item.members" class="member__item">
            <Bar :data="member.work"/>
          </li>
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
  ul {
    padding: 0;
    list-style: none;

    li {
      padding-left: 15px;
    }
  }
</style>
