<template>
  <div class="main-container">
    <h5 class="title-h4"><span class="zdy-span" @click="add"><i class="fa fa-plus"></i>&nbsp; 新增</span><p>销售产品</p></h5>

    <div class="row padding-left-10 form-horizontal">
      <div class="form-group col-xs-12  col-sm-12 col-md-5 col-lg-5">
        <label  class="col-xs-0 col-sm-0 col-md-2 col-lg-2 control-label rmpaddingR padding-left-0 text-center">所属类目：</label>
        <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10" style="padding: 0;">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="margin-bottom: 10px">
            <select v-model="serviceSelected" class="form-control" @change="_selSer()">
              <option value="">请选择一级服务类目</option>
              <option :value="a.id" v-for="a in serviceArr">{{a.type_name}}</option>
            </select>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <select v-model="serviceSecSelected" class="form-control" @change="_selSecSer()">
              <option value="">请选择二级服务类目</option>
              <option :value="a.id" v-for="a in serviceSrcArr">{{a.type_name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group col-xs-12  col-sm-12 col-md-3 col-lg-3">
        <label  class="col-xs-0 col-sm-0 col-md-4 col-lg-4 control-label rmpaddingR padding-left-0 text-center">产品名称：</label>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <input v-model="goodsName" type="text" class="form-control" placeholder="请输入产品名称">
        </div>
      </div>
      <div class="form-group col-xs-12  col-sm-12 col-md-3 col-lg-3">
        <label class="col-xs-0 col-sm-0 col-md-4 col-lg-4 control-label rmpaddingR padding-left-0 text-center">销售状态：</label>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <select v-model="saleSelected" class="form-control">
            <option value="">请选择</option>
            <option :value="a.id" v-for="a in saleStateArr">{{a.type}}</option>
          </select>
        </div>
      </div>
      <div class="form-group col-xs-12  col-sm-12 col-md-1 col-lg-1">
        <button v-on:click="loadData()" type="button" class="btn btn-primary margin-0 ">查询</button>
      </div>
    </div>
    <Tables class="margin-top" :bodyList="bodyList" :headerList="headerList"  />
    <Paginaction :total="total" :display="display" :current="current"/>
  </div>
</template>
<style>
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
  .padding-left-0{
    padding-left: 0px;
  }
  .padding-left-10{
    padding-left: 10px;
  }
</style>
<script type="text/ecmascript-6">
  import Tables from './../../public/components/tables/Table.vue'
  import Paginaction from './../../public/components/paging/pagination.vue'
  import api from './../../api/index'
  export default {
    mounted () {
      this.headerList = [{name: '一级类目'}, {name: '二级类目'}, {name: '销售产品'}, {name: '销售状态'}, {name: '库存数量'}, {name: '进货价格'}, {name: '产品标价'}, {name: '银卡返积分比例'}, {name: '金卡返积分比例'}, {name: '铂金卡返积分比例'}, {name: '特惠卡返积分比例'}, {name: '操作'}]
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.loadServiceDate()
        vm.loadData()
      })
    },
    data () {
      return {
        goodsName: '',
        saleStateArr: [
          {
            'id': '1',
            'type': '在售中'
          },
          {
            'id': '2',
            'type': '待售中'
          }
        ],
        saleSelected: '',
        headerList: [],
        bodyList: [],
        total: 0,
        display: 10,
        current: 1,
        isLoading: false,
        level: '2',                  /* 类目等级 */
        serviceType: '2',            /* 销售商品 */
        serId: '',                   /* 最终的服务类目id */
        serviceSelected: '',         /* 商品所属一级服务类目ID */
        serviceSecSelected: '',      /* 商品所属二级服务类目ID */
        serviceArr: [],              /* 商品一级服务类目 */
        serviceSrcArr: []            /* 商品二级服务类目 */
      }
    },
    methods: {
      /**
       * 一级类目下的产品名称
       * @method _selSer
       *
       * @param
       *
       */
      _selSer () {
        let that = this
        console.log('serviceSelected===', that.serviceSelected)
        if (that.serviceSelected !== '') {
          that._getSecList()
          that.serId = that.serviceSelected
          console.log('一级类目下that.serviceId', that.serId)
        } else {
          that.serviceSrcArr = []
          that.serviceSecSelected = ''
        }
      },
      /**
       * 二级类目下的产品名称
       * @method _selSecSer
       *
       * @param
       *
       */
      _selSecSer () {
        let that = this
        console.log('serviceSecSelected===', that.serviceSecSelected)
        if (that.serviceSecSelected !== '') {
          that.serId = that.serviceSecSelected
          console.log('二级类目下that.serviceId', that.serId)
        }
      },
      /**
       * 获取汽车服务类目列表(二级类目)
       * @method _getSecList
       *
       * 点击一级类目之后
       *
       */
      _getSecList () {
        let that = this
        that.isLoading = true
        let url = 'index/getServiceList'
        let _params = {
          'serviceType': that.serviceType,
          'pid': that.serviceSelected,
          'level': that.level
        }

        console.log('二级类目的_params===', _params)
        api.request('post', url, _params)
          .then(response => {
            that.isLoading = false
            that.serviceSrcArr = response.data.data
          }).catch(error => {
            that.isLoading = true
            console.log(error)
          })
      },
      loadServiceDate () {
        api.request('post', 'index/getServiceList', {'serviceType': '2'})
          .then(response => {
            if (Number(response.data.code === 0)) {
              this.serviceArr = response.data.data
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      loadData () {
        let _params = {
          serviceID: this.serId,
          goodsName: this.goodsName,
          goodsType: this.saleSelected,
          goodsPriceType: '',
          pagenum: this.display,
          page: this.current,
          serviceType: '2'
        }
        this.isLoading = true
        api.request('post', 'index/getGoodsList', _params)
          .then(response => {
            this.isLoading = false
            let arr = []
            this.total = Number(response.data.data.count)
            for (let index in response.data.data.info) {
              let dic = response.data.data.info[index]
              let item = {name: dic.p_type_name, cate: dic.type_name, tdata3: dic.goods_name, tdata4: this.returnSaleState(dic.goods_type), tdata5: dic.inventory, tdata6: dic.money, tdata9: dic.goods_price, tdata10: dic.integral_ratio.length > 0 ? parseInt(parseFloat(dic.integral_ratio[0].proportion) * 100) + '%' : '暂无', tdata11: dic.integral_ratio.length > 1 ? parseInt(parseFloat(dic.integral_ratio[1].proportion) * 100) + '%' : '暂无', tdata12: dic.integral_ratio.length > 2 ? parseInt(parseFloat(dic.integral_ratio[2].proportion) * 100) + '%' : '暂无', tdata13: dic.integral_ratio.length > 3 ? parseInt(parseFloat(dic.integral_ratio[3].proportion) * 100) + '%' : '暂无'}
              item = {...item, 'tdata14': {str: this.returnBtnArr(dic.goods_type, dic.shopGoodsId, dic.goods_price), isBtn: true}}
              arr.push(item)
            }
            this.bodyList = arr
            this.serId = ''
            this.serviceSelected = ''
            this.serviceSecSelected = ''
            this.goodsName = ''
            this.saleSelected = ''
            this.serviceSrcArr = []
          }).catch(error => {
            this.isLoading = false
            console.log('error', error)
          })
      },
      returnSaleState (index) {
        if (Number(index) === 1) {
          return '在售中'
        } else if (Number(index) === 2) {
          return '待售中'
        } else {
          return '已下架'
        }
      },
      returnBtnArr (index, id, price) {
        if (Number(index) === 1) {
          return [
            {
              id: id,
              name: '下架',
              class: 'btn-primary',
              callback: this.done
            },
            {
              id: id,
              name: '查看详情',
              class: 'btn-info',
              callback: this.detail
            }
          ]
        } else {
          return [
            {
              id: id,
              price: price,
              name: '发布',
              class: 'btn-primary',
              callback: this.public
            },
            {
              id: id,
              name: '编辑',
              class: 'btn-info',
              callback: this.edit
            },
            {
              id: id,
              name: '删除',
              class: 'btn-danger',
              callback: this.del
            }
          ]
        }
      },
      public (item) {
        if (!item.str[0].price) {
          alert('请先完善商品信息!')
          return
        }
        api.request('post', 'goods/editGoodsType', {'goods_id': item.str[0].id, 'goods_type': '1'})
          .then(response => {
            if (Number(response.data.code === 0)) {
              this.loadData()
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      edit (item) {
        console.log('编辑')
        this.$router.push({name: 'GoodsDetail', params: {type: 'edit', id: item.str[0].id}})
      },
      del (item) {
        api.request('post', 'goods/delGoods', {'goods_id': item.str[0].id})
          .then(response => {
            console.log(response)
            if (Number(response.data.code === 0)) {
              this.loadData()
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      done (item) {
        api.request('post', 'goods/editGoodsType', {'goods_id': item.str[0].id, 'goods_type': '2'})
          .then(response => {
            if (Number(response.data.code === 0)) {
              this.loadData()
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      detail (item) {
        this.$router.push({name: 'ServiersAndGoodsDetail', params: {type: 'goods', 'id': item.str[0].id}})
      },
      add () {
        console.log('新增')
        this.$router.push({name: 'GoodsDetail', params: {type: 'add', 'id': '0'}})
      }
    },
    components: {
      Tables,
      Paginaction
    },
    watch: {
      current: function (newval, oldval) {
        if (newval !== oldval) {
          this.current = newval
          if (!this.isLoading) {
            this.loadData()
          }
        }
      },
      display: function (newval, oldval) {
        if (newval !== oldval) {
          this.display = newval
          if (!this.isLoading) {
            this.loadData()
          }
        }
      }
    }
  }
</script>

