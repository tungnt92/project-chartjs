<template>
  <div class="search">
    <div class="search-left">
      <div class="period-start date-pick">
        <label>Period Start</label>
        <a-date-picker
          v-model="form.period_start"
          :disabled-date="disabledStartDate"
          format="DD/MM/YYYY"
          placeholder="dd/mm/yyyy"
        />
      </div>
      <div class="period-end date-pick">
        <label>Period End</label>
        <a-date-picker
          v-model="form.period_end"
          :disabled-date="disabledEndDate"
          format="DD/MM/YYYY"
          placeholder="dd/mm/yyyy"
        />
      </div>
      <div class="list-project">
        <label>Project</label>
        <a-select style="width: 160px" placeholder="Project name">
          <a-select-option value="Newphoria">
            Newphoria
          </a-select-option>
          <a-select-option value="Asura">
            Asura
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="search-right">
      <button><</button>
      <button class="btn-today">TODAY</button>
      <button>></button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { DatePicker,Select } from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
  Vue.use(DatePicker);
  Vue.use(Select);
  export default {
    name: "Search",
    data () {
      return {
        form: {
          period_start: '',
          period_end: '',
          project_name: ''
        }
      }
    },
    methods: {
      disabledStartDate(startValue) {
        const endValue = this.form.period_end;
        const monthBefore =  new Date(this.form.period_end);
        monthBefore.setMonth(monthBefore.getMonth() - 1);
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > monthBefore.valueOf();
      },
      disabledEndDate(endValue) {
        const startValue = this.form.period_start;
        const monthAfter =  new Date(this.form.period_start);
        monthAfter.setMonth(monthAfter.getMonth() + 1);
        if (!endValue || !startValue) {
          return false;
        }
        return monthAfter.valueOf() > endValue.valueOf();
      },
    }
  }
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  padding: 25px 25px 50px;
  justify-content: space-between;
  .search-left {
    display: flex;
    .date-pick {
      margin-right: 30px;
      font-size: 18px;
    }
    .list-project {
      font-size: 18px;
    }
  }
  .search-right {
    button {
      background: #EF577E;
      border-radius: 5px;
      outline: none;
      border: 0;
      padding:4px 11px;
      color: #fff;
      cursor: pointer;
      &.btn-today {
        padding: 4px 32px;
      }
    }
  }
}
</style>
