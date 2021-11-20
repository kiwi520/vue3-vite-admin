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
          prop="email"
          required
        >
          <el-input
            v-model="user.email"
            type="text"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item
          prop="password"
          required
        >
          <el-input
            v-model="user.password"
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
import storage from '../../utils/storage'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
            validate: this.validateUserName
          }
        ],
        password: [
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
            // console.log(res)
            console.log('ddaaaaaaaa')
            if (res.status === 200) {
              this.$store.commit('user/saveUserInfo', res.data.data)
              storage.setItem('userInfo', res.data.data || {})
              storage.setItem('_token', res.data.data.token || {})
              this.$router.push('/welcome')
            } else {
              console.log('saaa')
              this.$message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
            this.$message.error(err.msg)
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
