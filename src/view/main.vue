<template>
  <div class="navbar">
    <main-navbar></main-navbar>
  <div class="component">
  <keep-alive>
  <router-view></router-view>
  </keep-alive>
  </div>
  </div>
</template>

<script>
   import MainNavbar from './main-navbar'
    export default {
      components: {
        MainNavbar,
      },
      computed: {
        userId: {
          get () { return this.$store.state.user.id },
          set (val) { this.$store.commit('user/updateId', val) }
        },
        userName: {
          get () { return this.$store.state.user.name },
          set (val) { this.$store.commit('user/updateName', val) }
        }
      },
      created () {
        this.getUserInfo()
      },
      methods: {
        // 获取当前用户信息
        getUserInfo () {
          this.$http({
            url: this.$http.adornUrl('/mall/user/info'),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.userId = data.user.userId
              this.userName = data.user.username
            }
          })
        }
      }
    }
</script>
<style scoped>


</style>
