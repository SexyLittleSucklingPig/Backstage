<template>
  <div>
    <Breadcrumb :one="one" :two="two"></Breadcrumb>
    <el-card>
      <el-button type="primary">添加分类</el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scope">
            <i
              :class="
                scope.row.cat_deleted ? ' el-icon-error' : 'el-icon-success'
              "
              :style="{ color: scope.row.cat_deleted ? 'red' : 'green' }"
            ></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scope">
            <el-tag v-if="scope.row.cat_level === 0">{{
              scope.row.cat_level === 0
                ? "一级"
                : scope.row.cat_level === 1
                ? "二级"
                : "三级"
            }}</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 1">{{
              scope.row.cat_level === 0
                ? "一级"
                : scope.row.cat_level === 1
                ? "二级"
                : "三级"
            }}</el-tag>
            <el-tag type="danger" v-else>{{
              scope.row.cat_level === 0
                ? "一级"
                : scope.row.cat_level === 1
                ? "二级"
                : "三级"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <div class="chaozuo">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete-solid"
              >删除</el-button
            >
          </div>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-pagination
        @current-change="handleCurrentChange"
        @prev-click="prevlick"
        @next-click="nextclick"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { classificationgoods } from '@/api/goods'
export default {
  created () {
    this.goodsClass()
  },
  data () {
    return {
      one: '用户管理',
      two: '用户列表',
      tableData: [], // 表格数据
      total: 1, // 总页数
      pagesizes: [1, 2, 4, 6, 10],
      pagesize: 4,
      currentPage: 1
    }
  },
  methods: {
    // 获取所有分类列表
    async goodsClass () {
      try {
        const res = await classificationgoods({ pagenum: this.currentPage, pagesize: this.pagesize })
        console.log(res)
        this.total = res.data.data.total
        this.tableData = res.data.data.result
        console.log(this.tableData)
      } catch (error) {
        console.log(error)
      }
    },
    nextclick () { // 下一页
      this.currentPage += 1
    },
    prevlick () { // 上一页
      this.currentPage -= 1
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.goodsClass()
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.goodsClass()
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
.el-card {
  margin-top: 15px;
}
.chaozuo {
  display: flex;
  .el-button {
    width: 74px;
    height: 28px;
    text-align: center;
    font-size: 12px;
    border-radius: 3px;
    padding: 0;
  }
}
.el-button {
  margin-bottom: 10px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
