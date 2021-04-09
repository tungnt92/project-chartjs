<template>
  <div class="project">
    <div v-for="project in projects"
         :key="project.id"
         class="project__item">
      <!--Project name-->
      <b v-text="project.project_name"/>

      <div v-for="(position, index) in project.position"
           :key="index" class="dev">
        <!--Position name-->
        <p>{{project.position.length + ' ' + position.position_name }}</p>

        <ul>
          <li v-for="member in position.members"
              :key="member.id">
            + {{member.name}} (1.0)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Project",

    props: {
      projects: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .project {
    &__item {
      padding: 10px 15px;
      font-size: 14px;
      b {
        display: block;
        margin-bottom: 10px;
      }

      .dev {
        p {
          position: relative;
          padding-left: 15px;
          margin-bottom: 10px;
          &:before {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            top: 6px;
            left: 6px;
            background: #000000;
          }
        }
        ul {
          li {
            list-style: none;
            padding-left: 15px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>
