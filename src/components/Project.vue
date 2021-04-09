<template>
  <div>
    <div class="project" v-for="(project, index) in data.projects" :key="index">
      <h3 class="item__name" v-text="project.name" />
      <ul class="project__list" >
        <li class="project__item" v-for="(item, index) in project.position" :key="index">
          <p>. {{ item.members.length }} {{ item.name }}</p>
          <ul class="item__member-list">
            <li v-for="(member, i) in item.members" :key="i" class="member__item" v-text="`+ ${member.name} (${findWorkStatus(member.work)})`" />
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Project",

    props: {
      data: {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
.project {
  padding: 20px 15px 0;
}

.project__list {
  padding: 0 15px;
  margin: 0;
  list-style: none;

  .item__name {
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 10px;
  }

  .project__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .item__member-list {
    .member__item {
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
</style>
