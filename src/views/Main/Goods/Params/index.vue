<template>
  <div>
    <Breadcrumb :one="one" :two="two"></Breadcrumb>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>
      <span class="demonstration">选择商品分类 : </span>
      <el-cascader
        v-if="value"
        v-model="value"
        :options="options"
        :props="{
          expandTrigger: 'hover',
          value: 'cat_id',
          label: 'cat_name',
        }"
        @change="handleChange"
      ></el-cascader>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button
            type="primary"
            size="mini"
            @click="addparameter"
            :disabled="value.length < 3"
            >添加参数</el-button
          >
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="expand">
              <template v-slot="scope">
                <span class="chaozuo" v-if="scope.row.attr_vals.length > 0">
                  <el-tag
                    v-for="(item, index) in scope.row.attr_vals
                      .trim()
                      .split(' ')"
                    :key="index"
                    >{{ item }}
                    <i class="el-icon-close"></i>
                  </el-tag>
                </span>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column prop="attr_name" label="分类"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click.native="compile(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="onDelete(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="静态管理" name="second">
          <el-button
            type="primary"
            size="mini"
            @click="addparameter1"
            :disabled="value.length < 2"
            >添加属性</el-button
          >
          <el-table :data="tableData2" border style="width: 100%">
            <el-table-column type="expand">
              <template v-slot="scope">
                <!-- <span class="chaozuo" v-if="scope.row.attr_vals.length > 0">
                  <el-tag
                    v-for="(item, index) in scope.row.attr_vals.split(' ')"
                    :key="index"
                    >{{ item }}
                    <i class="el-icon-close"></i>
                  </el-tag>
                </span> -->
                <el-tag
                  :key="tag"
                  v-for="tag in scope.row.attr_vals.split(' ')"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"> </el-table-column>
            <el-table-column prop="attr_name" label="分类"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click.native="compile1(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="onDelete(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
            -->
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加动态参数 -->
      <el-dialog
        :title="addtitle"
        :visible.sync="dialogFormVisible"
        @close="closeed"
      >
        <el-form :model="addform1" :rules="addrules1">
          <el-form-item
            :label="addlabel"
            prop="attr_name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform1.attr_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="enteradd">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { parameterlist, addaddparameter, modify, remove } from '@/api/goods'
import { mapGetters } from 'vuex'
export default {
  created () {
    this.getClassificationlist()
  },
  data () {
    return {
      one: '商品管理',
      two: '分类参数',
      value: [], // 级联选择
      options: [], // 级联选择
      optionsid: '', // 级联选中ID
      activeName: 'first', // 导航高亮、
      tableData: [], // 表单
      tableData2: [],
      addform1: { attr_name: '' }, // 添加动态参数
      addrules1: {
        attr_name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ]
      }, //
      dialogFormVisible: false, // 添加动态参数显示隐藏
      formLabelWidth: '80px',
      clickbtn: 1, // 添加按钮
      onlyMany: '', // 添加参数选择静态或动态
      onlyMany1: '', // 编辑静态或动态
      compileid: '', // 编辑ID
      addtitle: '', // 添加标题
      addlabel: '', // 添加标题
      // 添加标签
      inputVisible: false,
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputValue: ''
    }
  },
  methods: {
    // 级联选择
    async handleChange (value) {
      this.optionsid = value[value.length - 1]
      console.log(this.optionsid)
      this.manylist()
      this.onlylist()
    },
    // 动态数据
    async manylist () {
      try {
        const res = await parameterlist(this.optionsid, 'many')
        console.log(res)
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data
          console.log(this.tableData)
        }
      } catch (error) {
        this.$message.success(error.message)
        console.log(error)
      }
    },
    // 静态数据
    async onlylist () {
      try {
        const res = await parameterlist(this.optionsid, 'only')
        console.log(res)
        if (res.data.meta.status === 200) {
          this.tableData2 = res.data.data
          console.log(this.tableData2)
        }
      } catch (error) {
        this.$message.success(error.message)
        console.log(error)
      }
    },
    // 导航
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 分类参数
    getClassificationlist () {
      this.$store.dispatch('goods/getClassificationlist')
      this.options = this.Classificationlist
      console.log(this.options)
    },
    // 编辑动态
    compile (id) {
      this.compileid = id
      this.clickbtn = 3
      this.addtitle = '修改动态参数'
      this.addlabel = '参数名称'
      this.dialogFormVisible = true
    },
    // 静态
    compile1 (id) {
      this.compileid = id
      this.clickbtn = 4
      this.addtitle = '修改静态参数'
      this.addlabel = '参数名称'
      this.dialogFormVisible = true
    },
    // 添加动态参数
    addparameter () {
      this.clickbtn = 1
      this.addtitle = '添加动态参数'
      this.addlabel = '动态参数'
      this.dialogFormVisible = true
    },
    // 添加静态参数
    addparameter1 () {
      this.clickbtn = 2
      this.addtitle = '添加静态参数'
      this.addlabel = '静态参数'
      this.dialogFormVisible = true
    },
    // 添加确认
    async enteradd () {
      if (this.addform1.attr_name.length < 2 || this.addform1.attr_name.length > 7) {
        this.$message.error('名称不符合规范')
        return
      } else {
        if (this.clickbtn === 1) {
          this.onlyMany = 'many'
          try {
            const res = await addaddparameter({ id: this.optionsid, attr_name: this.addform1.attr_name, attr_sel: this.onlyMany })
            console.log(res)
            if (res.data.meta.status === 201) {
              this.$message.success(res.data.meta.msg)
            } else {
              this.$message.error(res.data.meta.msg)
            }
          } catch (error) {
            this.$message.success(error.message)
            console.log(error)
          }
        } else if (this.clickbtn === 2) {
          this.onlyMany = 'only'
          try {
            const res = await addaddparameter({ id: this.optionsid, attr_name: this.addform1.attr_name, attr_sel: this.onlyMany })
            console.log(res)
            if (res.data.meta.status === 201) {
              this.$message.success(res.data.meta.msg)
            } else {
              this.$message.error(res.data.meta.msg)
            }
          } catch (error) {
            this.$message.success(error.message)
            console.log(error)
          }
        } else if (this.clickbtn === 3) {
          console.log(this.optionsid)
          console.log(this.compileid)
          this.onlyMany1 = 'many'
          try {
            const res = await modify({ id: this.optionsid, attrId: this.compileid, attr_name: this.addform1.attr_name, attr_sel: this.onlyMany1, attr_vals: this.dynamicTags.join(' ') })
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
            } else {
              this.$message.error(res.data.meta.msg)
            }
          } catch (error) {
            this.$message.success(error.message)
            console.log(error)
          }
          this.clickbtn = 1
        } else {
          this.onlyMany1 = 'only'
          try {
            const res = await modify({ id: this.optionsid, attrId: this.compileid, attr_name: this.addform1.attr_name, attr_sel: this.onlyMany1, attr_vals: this.dynamicTags.join(' ') })
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
            } else {
              this.$message.error(res.data.meta.msg)
            }
          } catch (error) {
            this.$message.success(error.message)
            console.log(error)
          }
          this.clickbtn = 2
        }
        this.manylist()
        this.onlylist()
      }

      this.dialogFormVisible = false
    },
    // 删除点击
    onDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await remove({ id: this.optionsid, attrid: id })
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加标签
    async handleInputConfirm (val) {
      console.log(val)
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags = val.attr_vals.split(' ')
        console.log(this.dynamicTags)
        this.dynamicTags.push(inputValue)
        if (this.clickbtn === 1) {
          this.onlyMany = 'many'
        } else {
          this.onlyMany = 'only'
        }
        try {
          const res = await modify({ id: val.cat_id, attrId: val.attr_id, attr_name: val.attr_name, attr_sel: this.onlyMany, attr_vals: this.dynamicTags.join(' ') })
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
          } else {
            this.$message.error(res.data.meta.msg)
          }
          this.manylist()
          this.onlylist()
        } catch (error) {
          this.$message.success(error.message)
          console.log(error)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    closeed () { // 关闭弹窗清空
      this.addform1.attr_name = ''
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
.el-cascader {
  margin-top: 15px;
}
.el-button {
  margin-bottom: 20px;
}
.el-card {
  margin-top: 20px;
  padding: 20px;
}

.el-tag {
  margin-left: 30px;
}
.button-new-tag {
  margin-left: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
