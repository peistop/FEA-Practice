<style lang="less">
  .r-calendar {
    .r-years {
      display: flex;
      flex-flow: column nowrap;
      flex-grow: 6;
      flex-basis: 0;
      .r-row {
        flex-grow: 1;
      }
    }

    .r-cell.r-year {
      cursor: pointer;
      outline: none;
      margin: 4px;
      &.r-thisyear {
        background-color: #4CBBBF;
        border-radius: 50%;
        color: #fff;
      }
      &:not(.r-outdate):hover {
        background-color: #eeeeee; 
        border-radius: 50%;
      }
      &.r-outyear {
        color: #eeeeee;
      }
    }

  }
</style>

<template>
  <div class="r-years">
    <div class="r-row" v-for="i in rowStack" :key="i">
      <div :class="{
          'r-cell': true,
          'r-year': true,
          'r-thisyear': getYear(i, j) === selectedYear,
          'r-outyear': getYear(i, j) < startYear || getYear(i, j) > endYear
        }" 
        v-for="j in colStack" :key="j" @click="onSelectYear(getYear(i, j))">{{getYear(i, j)}}</div>        
    </div>
  </div>
</template>

<script>
  const rows = 3, cols = 4;
  export default {
    props: ['year', 'selectedYear', 'onSelectYear'],
    data() {
      return {
        colStack: Array.apply(null, {length: cols}).map(Number.call, Number),
        rowStack: Array.apply(null, {length: rows}).map(Number.call, Number)
      };
    },
    computed: {
      startYear() {
        return this.year - this.year % 10;
      },
      endYear() {
        return this.startYear + 9;
      }
    },
    methods: {
      getYear: function(i, j) {
        const index = i * 4 + j - 1; // index of [startYear - 1, startYear, ..., endYear, endYear + 1]
        return index + this.startYear;
      }
    }
  };

</script>