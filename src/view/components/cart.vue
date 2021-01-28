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
          <el-input-number v-model="scope.row.amount" @change="handleChange" :min="1"></el-input-number>
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
          <el-button type="danger" size="mini" @click="updateHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="cartFooter">
      <span>应付金额：</span>
      <span class="total">{{'￥'+totalAmount}}</span>
      <el-button type="success" size="small" style="margin-left: 15px">下单</el-button>
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
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
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
        return amount;
      }
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataList = [{
          id:12,
          img: 'http://121.41.91.101:2333/img/2.png',
          name: '买你马',
          price: 12312,
          amount: 3,
        },
          {
            id:13,
            img: 'http://121.41.91.101:2333/img/2.png',
            name: '买你马',
            price: 1212,
            amount: 2,
          }]
      },
      handleChange(value) {
        console.log(value);
      },

      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 查看详情
      updateHandle(id) {
        console.log(id)

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
