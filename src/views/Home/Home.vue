<template>
  <div class="basic-layout">
    <div class="nav-side" />
    <div class="content-right">
        <div class="nav-top">
            <div class="bread">面包屑</div>
            <div class="user-info">用户</div>
        </div>
      <div class="wrapper">
        <div class="main-page">
            <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }

    const tableData = ref(Array(20).fill(item))

    return {
      tableData
    }
  }
})
</script>

<style lang="scss">
.basic-layout{
    position: relative;
    box-sizing: border-box;
    .nav-side{
        width: 200px;
        height: 100vh;

        color: white;
        background-color: #001529;
        overflow-y: auto;

        transition: width .5s;

        position: fixed;

    }
    .content-right{
        margin-left: 200px;
        height: 100vh;
        box-sizing: border-box;
        .nav-top{
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border: 1px solid #ddd;
            padding: 0 20px;
            box-sizing: border-box;
        }

        .wrapper{
            background: #eef0f3;
            padding: 10px;
            box-sizing: border-box;
            height: calc(100vh - 50px);

            .main-page{
                height: 100%;
                background-color: white;
            }
        }
    }
}
</style>
