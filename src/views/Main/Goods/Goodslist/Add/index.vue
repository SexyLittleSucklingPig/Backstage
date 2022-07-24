<template>
  <div>
    <Breadcrumb :one="one" :two="two"></Breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="消息提示的文案"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-form
        :inline="true"
        label-position="top"
        label-width="80px"
        :model="formInline"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-steps :active="activeName - 0" align-center finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="安成"></el-step>
        </el-steps>

        <el-tabs tab-position="left" v-model="activeName" @tab-click="onclick">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item
              label="商品名称"
              prop="goods_name"
              style="width: 100%"
            >
              <el-input v-model="formInline.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              prop="goods_price"
              style="width: 100%"
            >
              <el-input v-model="formInline.goods_price"></el-input>
            </el-form-item>
            <el-form-item
              label="商品重量"
              prop="goods_weight"
              style="width: 100%"
            >
              <el-input v-model="formInline.goods_weight"></el-input>
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="goods_number"
              style="width: 100%"
            >
              <el-input v-model="formInline.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat" style="width: 100%">
              <div class="block">
                <el-cascader
                  v-model="checkvlue"
                  :options="options"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                  }"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="(item, index) in parameterList"
              :key="index"
              :label="item.attr_name"
              prop="goods_name"
              style="width: 100%"
            >
              <el-checkbox
                v-for="(item1, index) in item.attr_vals.split(' ')"
                :key="index"
                :label="item1"
                :checked="checked1"
                border
              ></el-checkbox>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item label="商品名称" style="width: 100%">
              <el-input v-model="formInline.goods_name"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">角色管理</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
import { parameterlist } from '@/api/goods'
export default {
  created () {
    this.getClassificationlist()
  },
  data () {
    return {
      one: '商品管理',
      two: '添加商品',
      activeName: '0', // 步骤条
      formInline: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 2, max: 16, message: '不能为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      // value: [], // 分类显示
      checkid: '', // 选中id
      checkvlue: [],
      options: [], // 分类数据 可选
      parameterList: [], // 分类列表
      checked1: true, // 勾选
      fileList: []
    }
  },
  methods: {
    // 获取分类数据
    getClassificationlist () {
      this.$store.dispatch('goods/getClassificationlist')
      this.options = this.Classificationlist
      console.log(this.options)
    },
    // 获取分类参数 (动态)
    async getparameterlist () {
      try {
        const res = await parameterlist(this.checkid, 'many')
        console.log(res)
        this.parameterList = res.data.data
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        }
      } catch (error) {
        this.$message.success(error.message)
        console.log(error)
      }
    },
    async getparameterlist2 () {
      try {
        const res = await parameterlist(this.checkid, 'only')
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        }
      } catch (error) {
        this.$message.success(error.message)
        console.log(error)
      }
    },
    handleChange (value) { // 级联选择
      // console.log(value) //id
      this.checkid = value[value.length - 1]
      this.formInline.goods_cat = value.join(',')
      // console.log(this.checkid)
      // console.log(this.formInline.goods_cat)
    },

    // 图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },

    // 导航点击
    onclick (name) {
      console.log(name.index)
      if (name.index === '1') {
        this.getparameterlist()
      } else if (name.index === '2') {
        this.getparameterlist2()
      }
    }
  },
  computed: {
    ...mapGetters(['Classificationlist'])
  },
  watch: {},
  filters: {},
  components: {
    Breadcrumb
  }
}
</script>

<style scoped lang='less'>
.el-form {
  padding: 20px 20px;
}
.el-card {
  margin-top: 20px;
}
</style>
