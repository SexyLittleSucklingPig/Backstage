<template>
  <div>
    <Breadcrumb :one="one" :two="two"></Breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  created () { },
  data () {
    return {
      one: '商品管理',
      two: '添加商品'
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    Breadcrumb
  }
}
</script>

<style scoped lang='scss'>
</style>
