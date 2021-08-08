<template>
  <div>Hi,{{name}}</div>
    <el-button type="primary">主要按钮</el-button>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const name = computed(() => {
  return store.state.user.name
})
</script>

<style scoped>

</style>
