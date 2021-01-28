<template>
  <div class="navbar">
    <mall-navbar></mall-navbar>
  <div class="component">
  <keep-alive>
  <router-view></router-view>
  </keep-alive>
  </div>
  </div>
</template>

<script>
   import MallNavbar from './mall-navbar'
    export default {
      components: {
        MallNavbar,
      }
    }
</script>

<style scoped>
.component{
  position: absolute;
  margin-left: 120px;
  margin-top: 120px;
}
</style>
