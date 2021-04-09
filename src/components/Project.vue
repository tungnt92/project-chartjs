<template>
  <div class="project">
    <ul class="project__list" v-for="project in data.projects">
        <li class="project__item">
          <h3 class="item__name" v-text="project.name" />
          <template v-for="item in project.position">
            <p>.{{ item.members.length }}{{ item.name }}</p>
            <ul class="item__member-list">
              <li v-for="member in item.members" class="member__item" v-text="`+ ${member.name}`" />
            </ul>
          </template>
        </li>
      </ul>
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
    }
  }
</script>

<style lang="scss" scoped>
.project__list {
  padding: 0 15px;
  margin: 20px 0 0;
  list-style: none;

  .item__name {
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 10px;
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
