<template>
  <div class="main">
    <div class="form-box">
      <el-form :model="loginFn" :rules="rules" ref="loginFn">
        <el-form-item prop="username">
          <el-input v-model="loginFn.username" prefix-icon="el-icon-user-solid">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginFn.password" prefix-icon="el-icon-warning">
          </el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      loginFn: {
        // 字段变量名与接口保持一致
        username: 'admin',
        password: '123456'
      },

      rules: { // 用户名和密码校验
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      // 获取表单组件 将所有表单数据重置 并移除校验结果 清空重新开始
      this.$refs.loginFn.resetFields()
    },
    async login () {
      try {
        await this.$refs.loginFn.validate()
        try {
          this.$store.dispatch('user/login', this.loginFn)
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        this.message.error('登录表单失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  width: 100vw;
  height: 100vh;
  background-color: #02172c;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: rgb(255, 255, 255);
    padding: 40px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
    border-radius: 15px;
  }
}
</style>
