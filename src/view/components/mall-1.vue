<template>
  <div class="mod-home" v-loading="dataListLoading">
      <el-card class="goods"
      v-for="(item,index) in dataList"
      :key="index">
        <el-image :src="item.img" style="max-width:200px;max-height:200px"></el-image>
      <div style="padding: 14px;">
        <span>{{item.name}}</span>
        <span>{{'¥'+item.price}}</span>
        <div>
          <el-button type="text" class="button" @click="buy(item.goodsId)">了解详情</el-button>
        </div>
      </div>
      </el-card>
    <goods-product v-if="isVisible" ref="GoodsProduct"></goods-product>
  </div>
</template>

<script>
  import GoodsProduct from './goods-product'
  export default {
    data() {
      return{
        dataList:[],
        isVisible: false,
        dataListLoading:false
      }
    },
    components: {
      GoodsProduct
    },
    created(){
      this.getDataList();
    },
    methods:{
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/mall/goods/select'),
          method: 'get',
          params: this.$http.adornParams({
            'classificationName': "家电"
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.list
          } else {
            this.dataList = []
          }
          this.dataListLoading = false
        })
      },
      buy(id){
        this.isVisible = true
        this.$nextTick(() => {
          this.$refs.GoodsProduct.init(id)
        })
      }
    }
  }
</script>

<style>
  .mod-home {
    /*line-height: 1.5;*/
    /*background-color: black;*/
  }
  .goods{
    display: inline-block;
    margin: 20px;
    overflow: hidden;
    width: 300px;
    height: 300px;
    float: left;
  }

</style>

