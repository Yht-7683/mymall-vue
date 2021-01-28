<template>
  <nav class="site-navbar">
    <div class="site-navbar__body">
      <el-menu
        class="site-navbar__menu--right"
        mode="horizontal"
        background-color="#F57215"
        text-color="white"
        router>
        <el-menu-item index="home">
           首页
        </el-menu-item>
        <el-menu-item index="mall-1">
          家电
        </el-menu-item>
        <el-menu-item index="2">
          服装
        </el-menu-item>
        <el-menu-item index="3">
          食品
        </el-menu-item>
        <el-menu-item index="4">
          生鲜
        </el-menu-item>
        <el-menu-item index="5">
          进口
        </el-menu-item>
        <el-menu-item index="6">
          数码
        </el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<script>

  export default {
    data () {
      return {

      }
    },
    components: {

    },
    computed: {

    },
    methods: {


    }
  }
</script>
<style scoped>
  .site-navbar {
    position: absolute;
    /*display: block;*/
    margin-top: 35px;
    right: 0;
    left: 0;
    z-index: 1000;
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
    background-color:#F57215;
  }

  .site-navbar__menu--right{
    float: left;
    top: 0px;
    margin-left: 30vh;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .site-navbar__menu--right .el-menu-item{
    width: 100px;
    margin-left: 20px;
  }
  .site-navbar__body{
    position: absolute;
    /*margin-left: 230px;*/
    margin-right: 0;
    padding-right: 15px;
    top: 0px;
    height: 60px;
    background-color:#F57215;
  }

</style>

