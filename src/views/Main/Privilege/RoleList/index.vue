<template>
  <div>
    <Breadcrumb :one="one" :two="two"></Breadcrumb>
    <div class="formlist">
      <el-row :gutter="10">
        <el-col>
          <el-button
            type="primary"
            class="btntian"
            style="margin-bottom: 20px"
            @click="addrole = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="expand" prop="id">
          <template v-slot="scope">
            <el-row v-for="item in scope.row.children" :key="item.id">
              <el-col :span="8">
                <el-tag class="box-8"
                  >{{ item.authName }}
                  <i
                    class="el-icon-close"
                    @click="delitem(scope.row.id, item.id)"
                  ></i
                ></el-tag>
              </el-col>
              <el-col :span="16">
                <el-col
                  class="twobox"
                  v-for="item in item.children"
                  :key="item.id"
                >
                  <el-col :span="8">
                    <el-tag type="success"
                      >{{ item.authName
                      }}<i class="el-icon-close" @click="delitem(scope.row.id,item.id)"></i
                    ></el-tag>
                  </el-col>
                  <el-col
                    ><el-tag v-for="item in item.children" :key="item.id"
                      >{{ item.authName
                      }}<i class="el-icon-close" @click="delitem(scope.row.id,item.id)"></i
                    ></el-tag>
                  </el-col>
                </el-col>
                <!-- <el-col :span="16">
                    <el-tag v-for="item in item.children" :key="item.id">{{item.authName}}</el-tag>
                  </el-col> -->
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="scope">
            <div class="chaozuo">
              <el-button
                type="primary"
                icon="el-icon-edit"
                v-model="scope.row.mg_state"
                @click="
                  change(scope.row.id, scope.row.roleName, scope.row.roleDesc)
                "
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete-solid"
                @click="open(scope.row.id)"
                >删除</el-button
              >
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                @click="setroles(scope.row)"
                >分配权限</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分配权限 -->
      <el-dialog
        title="分配权限"
        :visible.sync="dialogTableVisible"
        width="50%"
        @close="clearlist"
      >
        <el-tree
          ref="roletree"
          :data="taglist"
          node-key="id"
          default-expand-all
          show-checkbox
          :props="defaultProps"
          :default-checked-keys="fenpqilist"
          v-if="dialogTableVisible"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="setCheckedNodes">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="bianji">
      <div slot="footer" class="dialog-footer">
        <el-form :model="form2" ref="form2" :rules="rules">
          <el-form-item
            label="角色名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form2.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="角色描述"
            prop="tall"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form2.tall" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="bianji = false">取 消</el-button>
        <el-button type="primary" @click="enter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addrole">
      <div slot="footer" class="dialog-footer">
        <el-form :model="form3" ref="form3" :rules="rules3">
          <el-form-item
            label="角色名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form3.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="角色描述"
            prop="tall"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form3.tall" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addrole = false">取 消</el-button>
        <el-button type="primary" @click="addend">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  created () {
    this.fromlist()
  },
  data () {
    return {
      one: '权限管理',
      two: '角色列表',
      tableData: [],
      bianji: false, // 编辑
      addrole: false, // 添加
      form2: {
        name: '',
        tall: '',
        id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ]
      },
      form3: {
        name: '',
        tall: ''
      },
      rules3: {
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }]
      },
      taglist: [], // 树状图数据
      treelist: [], // list 标签
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 分配权限
      formLabelWidth: '120px',
      dialogTableVisible: false,
      fenpqilist: [],
      checkall: [], // 选中
      checkid: ''

    }
  },
  methods: {
    fromlist () {
      this.$store.dispatch('Roles/getRoles')
      this.tableData = this.$store.getters.RoleList
      console.log(this.tableData)
      this.$store.dispatch('Roles/allPrivilege', 'tree')
      this.treelist = this.$store.getters.taglist
      this.$store.dispatch('Roles/taglist', 'list')
      this.taglist = this.$store.getters.privilege
    },
    // 分配权限按钮
    setroles (role) {
      this.dialogTableVisible = true
      this.rolerigts(role, this.fenpqilist)
      console.log(this.fenpqilist)
      this.checkid = role.id
      console.log(role.id)
      // console.log(this.checkid)
    },
    // 递归
    rolerigts (list, arr) {
      if (!list.children) {
        return arr.push(list.id)
      }
      list.children.forEach(item => this.rolerigts(item, arr))
    },
    // 确认勾选分配
    setCheckedNodes () {
      this.checkall = [...this.$refs.roletree.getHalfCheckedKeys(), ...this.$refs.roletree.getCheckedKeys()].join(', ')
      console.log(this.checkall)
      this.$store.dispatch('Roles/rolerights', { roleId: this.checkid, rids: this.checkall })
      this.fromlist()
      this.dialogTableVisible = false
    },
    // 关闭分配清空数组
    clearlist () {
      console.log(1)
      this.fenpqilist = []
    },
    // 编辑用户
    change (id, name, tall) {
      this.bianji = true
      this.form2.name = name
      this.form2.tall = tall
      this.form2.id = id
      // this.$store.dispatch('Roles/changerole', { id: id, roleName: name, roleDesc: tall })
    },
    // 编辑提交请求
    enter () {
      this.$store.dispatch('Roles/changerole', { id: this.form2.id, roleName: this.form2.name, roleDesc: this.form2.tall })
      this.bianji = false
    },
    // 删除角色
    open (id) {
      console.log(1)
      this.$confirm('删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('Roles/delrole', { id: id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      this.fromlist()
    },
    // 添加角色
    addend () {
      this.$store.dispatch('Roles/addend', { roleName: this.form3.name, roleDesc: this.form3.tall })
      this.addrole = false
    },
    // 删除权限
    delitem (id, roleid) {
      console.log(id)
      console.log(roleid)
      this.$store.dispatch('Roles/delrolerights', { roleId: id, rightId: roleid })
      this.fromlist()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Breadcrumb
  }
}
</script>

<style scoped lang='less'>
.formlist {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  margin: 15px 0;
  padding: 40px;
}
.chaozuo {
  display: flex;
  .el-button {
    width: 72px;
    height: 28px;
    padding: 0;
    font-size: 12px;
    border-radius: 3px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.tag {
  display: flex;
}
.twobox {
  display: flex;
}
.box-8 {
  text-align: center;
  margin: 0 auto;
}
// /deep/.el-tree {
//   // display: flex;
// }
</style>
