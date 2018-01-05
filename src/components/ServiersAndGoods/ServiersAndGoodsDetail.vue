<template>
  <div class="main-container">
    <div class="bs-callout">
      <div class="bs-callout-primary"></div>
      <div class="bs-callout-title">详细信息</div>
    </div>
    <div class="detail-box">
      <div class="item-box">
        <div class="item-box-title">一级项目</div>
        <div class="item-box-content">{{dataObj.p_type_name}}</div>
      </div>
      <div class="item-box">
        <div class="item-box-title">二级项目</div>
        <div class="item-box-content">{{dataObj.serviceName}}</div>
      </div>
      <div class="item-box">
        <div class="item-box-title">商品名称</div>
        <div class="item-box-content">{{dataObj.goods_name}}</div>
      </div>


      <div v-if="$route.params.type == 'goods'">
        <div class="item-box">
          <div class="item-box-title">标题描述</div>
          <div class="item-box-content">{{dataObj.goods_des}}</div>
        </div>
        <div v-if="inventory.length>0" class="item-box">
          <div class="item-box-title">库存数量</div>
          <div class="item-box-content">{{inventory}}</div>
        </div>
        <div v-if="money.length>0" class="item-box">
          <div class="item-box-title">进货价格</div>
          <div class="item-box-content">{{inventory}}</div>
        </div>
      </div>


      <div v-if="dataObj.goods_price_type == '1'" class="item-box">
        <div class="item-box-title">服务标价</div>
        <div class="item-box-content">{{dataObj.goods_price}}</div>
      </div>
      <div v-if="dataObj.combination == '1'" class="item-box">
        <div class="item-box-title">服务套餐</div>
        <div class="item-box-content">
          <div v-for="a in dataObj.goods_combination">{{a.serviceName}}&nbsp;&nbsp;&nbsp;&nbsp;{{a.goodsName}}&nbsp;&nbsp;x&nbsp;&nbsp;{{a.number}}&nbsp;&nbsp;{{a.money}}</div>
        </div>
      </div>
      <div class="item-box">
        <div class="item-box-title">返积分比例</div>
        <div class="item-box-content">
          <div v-for="a in dataObj.integral_ratio">{{a.cardName}}&nbsp;&nbsp;{{parseInt(parseFloat(a.proportion)*100)}}%</div>
        </div>
      </div>
      <div class="item-box">
        <div class="item-box-title">适用车型</div>
        <div class="item-box-content">{{dataObj.suitable_models}}</div>
      </div>
      <div class="item-box">
        <div class="item-box-title">预约信息</div>
        <div class="item-box-content">{{dataObj.appointment_info}}</div>
      </div>
      <div class="item-box">
        <div class="item-box-title">商品项目介绍</div>
        <div class="item-box-content">{{dataObj.goods_info}}</div>
      </div>
      <div class="img-item">
        <div v-for="a in dataObj.imgArr" class="detail-img-box">
          <img :src="a.image_url" >
        </div>
      </div>
    </div>
    <div class="placeHold"></div>
  </div>
</template>
<style>
  .img-item{
    flex-direction: row;
    display: flex;
    margin-top: 10px;
  }
  .img-item .detail-img-box{
    width: 100px;
    margin-left: 10px;
  }
  .img-item .detail-img-box img{
    width: 100%;
  }
  .placeHold{
    width: 100%;
    height:30px;
  }
  .item-box-title {
    width: 40%;
  }
  .item-box-content{
    width: 40%;
    text-align: right;
  }
  .item-box-content div{
    text-align: right;
    margin-top: 5px;
  }
  .item-box{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;
    border-bottom-color: #ebebeb;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
  .detail-box{
    width: 80%;
    background-color: white;
    padding: 30px;
    background-color: #f7f7f7;
    /*box-shadow: 5px 5px 5px #888888;*/
    margin-top: 10px;
    margin-left: 10%;
  }
</style>
<script type="text/ecmascript-6">
  import Tables from './../../public/components/tables/Table.vue'
  import Paginaction from './../../public/components/paging/pagination.vue'
  import api from './../../api/index'
  export default {
    mounted () {
//      alert(this.$route.params.type)
//      alert(this.$route.params.id)
      this.loadData()
    },
    data () {
      return {
        dataObj: '',
        inventory: '',
        money: ''
      }
    },
    methods: {
      loadData () {
        api.request('post', 'goods/goodsDetail', {'goods_id': this.$route.params.id})
          .then(response => {
            console.log(response)
            this.dataObj = response.data.data
            if (this.$route.params.type === 'goods') {
              this.loadNumber(response.data.data.id)
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      loadNumber (id) {
        api.request('post', 'goods/checkInventory', {'goods_id': id})
          .then(response => {
            console.log(response)
            this.inventory = response.data.data.inventory
            this.money = response.data.data.money
          }).catch(error => {
            console.log('error', error)
          })
      }
    },
    components: {
      Tables,
      Paginaction
    },
    watch: {
    }
  }
</script>
