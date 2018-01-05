<template>
  <div class="main-container">
    <div class="text-center"><h3>易橙汇汽车服务中心-结算单</h3></div>
    <table aria-describedby="example1_info" role="grid" class="text-center table table-bordered table-striped dataTable">
      <thead>
        <tr>
          <td class="col-md-1">车牌</td>
          <td class="col-md-3">{{carNumber}}</td>
          <td class="col-md-1">车型</td>
          <td class="col-md-3">{{carModalName}}</td>
          <td class="col-md-1">单号</td>
          <td class="col-md-3">{{orderNumber}}</td>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td class="col-md-1 ">姓名</td>
          <td class="col-md-3">{{userName === null?'购车惠会员':userName}}</td>
          <td class="col-md-1">电话</td>
          <td class="col-md-3">{{userPhone}}</td>
          <td class="col-md-1">时间</td>
          <td class="col-md-3">{{orderTime}}</td>
        </tr>
      </tbody>
    </table>
    <table v-if="serviceArr.length>0" aria-describedby="example1_info" role="grid"  class="text-center table table-bordered table-striped dataTable">
      <thead>
        <tr>
          <td class="col-md-4">销售商品</td>
          <td class="col-md-2">数量</td>
          <td class="col-md-2">单价</td>
          <td class="col-md-4">赠送积分</td>
        </tr>
      </thead>
      <tbody>
      <tr v-for="a in serviceArr">
          <td class="col-md-4">{{a.goodsName}}</td>
          <td class="col-md-2">{{a.goodsQuantity}}</td>
          <td class="col-md-2">{{a.goodsMoney}}</td>
          <td class="col-md-4">{{a.goodsScore}}</td>
        </tr>
      </tbody>
    </table>
    <table aria-describedby="example1_info" role="grid" class="text-center table table-bordered table-striped dataTable">
      <thead>
        <tr>
          <td class="col-md-4">支付方式</td>
          <td class="col-md-8">金额</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-md-4">{{orderPayType}}</td>
          <td class="col-md-8">{{orderMoney}}</td>
        </tr>
      </tbody>
    </table>
    <div class="table table-bordered table-striped dataTable certificate-footer">
      <div class="sign">客户验收及签署：</div>
      <div class="sign">结算员签名：</div>
      <div class="adress">
        <div>HANWUQIA0370</div>
        <div>电话：400-138-0808</div>
        <div>地址：秦淮区大明路九龙新村505号</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from './../../api/index'
  export default {
    mounted () {
      this.loadData()
    },
    data () {
      return {
        carNumber: '...',
        carModalName: '...',
        orderNumber: '...',
        userName: '...',
        userPhone: '...',
        orderTime: '...',
        orderMoney: '...',
        orderPayType: '...',
        serviceArr: []
      }
    },
    methods: {
      loadData () {
        let _params = {payId: this.$route.params.id}
        api.request('post', 'order/orderDetails', _params)
          .then(response => {
            if (response.data.code === 0) {
              let dic = response.data.data[0]
              this.carNumber = dic.carNumber
              this.carModalName = dic.brandName + dic.carModelName
              this.orderNumber = dic.outTradeNo
              this.userName = dic.userNick
              this.userPhone = dic.userName
              this.orderTime = dic.orderCreateTime
              this.orderPayType = this._orderPayType(dic.orderPayType)
              this.orderMoney = dic.orderMoney
              this.serviceArr = dic.goodsInfo
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      _orderPayType (str) {
        if (Number(str) === 1) {
          return '微信'
        } else if (Number(str) === 2) {
          return '支付宝'
        } else if (Number(str) === 3) {
          return '余额'
        } else if (Number(str) === 4) {
          return '积分'
        } else if (Number(str) === 5) {
          return '商家微信'
        } else if (Number(str) === 6) {
          return '商家支付宝'
        } else if (Number(str) === 7) {
          return '现金;'
        } else if (Number(str) === 8) {
          return '其他支付'
        }
        return '未知'
      }
    }

  }
</script>

<style>
.certificate-footer{
  height: 200px;
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 15px;
  position: relative;
  padding: 10px;
}
  .sign{
    width: 50%;
  }
  .adress{
    position: absolute;
    bottom: 10px;
    right: 10px;
    text-align: right;
  }
</style>
