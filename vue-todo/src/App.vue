<template>
  <div id="app">
    <div class="todos">
      <Todos></Todos>
    </div>
  </div>
</template>

<script>
  import Todos from './components/Todos.vue';

  export default {
    name: 'app',
    components: {
      Todos
    }
  };
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;  
  }

  .todos {
    width: 50%;
  }
</style>
