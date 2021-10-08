<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form
        ref="userForm"
        :model="user"
        status-icon
        :rules="rules"
      >
        <div class="title">
          登录系统
        </div>
        <el-form-item
          prop="userName"
          required
        >
          <el-input
            v-model="user.userName"
            type="text"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item
          prop="userPwd"
          required
        >
          <el-input
            v-model="user.userPwd"
            type="password"
            prefix-icon="el-icon-view"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="login('userForm')"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        userName: '',
        userPwd: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
            validate: this.validateUserName
          }
        ],
        userPwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
            validate: this.validateUserPwd
          }
        ]
      }
    }
  },
  methods: {
    login (form) {
      this.$refs[form].validate((valid) => {
        console.log('dddddddd')
        console.log(valid)
        console.log('dddddddd')
        if (valid) {
          console.log('111111')
          this.$api.login(this.user).then((res) => {
            console.log('ddaaaaaaaa')
            this.$store.commit('saveUserInfo', res)
            this.$router.push('/welcome')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goHome () {
      this.$router.push('/welcome')
    },
    validateUserName  (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    },
    validateUserPwd  (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入用户密码'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss">
.login-wrapper{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: #f9fcff;
    width: 100vw;
    height: 100vh;

    .modal{
        width: 500px;
        padding: 50px;
        background-color: white;
        border-radius: 15px;

        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 10px 3px #c7c9cd4d;

        .title{
            font-size: 30px;

            text-align: center;
            line-height: 1.5;

            margin-bottom: 20px;
        }

        .login-btn{
            width: 100%;
        }
    }
}
</style>
