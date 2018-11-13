<template>
  <div id="app">
    <Calculator :max-digit-num=2 :max-history-num=20 />
  </div>
</template>

<script>
  import Calculator from './components/Calculator.vue';
  
  export default { 
    name: 'app',
    components: {
      Calculator
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: center
}
</style>
