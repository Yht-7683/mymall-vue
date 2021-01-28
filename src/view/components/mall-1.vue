<template>
  <div class="mod-home">
      <el-card class="goods"
      v-for="(item,index) in dataList"
      :key="index">
      <img :src="item.image" class="image">
      <div style="padding: 14px;">
        <span>{{item.name}}</span>
        <span>{{'¥'+item.price}}</span>
        <div>
          <el-button type="text" class="button" @click="buy(index)">了解详情</el-button>
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
        isVisible: false
      }
    },
    components: {
      GoodsProduct
    },
    created(){
      {
        this.dataList=[{
          image:'http://121.41.91.101:2333/img/2.png',
          price:1234,
          name: '买你马'
        },{
          image:'http://121.41.91.101:2333/img/2.png',
          price:1234,
          name: '买你马'
        },
          {
            image:'http://121.41.91.101:2333/img/2.png',
            price:1234,
            name: '买你马'
          },
          {
            image:'http://121.41.91.101:2333/img/2.png',
            price:1234,
            name: '买你马'
          },
          {
            image:'http://121.41.91.101:2333/img/2.png',
            price:1234,
            name: '买你马'
          }

        ]
      }
    },
    methods:{
      buy(id){
        this.isVisible = true
        console.log(id)
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
    height: auto;
    float: left;
  }

</style>

