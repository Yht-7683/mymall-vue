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
      <el-form-item label="选择数量" prop="amount">
      <el-input-number v-model="dataForm.amount" :step="1" step-strictly :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="总价">
        <span>{{'￥'+totalAmount}}</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" plain @click="visible = false">立即购买</el-button>
      <el-button type="success" plain @click="visible = false">加入购物车</el-button>
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
          goodsId:'1',
          name:'测试',
          img:'',
          details:'测',
          price:1231,
          amount:1,
        },
        totalPrice: 0,
      }
    },
    computed:{
      totalAmount(){
        this.totalPrice = this.dataForm.amount*this.dataForm.price
        return this.totalPrice;
      }
    },
    methods: {
      init (id,price) {
        this.visible = true
      }
    }
  }
</script>
