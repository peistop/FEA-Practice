<style lang="less">
.r-calendar {
  background-color: #fff;
  -moz-box-shadow: 0 0 5px #ccc;
  -webkit-box-shadow: 0 0 5px #ccc;
  box-shadow: 0 0 5px #ccc;
  position: relative;
  margin: 40px;

  &:after{
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .r-head {
    flex-grow: 1;
    flex-basis: 0;
    padding-top: 20px;
  }

  .r-inner{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  .r-row {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: center;
  }

  .r-cell {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
    flex-basis: 0;
    justify-content: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>

<template>
  <div class="r-calendar">
    <div class="r-inner">
      <calendar-header :title="title" :on-prev="onPrev" :on-select-view="onSelectView" :on-next="onNext" />
      <week-days v-if="view === 'DATES'" :start-day="startDay" :day-names="dayNames" />
      <month-dates v-if="view === 'DATES'" :year="year" :month="month" :startDay="startDay" :selectedDate="selectedDate" :onSelectDate="onSelectDate" />
      <month-selector v-if="view === 'MONTHS'" :year="year" :monthNames="monthNames"
                      :selectedMonth="selectedMonth" :selectedYear="selectedYear" :onSelectMonth="onSelectMonth" />
      <year-selector v-if="view === 'YEARS'" :year="year" :selectedYear="selectedYear" :onSelectYear="onSelectYear" />
    </div>
  </div>
</template>

<script>
  import CalendarHeader from './CalendarHeader';
  import WeekDays from './WeekDays';
  import MonthDates from './MonthDates';
  import MonthSelector from './MonthSelector';
  import YearSelector  from './YearSelector';
  
  const date = new Date();
  
  export default {
    components: {
      CalendarHeader,
      WeekDays,
      MonthDates,
      MonthSelector,
      YearSelector
    },
    props: {
      startDay: {
        type: Number,
        default: 0
      },
      monthNames: {
        type: Array,
        default: () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      monthFullNames: {
        type: Array,
        default: () => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      },
      dayNames: {
        type: Array,
        default: () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    data() {
      return {
        view: 'DATES',
        year: date.getFullYear(), // year the current calendar shows
        month: date.getMonth(), //getMonth() returns index of months
        selectedYear: date.getFullYear(),
        selectedMonth: date.getMonth(),
        selectedDay: date.getDate(), 
        selectedDate: date,
      };
    },
    computed: {
      title() {
        switch (this.view) { //state pattern ?
          case 'DATES':
            return this.monthFullNames[this.month] + ' ' + this.year;
          case 'MONTHS':
            return this.year;
          case 'YEARS':
            return this.startYear + '-' + this.endYear;
        }
        return '';
      },
      startYear() {
        return this.year - this.year % 10;
      },
      endYear() {
        return this.year + 9;
      }
    },
    methods: {
      onPrev: function() {
        if (this.view === "DATES") {
          if (this.month > 0) {
            this.month = this.month - 1;
          } 
          else {
            this.month = 11;
            this.year = this.year - 1;
          }
        } 
        else if (this.view === "MONTHS") {
          this.year = this.year - 1;
          this.month = 0;
        } 
        else if (this.view === "YEARS") {
          this.year = this.year - 10;
          this.month = 0;
        }
      },
      onNext: function() {
        if (this.view === "DATES") {
          if (this.month < 11) {
            this.month = this.month + 1;
          } 
          else {
            this.month = 0;
            this.year = this.year + 1;
          }
        } 
        else if (this.view === "MONTHS") {
          this.year = this.year + 1;
          this.month = 0;
        } 
        else if (this.view === "YEARS") {
          this.year = this.year + 10;
          this.month = 0;
        }
      },
      onSelectView: function() {
        if (this.view === 'DATES') {
          this.view = 'MONTHS';
        } 
        else if (this.view === 'MONTHS') {
          this.view = 'YEARS';
        }
      },
      onSelectDate: function(year, month, day) {
        this.selectedYear = year;
        this.selectedMonth = month;
        this.selectedDay = day;
        this.selectedDate = new Date(year, month, day);
      },
      onSelectMonth: function(month) {
        this.month = month;
        this.view = 'DATES';
      },
      onSelectYear: function(year) {
        this.year = year;
        this.view = 'MONTHS';
      }
    }
  };
</script>
