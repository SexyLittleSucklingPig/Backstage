<template>
  <div class="main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="formlist">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="input2">
            <template slot="append">
              <el-button @click="search"
                ><i class="el-icon-search"></i
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button
            type="primary"
            class="btntian"
            @click="dialogFormVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 添加用户 -->
      <el-dialog title="添加用户对话框" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" label-width ref="form">
          <el-form-item
            prop="name"
            label="用户名"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.name" autocomplete="off"> </el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="mobile"
            label="手机号"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="loginFn">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#409eff"
              @click.native="changetype(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template v-slot="scope">
            <div class="chaozuo">
              <el-button
                type="primary"
                icon="el-icon-edit"
                v-model="scope.row.mg_state"
                @click="change(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete-solid"
                @click="open(scope.row.id)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                @click="setroles(scope.row.id)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 设置对话框 -->
      <el-dialog title="提示" :visible.sync="setuser" width="30%">
        <p>当前用户：{{ nowuser }}</p>
        <p>当前的角色：{{ nowrole }}</p>
        <div class="block">
          <span>分配新角色：</span>
          <el-select v-model="rolevalue" placeholder="请选择" value-key>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.roleName"
            >
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setuser = false">取 消</el-button>
          <el-button type="primary" @click="role">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户 -->
      <el-dialog title="编辑用户" :visible.sync="bianji">
        <el-form :model="form2" :rules="rules2" ref="form2">
          <el-form-item
            label="用户名"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form2.name"
              disabled
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
            <el-input v-model="form2.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="mobile"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form2.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bianji = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 页码 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          @prev-click="prevlick"
          @next-click="nextclick"
          :current-page="currentPage"
          :page-sizes="pagesizes"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { validateemail, validatemobile } from '@/utils/validate'// 添加用户邮箱校验  手机号验证
export default {
  created () {
    this.UserList()
  },
  data () {
    // 用户邮箱校验
    const validateemailFn = (rule, value, callback) => {
      if (validateemail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    // 手机号校验
    const validatemobileFn = (rule, value, callback) => {
      if (validatemobile(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      input: '',
      input2: '',
      tableData: [{}],
      total: 0,
      pagesizes: [5, 10, 20],
      currentPage: 1,
      gridData: [],
      dialogFormVisible: false, // 添加对话框显示隐藏
      bianji: false, // 编辑对话框
      setuser: false,
      rolelist: [], // 选泽数据
      rolevalue: '', // 确定选择
      nowuser: '', // 当前用户
      nowrole: '',
      // 添加用户
      form: {
        name: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateemailFn, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户手机号', trigger: 'blur' },
          { validator: validatemobileFn, trigger: 'blur' }
        ]
      },
      form2: {
        name: '',
        email: '',
        mobile: ''
      },
      rules2: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateemailFn, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户手机号', trigger: 'blur' },
          { validator: validatemobileFn, trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    async UserList () { // 获取用户列表
      try {
        await this.$store.dispatch('userlist/UserList', { pagenum: this.currentPage, pagesize: 5 })
        // const res = await UserList({ pagenum: this.currentPage, pagesize: 5 })
        this.total = this.$store.getters.usrlist.total // 获取vuex  getters 内变量
        // console.log(this.$store.getters.usrlist.total)
        this.tableData = this.$store.getters.usrlist.users
        // console.log(this.tableData)
      } catch (err) {
        console.log(err)
      }
    },
    async nextclick () { // 下一页
      this.currentPage += 1
    },
    async prevlick () { // 上一页
      this.currentPage -= 1
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    async loginFn () {
      try {
        await this.$refs.form.validate()
        try {
          this.$store.dispatch('userlist/adduser', {
            username: this.form.name,
            password: this.form.password,
            email: this.form.email,
            mobile: this.form.mobile
          })
          this.$message.success('创建成功')
          this.dialogFormVisible = false
          this.UserList()
        } catch (error) {
          console.log(error)
          this.$message.success('创建失败')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 更改用户状态
    async changetype (uld, type) {
      try {
        await this.$store.dispatch('userlist/Changestatus', { uld: uld, type: type })
      } catch (error) {
        console.log(error)
      }
    },
    // 查询
    async search () {
      const id = this.input2
      console.log(id)
      try {
        await this.$store.dispatch('userlist/UserList', { query: id, pagenum: this.currentPage, pagesize: 5 })
        this.total = this.$store.getters.usrlist.total
        this.tableData = this.$store.getters.usrlist.users
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑用户框
    change (id) {
      this.bianji = true
      const res = this.tableData.filter(item => item.id === id)
      this.form2.name = res[0].username
      this.form2.email = res[0].email
      this.form2.mobile = res[0].mobile
    },
    // 编辑确认
    async edit () {
      try {
        // 二次校验
        await this.$refs.form2.validate()
        this.bianji = false
        const id = this.tableData.filter(item => item.username === this.form2.name)[0].id
        this.$store.dispatch('userlist/edituser', { id: id, email: this.form2.email, mobile: this.form2.mobile })
        this.$message.success('更新成功')
        this.UserList()
      } catch (error) {
        console.log(error)
      }
    },
    open (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        try {
          this.$store.dispatch('userlist/deleuser', { id: id })
        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 设置点击
    setroles (id) {
      this.setuser = true
      this.$store.dispatch('Roles/getRoles')
      // console.log(this.$store.getters.RoleList) //角色列表
      this.rolelist = this.$store.getters.RoleList
      console.log(this.$store.getters.RoleList)
      this.nowuser = this.tableData.filter(item => item.id === id)[0].username
      this.nowrole = this.tableData.filter(item => item.id === id)[0].role_name
    },
    // 设置请求
    role () {
      if (this.rolevalue === '') {
        return this.$message.error('你二臂啊，必选项！')
      }
      const id = this.tableData.filter(item => item.username === this.nowuser)[0].id
      const rid = this.rolelist.filter(item => item.roleName === this.rolevalue)[0].id
      this.$store.dispatch('userlist/setuser', { id: id, rid: rid })
    }
  },
  computed: {},
  watch: {
    currentPage: {
      deep: true,
      immediate: true,
      handler () {
        this.UserList()
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
* {
  margin: 0;
}
.formlist {
  width: 100%;
  height: 456px;
  background-color: #fff;
  overflow: hidden;
  margin: 15px 0;
  padding: 20px;
}
.el-input {
  margin: 0 30px 20px 0;
}
.chaozuo {
  display: flex;
  .el-button {
    width: 44px;
    height: 28px;
    padding: 0;
  }
}
.block {
  margin-top: 15px;
}
:deep(.el-form-item__content) {
  margin-bottom: 30px;
}
:deep(.el-input) {
  margin-bottom: 30px;
}
</style>
