<template>
  <el-dialog
    title="修改个人信息"
    :visible.sync="visible"
    :modal-append-to-body="false"
    :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="dataForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="success" plain @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          username:'',
          mobile:''
        },
        dataRule: {
        }
      }
    },
    computed: {
    },
    methods: {
      // 初始化
      init () {
        this.$http({
          url: this.$http.adornUrl(`/mall/user/info`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.dataForm.username = data.user.username
            this.dataForm.mobile = data.user.mobile
          }
        }).then(() => {
          this.visible = true
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/mall/user/update`),
              method: 'post',
              data: this.$http.adornData({
                'userId':  this.$store.state.user.id,
                'username': this.dataForm.username,
                'mobile': this.dataForm.mobile
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$refs['dataForm'].resetFields()
                  }
                })
              } else {
                this.$message.error(data.msg)
                this.$refs['dataForm'].resetFields()
              }
            })
          }
        })
        this.visible = false
      }
    }
  }
</script>

