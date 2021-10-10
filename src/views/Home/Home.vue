<template>
  <div class="basic-layout">
    <div :class="['nav-side',isCollapse?'fold':'unfold']">
      <div class="logo">
        <img
          src="./../../assets/logo.png"
          alt=""
        >
        <span v-if="isCollapse?false:true">manager</span>
      </div>
      <div class="menu-list">
        <el-menu
          default-active="1"
          class="nav-menu"
          router
          background-color="#001529"
          text-color="white"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-setting" />
              <span>系统管理</span>
            </template>
            <el-menu-item index="/dept">
              部门管理
            </el-menu-item>
              <el-menu-item index="/user">
              用户管理
            </el-menu-item>
            <el-menu-item index="2">
              菜单管理
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-suitcase" />
              <span>审批管理</span>
            </template>
            <el-menu-item index="3">
              休假申请
            </el-menu-item>
            <el-menu-item index="4">
              待我审批
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div :class="['content-right',isCollapse?'fold':'unfold']">
      <div class="nav-top">
        <div class="nav-top-left">
          <div
            class="menu-collapse"
            @click="toggleCollapse"
          >
            <i class="el-icon-s-fold" />
          </div>
          <div class="bread">
            面包屑
          </div>
        </div>
        <div class="user-info">
          <el-badge
            :is-dot="noticeCount"
            class="notice"
            type="danger"
          >
            <i class="el-icon-bell" />
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">
                  邮箱: {{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  退出:
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
import storage from '../../utils/storage'

export default {
  name: 'Home',
  data () {
    return {
      userInfo: this.$store.state.userInfo,
      isCollapse: false,
      noticeCount: 0,
      menuList: []
    }
  },
  mounted () {
    this.getNoticeCount()
    // this.getMenuList()
  },
  methods: {
    handleLogout (key) {
      if (key === 'email') return ''
      console.log(key)
      if (key === 'logout') {
        // this.$store.commit('saveUserInfo', '')
        storage.setItem('userInfo', '')
        this.userInfo = {
          userName: '',
          userEmail: ''
        }
        this.$router.push({ name: 'login' })
      }
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    async getNoticeCount () {
      const count = await this.$api.noticeCount()
      this.noticeCount = count.data > 0
    },
    async getMenuList () {
      const menu = await this.$api.menuList()
      this.menuList = menu || []
    }
  }
}
</script>

<style lang="scss">
.basic-layout {
    position: relative;
    box-sizing: border-box;

    .nav-side {
        width: 200px;
        height: 100vh;
        overflow-x: hidden;

        color: white;
        background-color: #001529;
        overflow-y: auto;

        transition: width .5s;

        position: fixed;

        .logo {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            height: 50px;

            img {
                width: 32px;
                height: 32px;
                margin: 0 16px;
            }
        }

        .nav-menu{
            border-right: none;
        }

        &.fold{
            width: 64px;
        }
    }

    .content-right {
        margin-left: 200px;
        height: 100vh;
        box-sizing: border-box;

        &.fold{
            margin-left: 64px;
        }
        .nav-top {
            width: 100%;
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border: 1px solid #ddd;
            padding: 0 10px;
            box-sizing: border-box;

            .nav-top-left{
                height: 50px;
                display: flex;
                flex-flow: row nowrap;
                .menu-collapse{
                    cursor: pointer;
                    margin-right: 15px;
                }
                .bread{
                    height: 50px;
                }
            }

            .user-info{
                .notice{
                    line-height: 30px;
                    margin-right: 15px;
                }
                .user-link{
                    cursor: pointer;
                    color: #409eff;
                }
            }
        }

        .wrapper {
            background: #eef0f3;
            padding: 10px;
            box-sizing: border-box;
            height: calc(100vh - 50px);

            .main-page {
                height: 100%;
                background-color: white;
            }
        }
    }
}
</style>
