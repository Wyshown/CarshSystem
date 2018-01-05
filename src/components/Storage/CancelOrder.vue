<script type="text/javascript">
  import Tables from './../../public/components/tables/Table.vue'
  import Notification from './../../public/components/propup/toast/Notification.vue'
  import Vodal from 'vodal'
  import datepicker from 'vue-date-picker'
  import api from './../../api/index'
  export default {
    name: 'OrderDetails',
    mounted () {
      this.headerList = [{name: '序号'}, {name: '一级类目'}, {name: '二级类目'}, {name: '选择产品'}, {name: '进货价格'}, {name: '入库数量'}, {name: '入库总价'}, {name: '可退数量'}, {name: '退货数量'}, {name: '退货价格'}, {name: '退货总价'}, {name: '操作'}]
      this._goodsInventoryPayDetails()
    },
    data () {
      return {
        msg: '123',
        headerList: [],              /* table的头部 */
        bodyList: [],                /* table的body部分 */
        startTime: '',               /* 查询开始的时间 */
        endTime: '',                 /* 查询结束的时间 */
        supplierName: '',            /* 供应商名字 */
        payStatus: '',               /* 支付状态 */
        payStatusTxt: '',            /* 支付状态文字 */
        editTit: '',                 /* 编辑退货数量弹框的头部 */
        editGoods: '',
        editNum: '',                 /* 编辑退货数量 */
        editPrice: '',               /* 编辑退货价格 */
        editTotal: '',               /* 编辑退货总价 */
        editIdx: '',                 /* 编辑退货商品的索引 */
        editServiceId: '',
        editGoodsId: '',
        editInventory: '',           /* 编辑退货商品的库存 */
        beforePrice: '',             /* 入库时的价格 */
        inventoryGoodsId: [],
        showNotification: false,
        editShow: false,             /* 编辑退货数量弹框 */
        options: {},
        btns: [
          {
            content: 'success',
            options: {
              autoClose: true,
              content: ''
            }
          },
          {
            content: 'error',
            options: {
              autoClose: true,
              backgroundColor: '#fc5050',
              content: ''
            }
          }
        ],
        animation: '',
        types: ['zoom']
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
       * 编辑退货数量
       * @method _changeNum
       *
       */
      _changeNum (editObj) {
        console.log('编辑退货数量', editObj)
        let that = this
        that.editTit = '编辑' + editObj.str[0].goodsName + '的退货信息'
        that.editIdx = editObj.str[0].idx
        that.editServiceId = editObj.str[0].serviceId
        that.editGoodsId = editObj.str[0].goodsId
        that.editInventory = editObj.str[0].number
        that.beforePrice = editObj.str[0].beforePrice
        console.log('that.editTit是===', that.editTit)
        that.editShow = true
        console.log('that.bodyList是===', that.bodyList)
      },
      _btnNum (num) {
        let that = this
        that.$validator.validateAll(num).then(() => {
          console.log('editNum===', that.editNum)
          console.log('现在编辑的价格that.editPrice===', that.editPrice)
          console.log('之前的库存价格that.beforePrice==', that.beforePrice)
          that.editTotal = that.editNum * that.editPrice
          if (parseInt(that.editNum) > parseInt(that.editInventory)) {
            that.showNotification = true
            that.btns[1].options.content = '退货数量不能大于可退数量'
            that.options = that.btns[1].options
          } else if (parseInt(that.editPrice) > parseInt(that.beforePrice)) {
            that.showNotification = true
            that.btns[1].options.content = '退货价格不能大于入库价格'
            that.options = that.btns[1].options
          } else {
            that.bodyList[that.editIdx].tdata9 = that.editNum
            that.bodyList[that.editIdx].tdata10 = that.editPrice
            that.bodyList[that.editIdx].tdata11 = that.editTotal
            that.editShow = false
            that.editNum = ''
            that.editPrice = ''
          }
        }).catch(() => {
          that.showNotification = true
          that.btns[1].options.content = '请检验输入是否正确'
          that.options = that.btns[1].options
        })
      },
      /**
       * 编辑好退货数量之后提交给后台
       * @method _finalSubmit
       *
       */
      _finalSubmit () {
        let that = this
        let url = 'inventory/goodsInventoryLogAdd'
        console.log('that.bodyList是===', that.bodyList)
        let countNum = that.bodyList.length
        console.log('初始的countNum===', countNum)
        for (var i = 0; i < that.bodyList.length; i++) {
          if (Number(that.bodyList[i].tdata9) > 0) {
            console.log(i)
            console.log('that.bodyList[i]===', that.bodyList[i])
            let _params = {
              'serviceId': that.bodyList[i].tdata12.str[0].serviceId2,
              'goodsId': that.bodyList[i].tdata12.str[0].goodsId,
              'number': that.bodyList[i].tdata9,
              'money': that.bodyList[i].tdata10,
              'totalMoney': that.bodyList[i].tdata11,
              'obj': 4
            }
            console.log('库存_params===', _params)
            api.request('post', url, _params)
              .then(response => {
                console.log('库存response==', response.data)
                if (Number(response.data.code) === 0) {
                  that.inventoryGoodsId.push(response.data.data)
                  if (countNum === 0 && that.inventoryGoodsId.length > 0) {
                    console.log('我成功返回了:')
                    let finalUrl = 'inventory/goodsInventoryPayAdd'
                    let _finalParams = {
                      'supplierId': that.supplierId,
                      'payObj': '2',
                      'status': that.payStatus,
                      'inventoryGoodsId': that.inventoryGoodsId,
                      'purchasePayId': that.$route.params.cancelOrderId
                    }

                    console.log('final提交的参数===', _finalParams)
                    console.log('inventoryGoodsId=', _finalParams.inventoryGoodsId)
                    console.log('inventoryGoodsId的长度===', _finalParams.inventoryGoodsId[0])
                    api.request('post', finalUrl, _finalParams)
                      .then(response => {
                        that.isLoading = false
                        if (Number(response.data.code) === 0) {
                          that.showNotification = true
                          that.btns[0].options.content = '操作成功'
                          that.options = that.btns[0].options
                        } else if (Number(response.data.code) === 401) {
                          that.$router.push('login')
                        } else {
                          that.showNotification = true
                          that.btns[1].options.content = '操作失败'
                          that.options = that.btns[1].options
                        }
                      }).catch(error => {
                        console.log(error)
                      })
                  }
                  console.log('that.inventoryGoodsId是==', that.inventoryGoodsId)
                } else if (Number(response.data.code) === 401) {
                  that.$router.push('login')
                } else {
                  that.showNotification = true
                  that.btns[1].options.content = '操作失败'
                  that.options = that.btns[1].options
                }
              }).catch(error => {
                that.isLoading = false
                console.log(error)
              })
          }
          countNum--
          console.log('现在的的countNum===', countNum)
        }
        console.log('if之前===')
        that.bodyList = []
        that._goodsInventoryPayDetails()
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
        that.isLoading = true
        that.bodyList = []
        let url = 'inventory/inventoryPayDetails'
        let _params = {
          'payId': that.$route.params.cancelOrderId
        }
        console.log('库存_params===', _params)

        api.request('post', url, _params)
          .then(response => {
            console.log('订单详情response==', response.data.data.inventoryPayInfo)
            if (Number(response.data.code) === 0) {
              that.supplierName = response.data.data.inventoryPayInfo[0].supplierName
              that.supplierId = response.data.data.inventoryPayInfo[0].supplierId
              that.payStatus = response.data.data.inventoryPayInfo[0].status

              if (that.payStatus === '1') {
                that.payStatusTxt = '挂账'
              } else {
                that.payStatusTxt = '已支付'
              }

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
                subList.tdata8 = info[k].inventory
                subList.tdata9 = ''
                subList.tdata10 = ''
                subList.tdata11 = ''
                let btn = [
                  {
                    id: info[k].id,
                    idx: k,
                    name: '编辑退货数量',
                    goodsName: info[k].goodsName,
                    goodsId: info[k].goodsId,
                    serviceName: info[k].serviceName,
                    serviceId: info[k].serviceId,
                    serviceId2: info[k].serviceId2,
                    number: info[k].inventory,
                    beforePrice: info[k].money,
                    class: 'btn-primary',
                    callback: this._changeNum
                  }
                ]
                subList.tdata12 = {str: btn, isBtn: true}
                that.bodyList.push(subList)
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
      datepicker,
      Vodal,
      Notification
    }
  }
</script>

<template>
  <div class="main-container">
    <h5 class="title-h4"><p>产品退货</p></h5>
    <div class="title-div"><p><i class="fa fa-hand-o-right"></i>&nbsp; 供应商</p></div>
    <div class="form-group">
      <p style="text-indent: 2em">{{supplierName}}</p>
    </div>
    <div class="title-div"><p><i class="fa fa-hand-o-right"></i>&nbsp; 退货列表</p></div>
    <Tables :bodyList="bodyList" :headerList="headerList" />
    <div class="title-div"><p><i class="fa fa-hand-o-right"></i>&nbsp; 退货支付状态</p></div>
    <div>
      <label class="radio-inline">
        <input type="radio" checked="checked"> {{payStatusTxt}}
      </label>
    </div>
    <div class="text-right" style="margin-top: 20px">
      <button class="btn btn-primary" @click="_finalSubmit">提交</button>
    </div>
    <!--产品退货-->
    <Vodal
      measure="em"
      animation="animation"
      :show="editShow"
      :width="35"
      :height="18"
      :duration="301"
      @hide="editShow = false"
    >
      <form class="form-horizontal" @submit.prevent="_btnNum('form-1')"  data-vv-scope="form-1">
        <div class="header">{{editTit}}</div>
        <div class="body">
          <div class="form-group" :class="{'has-error':errors.has('form-1.editNum')}">
            <div>
              <label for="editNum" class="col-sm-3 control-label">退货数量&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="editNum" name="editNum" placeholder="请输入退货数量" v-model="editNum" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.editNum')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入退货数量
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-1.editPrice')}">
            <div>
              <label for="editPrice" class="col-sm-3 control-label">退货价格&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="editPrice" name="editPrice" placeholder="请输入退货价格" v-model="editPrice" v-validate="{ rules: { required: true } }">

              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.editPrice')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入退货价格
                </label>
              </div>
            </div>
          </div>
          <!--<div class="form-group">-->
            <!--<div>-->
              <!--<label for="editTotal" class="col-sm-3 control-label">退货总价&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>-->
              <!--<div class="col-sm-9">-->
                <!--<input type="text" class="form-control" id="editTotal" name="editTotal" v-model="editTotal" disabled>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<div class="col-sm-3"></div>-->
              <!--<div class="col-sm-9 tip">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <button class="vodal-confirm-btn" type="submit">确定</button>
      </form>
      <button class="vodal-cancel-btn" @click="editShow = false">取消</button>
    </Vodal>
    <!--提示信息-->
    <notification
      :options.sync="options"
      :show.sync="showNotification">
    </notification>
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
  /* -- title -- */
  .header {
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9e9e9;
    text-align: center;
  }
  /* -- body -- */
  .body {
    padding-top: 15px;
  }
  /* -- button -- */
  .vodal-cancel-btn, .vodal-confirm-btn {
    position: absolute;
    font: inherit;
    bottom: 16px;
    width: 70px;
    padding: 4px 15px;
    border-radius: 3px;
    transition: background .2s;
    border: 1px solid #03a9f4;
  }
  .vodal-confirm-btn {
    color: #fff;
    right: 102px;
    background: #03a9f4;
  }
  .vodal-confirm-btn:hover {
    background: #0098e3;
  }
  .vodal-cancel-btn {
    color: #03a9f4;
    right: 16px;
    background: #fff;
  }
  .vodal-cancel-btn:hover {
    background: #fafafa;
  }
  .vodal-cancel-btn:focus, .vodal-confirm-btn:focus {
    outline: none;
  }
  .vodal-confirm-btn:active {
    background: #0087d2;
  }
  .vodal-cancel-btn:active {
    background: #fafafa;
    box-shadow: inset 1px 1px 1px rgba(0,0,0,.2),0 0 1px transparent;
  }
  .facolor {
    color: #c72e29;
    font-size: 5px;
  }
  .rmpaddingR{
    margin-right:0;
  }
</style>
