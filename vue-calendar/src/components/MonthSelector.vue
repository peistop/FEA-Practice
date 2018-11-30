<style lang="less">
  .r-calendar {
    .r-months {
      display: flex;
      flex-flow: column nowrap;
      flex-grow: 6;
      flex-basis: 0;
      padding-bottom: 20px;
      .r-row {
        flex-grow: 1;
      }
    }

    .r-cell.r-month {
      cursor: pointer;
      outline: none;
      margin: 4px;
      &.r-thismonth {
        background-color: #4CBBBF;
        border-radius: 50%;
        color: #fff;
      }
    }
  }
</style>

<template>
  <div class="r-months">
    <div class="r-row" v-for="i in rowStack" :key="i">
      <div :class="{
          'r-cell': true,
          'r-month': true,
          'r-thismonth': (getMonth(i, j) === selectedMonth) && (year === selectedYear)
        }" 
        v-for="j in colStack" :key="j" @click="onSelectMonth(getMonth(i, j))">{{monthNames[getMonth(i, j)]}}</div>        
    </div>
  </div>
</template>

<script>
  const rows = 3, cols = 4;
  export default {
    props: ['year', 'selectedMonth', 'selectedYear', 'monthNames', 'onSelectMonth'],
    data() {
      return {
        colStack: Array.from(Array(cols).keys()),
        rowStack: Array.from(Array(rows).keys())
      };
    },
    methods: {
      getMonth: function(i, j) {
        return i * 4  + j; //get month with (i, j)
      }
    }
  };

</script>