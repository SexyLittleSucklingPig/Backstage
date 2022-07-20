<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/first' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ one }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ two }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    one: {
      type: String
    },
    two: {
      type: String
    }
  },
  created () { },
  data () {
    return {
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
