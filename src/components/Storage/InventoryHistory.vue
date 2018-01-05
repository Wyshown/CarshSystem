<script type="text/javascript">
  import Tables from './../../public/components/tables/Table.vue'
  import Paginaction from './../../public/components/paging/pagination.vue'
  import datepicker from 'vue-date-picker'
  import api from './../../api/index'
  export default {
    name: 'InventoryHistory',
    mounted () {
      this.titName = sessionStorage.getItem('flowName')
      this.headerList = [{name: '时间'}, {name: '一级类目'}, {name: '二级类目'}, {name: '产品名称'}, {name: '变更'}, {name: '操作人'}]
      this._goodsInventoryLogsList()
    },
    data () {
      return {
        msg: '123',
        headerList: [],              /* table的头部 */
        bodyList: [],                /* table的body部分 */
        total: 0,                    /* 请求数据的总数 */
        display: 5,                  /* 分页每一页显示的条数 */
        current: 1,                  /* 当前的页码 */
        startTime: '',               /* 查询开始的时间 */
        endTime: '',                 /* 查询结束的时间 */
        titName: '',                 /* 库存流水的标题 */
        isLoading: false,            /* 是否加载 */
        objType: '',                 /* 变更类型字符串 */
        objTypeArr: []               /* 变更类型数组 */
      }
    },
    methods: {
      onStartChange (val) {
        this.startTime = val
      },
      onEndChange (val) {
        this.endTime = val
      },
      /**
       * 库存流水列表变更详情
       * @method _arrReturnString
       *
       * @param dic 表示此项目
       *
       */
      _arrReturnString (dic) {
        console.log('变更类型===', dic.obj)
        let titHead = ''
        let titChange = ''
        let title1 = ''
        let title2 = ''
        if (dic.inventoryBefore === null && dic.inventoryEnd === null) {
          titChange = ''
          title2 = ''
        } else if (Number(dic.inventoryEnd) > Number(dic.inventoryBefore)) {
          titChange = '+' + (Number(dic.inventoryEnd) - Number(dic.inventoryBefore))
          title2 = '<p style="text-align: center">' + '(' + Number(dic.inventoryBefore) + '->' + Number(dic.inventoryEnd) + ')' + '</p>'
        } else if (Number(dic.inventoryEnd) < Number(dic.inventoryBefore)) {
          titChange = '-' + (Number(dic.inventoryEnd) - Number(dic.inventoryBefore))
          title2 = '<p style="text-align: center">' + '(' + Number(dic.inventoryBefore) + '->' + Number(dic.inventoryEnd) + ')' + '</p>'
        } else {
          titChange = Number(dic.inventoryEnd) - Number(dic.inventoryBefore)
          title2 = '<p style="text-align: center">' + '(' + Number(dic.inventoryBefore) + '->' + Number(dic.inventoryEnd) + ')' + '</p>'
        }
        if (Number(dic.obj) === 1) {
          titHead = '商品正常购买'
        } else if (Number(dic.obj) === 2) {
          titHead = '内部领用'
        } else if (Number(dic.obj) === 3) {
          titHead = '采购入库'
        } else if (Number(dic.obj) === 4) {
          titHead = '采购退货'
        } else if (Number(dic.obj) === 5) {
          titHead = '库存盘亏'
        } else if (Number(dic.obj) === 6) {
          titHead = '库存盘盈'
        } else if (Number(dic.obj) === 7) {
          titHead = '盘点正常'
        } else {
          titHead = ''
        }

        title1 = '<p style="text-align: center">' + titHead + titChange + '</p>'

        return title1 + title2
      },
      /**
       * 获取库存流水列表
       * @method _goodsInventoryLogsList
       *
       * 进入页面的时候会请求数据和点击搜索,展示库存流水列表
       *
       */
      _goodsInventoryLogsList () {
        let that = this
        console.log('111', that.objType)
        that.objTypeArr = []
        if (that.objType === '' || that.objType === undefined) {
          that.objTypeArr = [ 2, 5, 6, 7 ]
        } else {
          that.objTypeArr.push(that.objType)
        }
        that.isLoading = true
        that.bodyList = []
        let url = 'inventory/goodsInventoryLogsList'
        console.log(';that.objType===', that.objType)
        let _params = {
          'begintime': that.startTime,
          'endtime': that.endTime,
          'goodsId': that.$route.params.historyId,
          'obj': that.objTypeArr,
          'page': that.current,
          'pagenum': that.display
        }
        console.log('库存_params===', _params)

        api.request('post', url, _params)
          .then(response => {
            console.log('库存流水response==', response.data)
            that.isLoading = false
            that.startTime = ''
            that.endTime = ''
            that.objType = ''
            if (Number(response.data.code) === 0) {
              that.total = parseInt(response.data.data.count)
              let info = response.data.data.inventoryLogInfo
              console.log('info==', info)
              // 检测info如果obj的状态为1,3,4都不显示
              for (var i = 0; i < info.length; i++) {
                let subList = {}
                subList.name = info[i].createTime
                subList.cate = info[i].serviceName
                subList.tdata3 = info[i].serviceName2
                subList.tdata4 = info[i].goodsName
                subList.tdata5 = {str: that._arrReturnString(info[i]), isHtml: true}
                subList.tdata6 = info[i].adminNick
                that.bodyList.push(subList)
              }
            } else if (Number(response.data.code) === 401) {
              that.$router.push('login')
            } else {
              that.total = 0
              that.bodyList = []
            }
          }).catch(error => {
            that.isLoading = false
            console.log(error)
          })
      }
    },
    watch: {
      current: function (newval, oldval) {
        if (newval !== oldval) {
          this.current = newval
          if (!this.isLoading) {
            this._goodsInventoryLogsList()
          }
        }
      },
      display: function (newval, oldval) {
        if (newval !== oldval) {
          this.display = newval
          if (!this.isLoading) {
            this._goodsInventoryLogsList()
          }
        }
      }
    },
    components: {
      Tables,
      Paginaction,
      datepicker
    }
  }
</script>

<template>
  <div class="main-container">
    <h5 class="title-h4"><p>盘点历史--{{titName}}</p></h5>
    <div class="row form-horizontal">
      <div class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-3">
        <label for="startTime" class="col-xs-0 col-sm-0 col-md-4 col-lg-4 control-label rmpaddingR">开始时间</label>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <datepicker id="startTime" :value="startTime" @on-change="onStartChange" :readonly="true" width="100%"></datepicker>
        </div>
      </div>
      <div class="form-group col-xs-12  col-sm-12 col-md-4 col-lg-3">
        <label for="endTime" class="col-xs-0 col-sm-0 col-md-4 col-lg-4 control-label rmpaddingR">结束时间</label>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <datepicker id="endTime" :value="endTime" @on-change="onEndChange" :readonly="true" width="100%"></datepicker>
        </div>
      </div>
      <div class="form-group col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <label for="objType" class="col-xs-0 col-sm-0 col-md-4 col-lg-4 control-label rmpaddingR text-center">变更类型</label>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <select class="form-control" v-model="objType" style="padding: 0 0; margin: 0 0">
            <option :value="2">领用</option>
            <option :value="5">盘亏</option>
            <option :value="6">盘盈</option>
            <option :value="7">盘点正常</option>
          </select>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-sm-12 col-md-2 col-lg-3">
        <div>
          <button type="button" class="btn btn-primary check" v-on:click="_goodsInventoryLogsList()">查询</button>
        </div>
      </div>
    </div>

    <Tables :bodyList="bodyList" :headerList="headerList" />
    <Paginaction :total="total" :display="display" :current="current"/>

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
    margin: 15px 0;
  }
  .title-h4 p{
    border-left: 2px solid #2194fe;
    padding-left: 8px;
    margin-bottom: 10px;
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
