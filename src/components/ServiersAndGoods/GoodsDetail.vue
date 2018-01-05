<template>
  <div class="main-container">
    <div class="bs-callout">
      <div class="bs-callout-primary"></div>
      <div class="bs-callout-title">销售产品</div>
    </div>
    <form class="form-horizontal" @submit.prevent="submit">
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>所属类目：</label>
          <div class="col-sm-11">
            <div class="col-sm-6">
              <select class="form-control" name="serverType" v-model = 'serviceSelected'  v-validate="{ rules: { required: true} }" @change="_selSer()">
                <option value = ''>请选择一级类目</option>
                <option v-for="a in serviceArr" :value = 'a.id'>{{a.type_name}}</option>
              </select>
            </div>
            <div class="col-sm-6">
              <select class="form-control" name="serverSecType" v-model = 'serverSecSelected'  v-validate="{ rules: { required: true} }" @change="_selSecSer()">
                <option value = ''>请选择二级类目</option>
                <option v-for="a in serverSecArr" :value = 'a.id'>{{a.type_name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11">
              <div class="col-sm-6 has-error">
                <label v-if="errors.has('serverType')"  class="control-label ellipsis" style="color: #dd4b39;">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请选择一级类目
                </label>
              </div>
              <div class="col-sm-6 has-error">
                <label v-if="errors.has('serverSecType')"  class="control-label ellipsis" style="color: #dd4b39;">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请选择二级类目
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>产品名称：</label>
          <div class="col-sm-11">
            <input  class="form-control" v-model="goodsSelected" name="goodsSelected" placeholder="请输入产品名称" v-validate="{ rules: { required: true}}">
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('goodsSelected')" for="goodsSelected" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入产品名称
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group ">
          <label class="col-sm-1 control-label padding-left-right-0">标题描述：</label>
          <div class="col-sm-11">
            <input  class="form-control" v-model="goodsDes"  placeholder="请输入标题描述" >
          </div>
      </div>
      <div v-if="$route.params.type === 'edit'" class="form-group ">
        <label class="col-sm-1 control-label padding-left-right-0">库存数量：</label>
        <div class="col-sm-11">
          <input disabled class="form-control" v-model="inventory" name="inventory" placeholder="库存数量" >
        </div>
      </div>
      <div v-if="$route.params.type === 'edit'" class="form-group ">
        <label class="col-sm-1 control-label padding-left-right-0">进货价格：</label>
        <div class="col-sm-11">
          <input disabled class="form-control" v-model="money" name="money" placeholder="进货价格" >
        </div>
      </div>
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>产品标价：</label>
          <div class="col-sm-11">
            <input  class="form-control" v-model="price" name="price" placeholder="请输入服务标价" v-validate="{ rules: { required: true}}">
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('price')" for="price" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入服务标价
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>返积分比：</label>
        <div class="col-sm-11 ">
          <div v-for="card in cardArr" class="col-sm-3 form-group">
            <div>
              <label class="control-label">{{card.cardName}}</label>
              <input  class="score-input-width" v-model="card.proportion" v-bind:name ='card.cardName' v-validate="{ rules: { required: true}}">
              <label class="control-label">%</label>
            </div>
            <div>
              <div class="row">
                <div class="col-sm-12 has-error">
                  <label v-if="errors.has(card.cardName)"  class="control-label ellipsis">
                    <i class="fa fa-fw fa-times-circle-o"></i> 请填写{{card.cardName}}返积分比例
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>适用车型：</label>
          <div class="col-sm-11">
            <input  class="form-control" name="carType" v-model="carType"  placeholder="请输入试用车型" v-validate="{ rules: { required: true}}">
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('carType')" for="carType" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入使用车型
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>预约信息：</label>
          <div class="col-sm-11">
            <input  class="form-control" name="reservation" v-model="reservation" placeholder="请输入预约信息" v-validate="{ rules: { required: true}}">
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('reservation')" for="reservation" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入预约信息
              </label>
            </div>
          </div>
        </div>

      </div>
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>商品介绍：</label>
          <div class="col-sm-11">
            <textarea class="form-control" v-model="introduce" name="introduce" rows="3" v-validate="{ rules: { required: true}}"></textarea>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('introduce')" for="introduce" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入项目介绍信息
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>商品照片：</label>
          <div class="col-sm-11 ">
            <div class="col-sm-2" v-for="img in imageArr">
              <img class="serviers-img" :src="img"  />
            </div>
            <div class="col-sm-2" v-if="imageArr.length < 5">
              <file-upload class="file-upload" ref="fileUpload"></file-upload>
            </div>
            <div class="col-sm-1 btn-margin-top">
              <button type="button" class="btn btn-primary check" v-on:click="submit(2)">保存</button>
            </div>
            <div class="col-sm-1 btn-margin-top">
              <button type="button" class="btn btn-primary check" v-on:click="submit(1)" >发布</button>
            </div>
          </div>
        </div>
      </div>

    </form>
    <div class="placehold"></div>
    <notification
      :options.sync="options"
      :show.sync="showNotification"></notification>
  </div>
</template>

<script type="text/ecmascript-6">
  import fileUpload from './../../public/components/file-upload/file-upload.vue'
  import api from './../../api/index'
  import Notification from './../../public/components/propup/toast/Notification.vue'
  export default {
    mounted () {
//      this.loadServiceDate()
      this.findAllCardList()
    },
    data () {
      return {
        serverName: '',
        serviceArr: [],
        serviceSelected: '',
        price: '',
        goodsArr: [],
        goodsSelected: '',
        goodsDes: '',
        inventory: '',
        money: '',
        cardArr: [],
        imageArr: [],
        carType: '不限',
        reservation: '无需预约',
        introduce: '',
        showNotification: false,
        options: {},
        serverSecSelected: '',
        serverSecArr: '',
        serId: '',
        level: '2',                  /* 类目等级 */
        serviceType: '2'             /* 销售商品 */
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
          that.serverSecArr = []
          that.serverSecSelected = ''
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
        console.log('serverSecSelected===', that.serverSecSelected)
        if (that.serverSecSelected !== '') {
          that.serId = that.serverSecSelected
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
        if (that.serviceSelected === '' || that.serviceSelected === undefined) {
          that.serverSecArr = []
        } else {
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
              that.serverSecArr = response.data.data
              that.serverSecSelected = ''
            }).catch(error => {
              that.isLoading = true
              console.log(error)
            })
        }
      },
      reloadInfo () {
        api.request('post', 'goods/goodsDetail', {'goods_id': this.$route.params.id})
          .then(response => {
            let dic = response.data.data
            this.goodsDes = dic.goods_des
            this.price = dic.goods_price
            if (dic.suitable_models === '' || dic.suitable_models === null) {
              this.carType = '不限'
            } else {
              this.carType = dic.suitable_models
            }
            if (dic.appointment_info === '' || dic.appointment_info === null) {
              this.reservation = '无需预约'
            } else {
              this.reservation = dic.appointment_info
            }
            this.introduce = dic.goods_info
            this.goodsSelected = dic.goods_name
            this.serviceSelected = dic.p_service_id
            console.log('打印一下this.serviceSelected', this.serviceSelected)
            if (this.serviceSelected === '' || this.serviceSelected === undefined) {
              this.serverSecArr = []
            } else {
              let _secParams = {
                'serviceType': this.serviceType,
                'pid': this.serviceSelected,
                'level': this.level
              }

              console.log('二级类目的_params===', _secParams)
              api.request('post', 'index/getServiceList', _secParams)
                .then(response => {
                  this.serverSecArr = response.data.data
                  this.serverSecSelected = dic.service_id
                  this.serId = this.serverSecSelected
                }).catch(error => {
                  console.log(error)
                })
            }
            for (let index in dic.imgArr) {
              let imgDic = dic.imgArr[index]
              this.imageArr.push(imgDic.image_url)
            }
            for (let i in this.cardArr) {
              let cardDic1 = this.cardArr[i]
              for (let j in dic.integral_ratio) {
                let cardDic2 = dic.integral_ratio[j]
                if (cardDic1.cardId === cardDic2.card_id) {
                  cardDic1.proportion = (parseInt(parseFloat(cardDic2.proportion) * 100)).toString()
                  break
                }
              }
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      findAllCardList () { /* 找到所有的卡的种类 */
        api.requestJava('post', '/card/findAllCardList')
          .then(response => {
            for (let index in response.data.data) {
              let dic = response.data.data[index]
              let item = {'proportion': '', ...dic}
              this.cardArr.push(item)
            }
            this.loadServiceDate()
          })
      },
      submit (index) {
        this.$validator.validateAll().then(() => {
          if (this.imageArr.length === 0) {
            this.showNotification = true
            this.options = {
              autoClose: true,
              backgroundColor: '#fc5050',
              content: '*号为必填项'
            }
          } else {
            api.requestUpload('post', 'cashsysback.php/Public/multiMapUpload', {
              'base64': this.imageArr,
              'dir_name': 'appimg'
            })
              .then(response => {
                let img = []
                for (let i in response.data) {
                  let dic = response.data[i]
                  if (dic.code === 0) {
                    img.push(dic.url)
                  }
                }
                let card = []
                for (let j in this.cardArr) {
                  let dic = this.cardArr[j]
                  card.push({'cardId': dic.cardId, 'proportion': Number(dic.proportion) / 100})
                }
                let params = {
                  'goods_name': this.goodsSelected,
                  'goods_des': this.goodsDes,
                  'goods_price': this.price,
                  'service_id': this.serId,
                  'suitable_models': this.carType,
                  'appointment_info': this.reservation,
                  'goods_info': this.introduce,
                  'imgArr': img,
                  'integral_ratio': card,
                  'goods_type': index,
                  'service_type': '2'
                }
                if (this.$route.params.type === 'edit') {
                  params = {...params, 'id': this.$route.params.id}
                }
                console.log('params', JSON.stringify(params))
                api.request('post', 'goods/addGoods', params)
                  .then(response => {
                    console.log('response', response)
                    if (Number(response.data.code) === 0) {
                      this.showNotification = true
                      this.options = {
                        autoClose: true,
                        content: '操作成功'
                      }
                      setTimeout(function () {
                        window.history.go(-1)
                      }, 2000)
                    } else {
                      this.showNotification = true
                      this.options = {
                        autoClose: true,
                        backgroundColor: '#fc5050',
                        content: response.data.desc
                      }
                    }
                  }).catch(error => {
                    console.log(error)
                    this.showNotification = true
                    this.options = {
                      autoClose: true,
                      backgroundColor: '#fc5050',
                      content: '操作失败'
                    }
                  })
              }).catch(error => {
                console.log('error', error)
              })
          }
        }).catch(() => {
          this.showNotification = true
          this.options = {
            autoClose: true,
            backgroundColor: '#fc5050',
            content: '*号为必填项'
          }
        })
      },
      chooseGoods () {
        api.request('post', 'goods/checkInventory', {'goods_id': this.$route.params.id})
          .then(response => {
            console.log(response)
            if (Number(response.data.code === 0)) {
              this.money = response.data.data.money
              this.inventory = response.data.data.inventory
            } else if (Number(response.data.code === -1)) {
              this.money = '0'
              this.inventory = '0'
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      loadServiceDate () {
        api.request('post', 'index/getServiceList', {'serviceType': '2'})
          .then(response => {
            if (Number(response.data.code === 0)) {
              this.serviceArr = response.data.data
              if (this.$route.params.type === 'edit') {
                this.reloadInfo()
                this.chooseGoods()
              }
            }
          }).catch(error => {
            console.log('error', error)
          })
      },
      addImage (res) {
        this.imageArr.push(res)
      }
    },
    components: {
      fileUpload,
      Notification
    }
  }
</script>

<style scoped>
  .file-upload {
    height: 80px;
    width: 80px;
  }
  .placehold{
    height: 50px;
  }
  .padding-left-right-0{
    padding-left: 0px;
    padding-right: 0px;

  }
  .score-input-width{
    width: 50px;
  }
  .choose-img-box{
    width: 100px;
    height: 100px;
    background-color: rebeccapurple;
    padding: 0px;
    margin-left: 5px;
  }
  .selected-width{
    width: 100px;
  }
  .number-input-width{
    width: 50px;
  }
  .price-input-width{
    width: 150px;
    margin-left: 30px;
  }
  .margin-top-12{
    margin-top: 12px;
  }
  .serviers-img{
    width: 100px;
    height: 80px;
  }
  .btn-margin-top{
    margin-top: 50px;
  }
</style>
