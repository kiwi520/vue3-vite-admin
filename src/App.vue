<template>
  <router-view />
</template>

<script>
export default {
  mounted () {
    this.$storage.setItem('ad', 'b')
  }
}
</script>

<style lang="scss">
@import "./assets/css/reset.css";
@import "assets/css/index.scss";
*{
    padding: 0;
    margin: 0;
}
</style>
