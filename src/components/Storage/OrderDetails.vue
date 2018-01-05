<script type="text/javascript">
  import Tables from './../../public/components/tables/Table.vue'
  import datepicker from 'vue-date-picker'
  import api from './../../api/index'
  export default {
    name: 'OrderDetails',
    mounted () {
      if (this.$route.params.form === 'Storage') {
        this.headerList = [{name: '序号'}, {name: '一级类目'}, {name: '二级类目'}, {name: '选择产品'}, {name: '进货价格'}, {name: '入库数量'}, {name: '入库总价'}]
      } else {
//        this.headerList = [{name: '序号'}, {name: '所属类目'}, {name: '选择产品'}, {name: '进货价格'}, {name: '入库数量'}, {name: '入库总价'}, {name: '退货数量'}, {name: '退货价格'}, {name: '退货总价'}]
        this.headerList = [{name: '序号'}, {name: '一级类目'}, {name: '二级类目'}, {name: '选择产品'}, {name: '退货数量'}, {name: '退货价格'}, {name: '退货总价'}]
      }
      this._goodsInventoryPayDetails()
    },
    data () {
      return {
        msg: '123',
        headerList: [],              /* table的头部 */
        bodyList: [],                /* table的body部分 */
        startTime: '',               /* 查询开始的时间 */
        endTime: '',                 /* 查询结束的时间 */
        pageTit: '',                 /* 页面的标题 */
        listTit: '',                 /* 页面列表标题 */
        payTit: '',                  /* 页面状态标题 */
        supplierName: '',            /* 供应商名字 */
        payStatus: ''                /* 支付状态 */
      }
    },
    methods: {
      onStartChange (val) {
        this.startTime = val
      },
      onEndChange (val) {
        this.endTime = val
      },
      loadData () {
        console.log(1)
      },
      /**
       * 获取入库订单详情或者是退货订单详情
       * @method _goodsInventoryPayDetails
       *
       * 进入页面的时候会请求数据和点击搜索,展示入库或者退货订单列表
       *
       */
      _goodsInventoryPayDetails () {
        let that = this
        if (that.$route.params.form === 'Storage') {
          that.pageTit = '入库订单'
          that.listTit = '采购列表'
          that.payTit = '支付状态'
        } else {
          that.pageTit = '退货订单'
          that.listTit = '退货列表'
          that.payTit = '退货支付状态'
        }
        that.isLoading = true
        that.bodyList = []
        let url = 'inventory/inventoryPayDetails'
        let _params = {
          'payId': that.$route.params.orderId
        }
        console.log('库存_params===', _params)

        api.request('post', url, _params)
          .then(response => {
            console.log('订单详情response==', response.data.data.inventoryPayInfo)
            if (Number(response.data.code) === 0) {
              that.supplierName = response.data.data.inventoryPayInfo[0].supplierName
              that.payStatus = response.data.data.inventoryPayInfo[0].status

              if (that.$route.params.form === 'Storage') {
                let info = response.data.data.inventoryPayInfo[0].goodsInfo
                for (var i = 0; i < info.length; i++) {
                  let subList = {}
                  subList.name = i + 1
                  subList.cate = info[i].serviceName
                  subList.tdata3 = info[i].serviceName2
                  subList.tdata4 = info[i].goodsName
                  subList.tdata5 = info[i].money
                  subList.tdata6 = info[i].number
                  subList.tdata7 = info[i].totalMoney
                  that.bodyList.push(subList)
                }
              } else {
                let info = response.data.data.inventoryPayInfo[0].goodsInfo
                for (var k = 0; k < info.length; k++) {
                  let subList = {}
                  subList.name = k + 1
                  subList.cate = info[k].serviceName
                  subList.tdata3 = info[k].serviceName2
                  subList.tdata4 = info[k].goodsName
                  subList.tdata5 = info[k].money
                  subList.tdata6 = info[k].number
                  subList.tdata7 = info[k].totalMoney
//                  if (that.$route.params.form === 'order') {
//                    subList.tdata8 = info[k].goodsInfo
//                    subList.tdata9 = info[k].totalMoney
//                    subList.tdata10 = info[k].adminNick
//                  }
                  that.bodyList.push(subList)
                }
              }
            } else if (Number(response.data.code) === 401) {
              that.$router.push('login')
            } else {
              that.bodyList = []
            }
          }).catch(error => {
            that.isLoading = false
            console.log(error)
          })
      }
    },
    components: {
      Tables,
      datepicker
    }
  }
</script>

<template>
  <div class="main-container">
    <h5 class="title-h4"><p>{{pageTit}}</p></h5>
    <div class="title-div"><p><i class="fa fa-hand-o-right"></i>&nbsp; 供应商</p></div>
    <div class="form-group">
      <p style="text-indent: 2em">{{supplierName}}</p>
    </div>
    <div class="title-div"><p><i class="fa fa-hand-o-right"></i>&nbsp; {{listTit}}</p></div>
    <Tables :bodyList="bodyList" :headerList="headerList" />
    <div class="title-div"><p><i class="fa fa-hand-o-right"></i>&nbsp; {{payTit}}</p></div>
    <div>
      <label class="radio-inline">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" v-model="payStatus"> 挂账
      </label>
      <label class="radio-inline">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" v-model="payStatus"> 已支付
      </label>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .main-container{
    padding:20px;
  }
  table{
    background-color: #FFF!important;
  }
  .title-h4{
    border-bottom: 1px solid #cccccc;
    position: relative;
    margin: 15px 0;
  }
  .title-h4 p{
    border-left: 2px solid #2194fe;
    padding-left: 8px;
    margin-bottom: 10px;
  }
  .zdy-span{
    position: absolute;
    top: 0;
    right: 0;
    color: #2194fe;
    cursor: pointer;
  }
  .title-div{
    position: relative;
    margin: 15px 0;
    border-bottom: 1px dashed #ccc;
  }
  .ser-sel{
    width: 160px;
    margin-right: 20px;
    background-color: #fff;
  }
  .ser-form label{
    margin-right: 10px;
  }
  .jifen-input-number {
    position: relative;
    float: left;
    width: 90px;
  }
  .jifen-card {
    float: left;
    width: 40px;
    line-height: 34px;
    text-align: center;
    font-size: 12px;
  }
  .jifen-del {
    height: auto;
    width: 30px;
    line-height: 32px;
    top: 0;
    left: 0;
    text-align: center;
    color: #97a8be;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    border: 1px solid #ccc;
    border-right: none;
  }
  .jifen-add {
    height: auto;
    width: 30px;
    line-height: 32px;
    top: 0;
    right: 0;
    text-align: center;
    color: #97a8be;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    border: 1px solid #ccc;
    border-left: none;
  }
  .jifen-input {
    /*padding: 0 30px;*/
    padding: 0 10px;
  }
  .is-disabled {
    color: #d1dbe5;
    cursor: not-allowed;
  }
</style>
