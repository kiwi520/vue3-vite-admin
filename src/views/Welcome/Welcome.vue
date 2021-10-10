<template>
  <div class="welcome">
    <div class="content">
      <div class="content-left">
        <div class="sub-title">
          欢迎体验
        </div>
        <div class="title">
          沐风平台后台管理系统
        </div>
        <div class="desc">
          - Vue3.0+ElementPlus+Node+Mongo打造通用后台管理系统
        </div>
      </div>
      <div class="content-right">
        <div class="img">
          <img
            src="../../assets/images/welcome.png"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="scss">
.welcome{
    background: white;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    .content{
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        .content-left{
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;

            position: relative;
            bottom: 80px;
            .sub-title{
                font-size: 30px;
                line-height: 42px;
                color: #333;
            }
            .title{
                font-size: 40px;
                line-height: 62px;
                color: #409eff;
            }
            .desc{
                text-align: right;
                font-size: 14px;
                color: #999;
            }
        }
        .content-right{
            height: inherit;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
