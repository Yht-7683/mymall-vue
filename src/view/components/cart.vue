<template>
  <div class="mod-cart">
    <h3>我的购物车</h3>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="img"
        header-align="center"
        align="center"
        width="100"
        label="商品图片">
        <template slot-scope="scope">
        <el-image
          style="width: 80px; height: 80px"
          :src="scope.row.img"
          :preview-src-list="[scope.row.img]">
        </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="单价">
        <template slot-scope="scope">
          <span>{{'￥'+ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="amount"
        header-align="center"
        align="center"
        label="数量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.amount"  :min="1"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        header-align="center"
        align="center"
        label="小计">
        <template slot-scope="scope">
        <span>{{scope.row.amount * scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteHandle(scope.row.cartId,scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="cartFooter">
      <span>应付金额：</span>
      <span class="total">{{'￥'+totalAmount}}</span>
      <el-button type="success" size="small" style="margin-left: 15px" @click="buy()">下单</el-button>
    </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
        },
        dataList: [],
        dataListLoading: false,
        updateVisible: false
      }
    },
    components: {
    },
    activated () {
      this.getDataList()
    },
    computed:{
      totalAmount(){
        let amount = 0;
        this.dataList.map((item,index)=>{
          amount+=item.amount*item.price;
        })
        return amount.toFixed(2);
      }
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/mall/cart/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.list
          } else {
            this.dataList = []
          }
          this.dataListLoading = false
        })
      },
      deleteHandle(cartId,name) {
        this.$confirm(`确定对商品:${name} 进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/mall/cart/delete'),
            method: 'post',
            data: this.$http.adornData(cartId,false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },

      // 下单
      buy() {
        var cartIds = this.dataList.map(item => {
          return item.cartId
        })
        this.$confirm(`进行购买，请支付${this.totalAmount}+20元运费`, '提示', {
          confirmButtonText: '立即支付',
          cancelButtonText: '再等等',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/mall/order/save'),
            method: 'post',
            data: this.$http.adornData({
              'pay': 1,
              'totalPrice':this.totalAmount,
              'freight': 20,
              'status': 1,
              'cartIds': cartIds,
              'orderProductList': this.dataList
            })
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: '购买成功',
                type: 'success',
                duration: 1500,
              })
              this.$router.replace({name: 'order'})
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
    }
  }
</script>
<style scoped>
.mod-cart{
  margin: 60px 40px 10px 40px;

}
.mod-cart h3{
    color: #a0a0a0;
  }
.cartFooter{
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #a0a0a0;
}
</style>
