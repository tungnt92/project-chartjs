<template>
  <div>
    <div class="pms-chart__project"
         v-for="(project, index) in data.projects"
         :key="index">
      <div class="project__name"
           @click.prevent="collapseProject(project.name)"
            v-if="options.show_name_project">
        <h3 v-text="project.name"/>

        <a-icon v-if="options.collapse"
                :type="project.open ? 'minus' : 'plus'" />
      </div>

      <ul v-if="'open' in project && project.open"
          class="project__list" >
        <li class="list__item"
            v-for="(item, index) in project.position"
            :key="index">
          <p v-text="`${ item.name} (total: ${item.members.length})`" />

          <ul class="item__member-list">
            <li v-for="(member, i) in item.members"
                :key="i" class="member__item"
                v-text="member.name"
            />
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'ant-design-vue'
  import Vue from 'vue'
  Vue.use(Icon);

  export default {
    name: "Project",

    props: {
      data: {
        type: Object,
        default: () => {}
      },

      options: {
        type: Object,
        default: () => {}
      }
    },

    methods: {
      findWorkStatus(arr) {
        let max = 0
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].work_status > max) {
            max = arr[i].work_status
          }
        }
        return max
      },

      collapseProject (name) {
        this.$emit('handleCollapse', name)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../scss/variable.scss";

.pms-chart__project {
  padding: 20px 15px 0;
  .project__name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    h3 {
      margin-bottom: 0;
      font-weight: 500;
      font-size: 16.38px!important;
      color: $main-color;
    }
  }
}

.project__list {
  padding: 0 15px;
  margin: 0;
  list-style: none;

  p {
    margin: 0 0 10px;
    font-size: 14px!important;
  }

  .list__item {
    &:not(:last-child) {
      margin-bottom: 10px;
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
      font-size: 14px!important;
    }
  }
}
</style>
