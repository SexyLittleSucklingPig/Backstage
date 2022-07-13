<template>
  <el-container class="container">
    <el-header>
      <img
        src="@/assets/src=http___file.moyublog.com_d_file_2021-01-17_5b8123effc732a8d5be66e1c5835c1d0.jpg&refer=http___file.moyublog.webp"
        alt=""
        style="width: 100px; height: 60px; marginTop=10px"
      />
      登录后台管理系统
      <el-button class="btn">退出</el-button>
    </el-header>
    <el-container>
      <!-- <el-aside width="200px"> -->
      <el-menu
        background-color=""
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <div @click="isCollapse = !isCollapse" class="daohang">|||</div>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="1-1"
              @click="
                $router.push(
                  { path: '/userlist' },
                  (onComplete) => {},
                  (onAbort) => {}
                )
              "
              >用户列表</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-menu"></i
            ><span slot="title">权限管理</span></template
          >
          <el-menu-item index="2-1">角色列表</el-menu-item>
          <el-menu-item index="2-2">权限列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title
            ><i class="el-icon-s-goods"></i> <span slot="title">商品管理</span>
          </template>
          <el-menu-item index="3-1">商品列表</el-menu-item>
          <el-menu-item index="3-2">分类参数</el-menu-item>
          <el-menu-item index="3-3">商品分类</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template #title>
            <i class="el-icon-s-claim"></i>
            <span slot="title">订单管理</span></template
          >
          <el-menu-item index="4-1">订单列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template #title>
            <i class="el-icon-s-marketing"></i>
            <span slot="title">数据统计</span></template
          >
          <el-menu-item index="5-1">数据报表</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.container {
  height: 100vh;
  .el-header {
    background-color: #111111;
    color: #fff;
    font-size: 22px;
    .btn {
      margin-top: 10px;
      float: right;
    }
  }
  .el-aside {
    background-color: #111111;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .daohang {
    background-color: rgba(70, 19, 158, 0.794);
    text-align: center;
    line-height: 40px;
    border: none;
  }
}
</style>
