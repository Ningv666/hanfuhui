<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.van-tab--active {
  transform: scale(1.1) !important;
  font-weight: bold !important;
}

.van-tabs__line {
  width: 20px !important;
  background-color: #6CC5D0 !important;
}
</style>
