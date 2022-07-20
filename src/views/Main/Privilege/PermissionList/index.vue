<template>
  <div>
    <Breadcrumb :one="one" :two="two"></Breadcrumb>
    <div class="formlist">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="role_name" label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === '0'">{{
              scope.row.level === "0"
                ? "等级一"
                : scope.row.level === "1"
                ? "等级二"
                : "等级三"
            }}</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">{{
              scope.row.level === "0"
                ? "等级一"
                : scope.row.level === "1"
                ? "等级二"
                : "等级三"
            }}</el-tag>
            <el-tag type="danger" v-else>{{
              scope.row.level === "0"
                ? "等级一"
                : scope.row.level === "1"
                ? "等级二"
                : "等级三"
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { allPrivilege } from '@/api/roles'
export default {
  created () {
    this.allrolelist()
  },
  data () {
    return {
      one: '权限管理',
      two: '权限列表',
      tableData: []
    }
  },
  methods: {
    async allrolelist () {
      try {
        const res = await allPrivilege('list')
        console.log(res)
        this.tableData = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    at (scope) {
      console.log(scope)
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
html {
  position: fixed;
}
.formlist {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  margin: 15px 0;
  padding: 40px;
}
</style>
