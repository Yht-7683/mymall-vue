<template>
  <el-carousel indicator-position="outside" style="width: 1000px" height="550px">
    <el-carousel-item v-for="item in imgList" :key="item.name">
      <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    data(){
      return{
        imgList:[{
          name:'2',
          src: require("@/assets/img/2.jpg"),
        },
          {
            name:'3',
            src: require("@/assets/img/3.jpg"),
          },
          {
            name:'4',
            src: require("@/assets/img/4.jpg"),
          },
          {
            name:'5',
            src: require("@/assets/img/5.jpg"),
          }
        ]
      }
    }
  }
</script>

<style>
  .el-carousel__item img {
    /*color: #475669;*/
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    /*margin: 0;*/
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

