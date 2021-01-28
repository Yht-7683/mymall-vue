<template>
  <nav class="navbar">
    <div>
      <h2 class="navbar__brand">
        欢迎你，{{userName}}
      </h2>
      <div class="navbar__menu--right">
        <a @click="navTo('/home')">
          商城
        </a>
        <a @click="navTo('/order')">
          我的订单
        </a>
        <a @click="navTo('/cart')">
          我的购物车
        </a>
        <el-dropdown :show-timeout="0" placement="bottom">
        <a>
          个人信息
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="updateHandle()">修改个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="passwordHandle()">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logoutHandle()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <NavbarUpdate v-if="updateVisible" ref="NavbarUpdate"></NavbarUpdate>
    <navbar-password v-if="passwordVisible" ref="NavbarPassword"></navbar-password>
  </nav>
</template>

<script>
  import NavbarUpdate from './navbar-update'
  import NavbarPassword from './navbar-password'
  import VueCookies from 'vue-cookies'
  export default {
    data () {
      return {
        username: '',
        updateVisible:false,
        passwordVisible: false
      }
    },
    components:{
      NavbarUpdate,
      NavbarPassword
    },
    computed: {
      userName: {
        get () { return this.$store.state.user.username  }
      }
    },
    methods: {
      navTo(route){
        this.$router.push(route)
      },
      updateHandle(){
        this.updateVisible = true
        this.$nextTick(() => {
          this.$refs.NavbarUpdate.init()
        })
      },
      passwordHandle(){
        this.passwordVisible = true
        this.$nextTick(() => {
          this.$refs.NavbarPassword.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/user/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              VueCookies.remove('token')
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style>
  .navbar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .08);
  }

  .navbar__menu--right{
    position: absolute;
    right: 0;
    top: 3px;
    margin-right: 20px;
  }
  .navbar__menu--right a {
    margin-right: 8px;
    font-size: 10px;
    color: #a0a0a0;
  }
  .navbar__brand {
    display: table-cell;
    vertical-align: middle;
    width: 100px;
    height: 30px;
    margin: 3px;
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    color: #a0a0a0;
  }
</style>

