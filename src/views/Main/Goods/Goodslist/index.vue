<template>
  <div>
    <Breadcrumb :one="one" :two="two"></Breadcrumb>
    <!-- 添加搜索用户 -->
    <div class="formlist">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="input2">
            <template slot="append">
              <el-button @click="getproduct"
                ><i class="el-icon-search"></i
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="$router.push('main/goods/add')"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="scope">
            {{ scope.row.add_time | datefromat }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="200">
          <template v-slot="scope">
            <div class="chaozuo">
              <el-button
                type="primary"
                icon="el-icon-edit"
                v-model="scope.row.mg_state"
                @click="change(scope.row.goods_id)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete-solid"
                @click="open(scope.row.goods_id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          @prev-click="prevlick"
          @next-click="nextclick"
          :current-page="currentPage"
          :page-sizes="pagesizes"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 编辑商品 -->
      <el-dialog title="提示" :visible.sync="setgoodsVisible" width="50%">
        <el-form ref="form" :model="form2" label-width="80px" :rules="rules2">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="form2.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="goods_price">
            <el-input v-model="form2.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="goods_number">
            <el-input v-model="form2.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="goods_weight">
            <el-input v-model="form2.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="goods_introduce">
            <el-input v-model="form2.goods_introduce" disabled></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="pics">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品参数" prop="attrs">
            <el-input v-model="form2.attrs" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setgoodsVisible = false">取 消</el-button>
          <el-button type="primary" @click="setgoodsenter">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getProductList, delegoods, goodsId, setgoods } from '@/api/goods'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  created () {
    this.getproduct()
  },
  data () {
    return {
      one: '商品管理',
      two: '商品管理',
      form: [],
      rules: [],
      tableData: [],
      time: '',
      input2: '',
      dialogFormVisible: false,
      pagesize: 5, // 每页显示条数
      pagesizes: [5, 10, 20],
      currentPage: 1, // 第几页
      total: 0, // 共多少条
      formLabelWidth: '100px',
      setgoodsVisible: false, // 商品修改
      form2: {
        goods_name: '', // 商品名称
        goods_price: '', // 价格
        goods_number: '', // 数量
        goods_weight: '', // 重量
        goods_introduce: '', // 介绍
        pics: [], // 图片
        attrs: '' // 参数
      },
      rules2: {
        goods_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '不能为空', trigger: 'blur' }], // 价格
        goods_number: [{ required: true, message: '不能为空', trigger: 'blur' }], // 数量
        goods_weight: [{ required: true, message: '不能为空', trigger: 'blur' }] // 重量
      },
      dialogImageUrl: '', // 图片路径
      dialogVisible: false, // 图片显示
      id: null
    }
  },
  methods: {
    async getproduct () {
      try {
        const id = this.input2
        const res = await getProductList({ query: id, pagenum: this.currentPage, pagesize: this.pagesize })
        this.tableData = res.data.data.goods
        console.log(this.tableData)
        this.total = res.data.data.total
      } catch (error) {
        console.log(error)
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getproduct()
    },
    handleSizeChange (val) {
      console.log(val)
      this.pagesize = val
      this.getproduct()
    },
    nextclick () { // 下一页
      // this.currentPage += 1
      console.log(1)
    },
    prevlick () { // 上一页
      this.currentPage -= 1
    },
    async change (id) { // 编辑商品点击
      console.log(id)
      this.id = id
      const res = await goodsId(id)
      console.log(res)
      this.form2.goods_name = res.data.data.goods_name
      this.form2.goods_price = res.data.data.goods_price
      this.form2.goods_number = res.data.data.goods_number
      this.form2.goods_weight = res.data.data.goods_weight
      this.setgoodsVisible = true
    },
    async setgoodsenter () {
      console.log(this.id)
      // this.form2 = Object.keys(this.form2)
      console.log(this.form2)
      try {
        const res = await setgoods({ id: this.id, goods_name: this.form2.goods_name, goods_price: this.form2.goods_price, goods_number: this.form2.goods_number, goods_weight: this.form2.goods_weight, goods_introduce: '', pics: [], attrs: [] })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
      this.setgoodsVisible = false
    },
    // 图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async open (id) { // 删除
      // const id = 1
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delegoods(id)
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        } else {
          this.$message.error(res.data.meta.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    width: 74px;
    height: 28px;
    text-align: center;
    font-size: 12px;
    border-radius: 3px;
    padding: 0;
  }
}
:deep(.el-input) {
  margin-bottom: 30px;
}
</style>
