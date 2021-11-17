<template>
  <div class="basic-layout">
    <div :class="['nav-side',state.isCollapse?'fold':'unfold']">
      <div class="logo">
        <img
          src="./../../assets/logo.png"
          alt=""
        >
        <span v-if="!state.isCollapse">manager</span>
      </div>
      <div class="menu-list">
        <el-menu
          :unique-opened="true"
          class="nav-menu"
          text-color="white"
          background-color="#001529"
          :collapse-transition="false"
          router
          :collapse="state.isCollapse"
          :default-active="activePath"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in state.menuList"
            :key="item.id.toString()"
            :index="item.id.toString()"
          >
            <template #title>
              <el-icon :size="18">
                <component :is="item.icon" />
              </el-icon>
              <span style="margin-left: 10px">{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="child in item.children"
              :key="child.id.toString()"
              :index="child.path"
            >
              <template #title>
                <el-icon :size="18">
                  <component :is="child.icon" />
                </el-icon>
                <span>{{ child.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div :class="['content-right',state.isCollapse?'fold':'unfold']">
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
            :is-dot="state.noticeCount"
            class="notice"
            type="danger"
          >
            <i class="el-icon-bell" />
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ state.userInfo.userName }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">
                  邮箱: {{ state.userInfo.userEmail }}
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
import { Edit, Menu, Setting, Suitcase, ArrowUpBold } from '@element-plus/icons'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
export default {
  name: 'Home',
  components: {
    Menu,
    Edit,
    Setting,
    Suitcase,
    ArrowUpBold
  },
  setup () {
    const instance = getCurrentInstance()
    const activePath = ref('')
    const state = reactive({
      isCollapse: false,
      userInfo: instance.proxy.$store.state.userInfo,
      noticeCount: 0,
      menuList: []
    })
    onBeforeRouteUpdate(to => {
      console.log('to.path')
      console.log(to.path)
      console.log('to.path')
      activePath.value = to.path
    })

    const handleOpen = () => {

    }

    const handleClose = () => {

    }
    const handleLogout = (key) => {
      if (key === 'email') return ''
      console.log(key)
      if (key === 'logout') {
        // this.$store.commit('saveUserInfo', '')
        storage.setItem('userInfo', '')
        state.userInfo = {
          userName: '',
          userEmail: ''
        }
        instance.proxy.$router.push({ name: 'login' })
      }
    }

    const toggleCollapse = () => {
      state.isCollapse = !state.isCollapse
    }

    const getNoticeCount = async () => {
      const count = await instance.proxy.$api.noticeCount()
      state.noticeCount = count.data > 0
    }
    const getPermissionList = async () => {
      const menu = await instance.proxy.$api.getPermissionList()
      state.menuList = menu.data.data.menu_tree_list || []
    }

    onMounted(() => {
      getNoticeCount()
      getPermissionList()

      // 页面刷新时获取当前路由并选中当前路由
      activePath.value = instance.proxy.$router.currentRoute.value.path
    })

    return { activePath, state, handleOpen, handleClose, handleLogout, toggleCollapse, getNoticeCount, getPermissionList }
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

        .nav-menu {
            border-right: none;
        }

        &.fold {
            width: 64px;
        }
    }

    .content-right {
        margin-left: 200px;
        height: 100vh;
        box-sizing: border-box;

        &.fold {
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

            .nav-top-left {
                height: 50px;
                display: flex;
                flex-flow: row nowrap;

                .menu-collapse {
                    cursor: pointer;
                    margin-right: 15px;
                }

                .bread {
                    height: 50px;
                }
            }

            .user-info {
                .notice {
                    line-height: 30px;
                    margin-right: 15px;
                }

                .user-link {
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
