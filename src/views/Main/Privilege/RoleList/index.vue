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
            @click="dialogFormVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="expand" label="#">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
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
                @click="change(scope.row.id)"
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
                @click="setroles(scope.row.id)"
                >分配权限</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      tableData: []
    }
  },
  methods: {
    fromlist () {
      this.$store.dispatch('Roles/getRoles')
      this.tableData = this.$store.getters.RoleList
      console.log(this.tableData)
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
</style>
