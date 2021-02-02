<template>
  <el-dialog
    title="商品详情"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm"  label-width="80px">
      <el-form-item label="商品名" prop="name">
        <span>{{dataForm.name}}</span>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <el-image
          style="width: 80px; height: 80px"
          :src="dataForm.img"
          :preview-src-list="[dataForm.img]">
        </el-image>
      </el-form-item>
      <el-form-item label="详细说明" prop="details">
        <span>{{dataForm.details}}</span>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <span>{{'￥'+dataForm.price}}</span>
      </el-form-item>
      <el-form-item label="库存量" prop="price">
        <span>{{dataForm.amount}}</span>
      </el-form-item>
      <el-form-item label="选择数量" prop="amount">
      <el-input-number v-model="dataForm.realAmount" :step="1" step-strictly :min="1" :max="dataForm.amount"></el-input-number>
      </el-form-item>
      <el-form-item label="总价">
        <span>{{'￥'+totalAmount}}</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" plain @click="buy()">立即购买</el-button>
      <el-button type="success" plain @click="saveCart()">加入购物车</el-button>
      <el-button type="danger" plain @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm:{
          goodsId:'',
          skuId:'',
          name:'',
          img:'',
          details:'',
          price:'',
          amount:0,
          realAmount:''
        },
        totalPrice: 0,
      }
    },
    computed:{
      totalAmount(){
        this.totalPrice = this.dataForm.realAmount*this.dataForm.price
        return this.totalPrice;
      }
    },
    methods: {
      init (id) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm.realAmount = 1
        })
        this.$http({
          url: this.$http.adornUrl(`/mall/goods/detail`),
          method: 'get',
          params: this.$http.adornParams({
            'goodsId': id
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.goodsId = data.map.goodsId,
              this.dataForm.skuId = data.map.skuId,
            this.dataForm.name = data.map.name,
            this.dataForm.price = data.map.price,
              this.dataForm.amount = data.map.amount,
              this.dataForm.img = data.map.img,
              this.dataForm.details = data.map.details
          }
        }).then(() => {
          this.visible = true
        })
      },
      saveCart(){
        this.$http({
          url: this.$http.adornUrl(`/mall/cart/save`),
          method: 'post',
          data: this.$http.adornData({
            'skuId': this.dataForm.skuId,
            'amount': this.dataForm.realAmount,
          })
        }).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$nextTick(() => {
                this.$refs['dataForm'].resetFields()
              })
            }
          })
        })

      },
      buy(){
        var orderProduct = {
          'skuId': this.dataForm.skuId,
          'goodsName': this.dataForm.name,
          'goodsAmount': this.dataForm.realAmount,
          'goodsPrice': this.dataForm.price
        }
        this.$confirm(`进行购买，请支付${this.totalAmount}+20元运费`, '提示', {
          confirmButtonText: '立即支付',
          cancelButtonText: '再等等',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/mall/order/buy'),
            method: 'post',
            data: this.$http.adornData({
              'pay': 1,
              'totalPrice':this.totalAmount,
              'freight': 20,
              'status': 1,
              'orderProduct': orderProduct
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '购买成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                  })
                    this.$router.push({path:'/order'})
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
