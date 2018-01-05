<template>
  <div class="main-container">
    <div class="bs-callout">
      <div class="bs-callout-primary"></div>
      <div class="bs-callout-title">服务名称</div>
    </div>
    <form class="form-horizontal" @submit.prevent="submit">
      <div class="form-group ">
        <!--<div>-->
          <!--<label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>所属类目：</label>-->
          <!--<div class="col-sm-11">-->
            <!--<select class="form-control" name="serverType" v-model = 'serviceSelected'  v-validate="{ rules: { required: true} }">-->
              <!--<option value = ''>请选择类型</option>-->
              <!--<option v-for="a in serviceArr" :value = 'a.id'>{{a.type_name}}</option>-->
            <!--</select>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div>-->
          <!--<div class="row">-->
            <!--<div class="col-sm-1"></div>-->
            <!--<div class="col-sm-11 has-error">-->
              <!--<label v-if="errors.has('serverType')"  class="control-label ellipsis">-->
                <!--<i class="fa fa-fw fa-times-circle-o"></i> 请选择服务类型-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
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
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>服务名称：</label>
          <div class="col-sm-11">
            <input  class="form-control" v-model="goodName" name="goodName"  placeholder="请输入类目下的服务名称" v-validate="{ rules: { required: true} }">
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('goodName')"  class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入服务名称
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>定价类型：</label>
          <div class="col-sm-11">
            <select class="form-control"  v-model = 'saleSelected' name ='priceType' v-validate="{ rules: { required: true} }">
              <option value =''>请选择价格类型</option>
              <option v-for="a in saleStates" :value ='a'>{{a.stateName}}</option>
            </select>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('priceType')" for="priceType" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请选择定价类型
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-if="saleSelected.state == 1" class="form-group ">
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>服务标价：</label>
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
        <div>
          <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>选择套餐：</label>
          <div class="col-sm-11">
            <select class="form-control" v-model="packageSelected" name="package" v-validate="{ rules: { required: true}}">
              <option value = ''>请选择</option>
              <option v-for="a in packageArr" :value = 'a'>{{a.packageType}}</option>
            </select>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-11 has-error">
              <label v-if="errors.has('package')" for="package" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请选择是否为套餐
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-if="packageSelected.id == 1" class="form-group">
        <label class="col-sm-1 control-label padding-left-right-0"><em class="red">*</em>选择商品：</label>
        <div class="col-sm-11">
          <div class="col-sm-12 margin-top-12" v-for="(model,index) in goodsArr">
            <div class="col-sm-2">
              <div>
                <select class="form-control" v-bind:name ="'parService'+index" v-validate="{ rules: { required: true}}" v-model="model.p_service_id" @change="chooseServece(model.p_service_id,index)">
                  <option value =''>请选择一级类目</option>
                  <option v-for="service in parentTypeArr" :value = 'service.id'>{{service.type_name}}</option>
                </select>
              </div>
              <div>
                <div class="row">
                  <div class="col-sm-12 has-error">
                    <label v-if="errors.has('parService'+index)"  class="control-label ellipsis">
                      <i class="fa fa-fw fa-times-circle-o"></i> 请选择一级类目
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div>
                <select class="form-control" v-bind:name ="'service'+index" v-validate="{ rules: { required: true}}" v-model="model.service_id" @change="chooseGoodServece(model.service_id,index)">
                  <option value =''>请选择二级类目</option>
                  <option v-for="service in model.goodsTypeArr" :value = 'service.id'>{{service.type_name}}</option>
                </select>
              </div>
              <div>
                <div class="row">
                  <div class="col-sm-12 has-error">
                    <label v-if="errors.has('service'+index)"  class="control-label ellipsis">
                      <i class="fa fa-fw fa-times-circle-o"></i> 请选择二级类目
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div>
                <select class="form-control" v-bind:name ="'good'+index" v-validate="{ rules: { required: true}}" v-model="model.product_goods_id" @change="chooseGood($event)">
                  <option value =''>请选择商品</option>
                  <option :value = 'good.shopGoodsId' v-for="good in model.goods">{{good.goods_name}}</option>
                </select>
              </div>
              <div>
                <div class="row">
                  <div class="col-sm-12 has-error">
                    <label v-if="errors.has('good'+index)"  class="control-label ellipsis">
                      <i class="fa fa-fw fa-times-circle-o"></i> 请选择商品
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 ">
              <label class="control-label col-sm-1">x</label>
              <div class="col-sm-3">
                <div >
                  <input class="form-control" v-bind:name ="'number'+index" v-validate="{ rules: { required: true}}" v-model="model.number" placeholder="数量">
                </div>
                <div>
                  <div class="row">
                    <div class="col-sm-12 has-error">
                      <label v-if="errors.has('number'+index)"  class="control-label ellipsis">
                        <i class="fa fa-fw fa-times-circle-o"></i> 请输入数量
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-5">
                <div >
                  <input v-bind:name ="'money'+index" v-validate="{ rules: { required: true}}" class="form-control" v-model="model.money" placeholder="请输入单价">
                </div>
                <div>
                  <div class="row">
                    <div class="col-sm-12 has-error">
                      <label v-if="errors.has('money'+index)"  class="control-label ellipsis">
                        <i class="fa fa-fw fa-times-circle-o"></i> 请输入单价
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <i class="fa fa-minus " v-on:click="deleteGood(index)"></i>
                <i v-if="index == 0" class="fa fa-plus " v-on:click="addGood()"></i>
              </div>

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
              <file-upload class="file-upload" ></file-upload>
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
        goodName: '',
        serviceArr: [],
        parentTypeArr: [],
        serviceSelected: '',
        saleStates: [
          {
            'state': '1',
            'stateName': '固定金额'
          },
          {
            'state': '2',
            'stateName': '非固定金额'
          }
        ],
        saleSelected: '',
        price: '',
        packageArr: [
          {
            'id': '1',
            'packageType': '套餐包含产品'
          },
          {
            'id': '2',
            'packageType': '非套餐,不包含产品'
          }
        ],
        packageSelected: '',
        goodsArr: [
          {
            'p_service_id': '',
            'service_id': '',
            'product_goods_id': '',
            'number': '',
            'money': '',
            'goodsTypeArr': [],
            'goods': []
          }
        ],
        cardArr: [],
        imageArr: [],
        carType: '不限',
        reservation: '无需预约',
        introduce: '',
        showNotification: false,
        options: {},
        serverSecSelected: '',
        serverSecArr: [],
        addIdx: '',
        serId: '',
        level: '2',                  /* 类目等级 */
        serviceType: '1'             /* 服务商品 */
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
              that.serverSecArr = response.data.data
              that.serverSecSelected = ''
            }).catch(error => {
              console.log(error)
            })
        }
      },
      reloadInfo () {
        api.request('post', 'goods/goodsDetail', {'goods_id': this.$route.params.id})
          .then(response => {
//            console.log(response.data.data)
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
            this.serviceSelected = dic.p_service_id

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
            this.goodName = dic.goods_name
            this.saleSelected = this.saleStates[Number(dic.goods_price_type) - 1]
            this.packageSelected = this.packageArr[Number(dic.combination) - 1]
            if (dic.goods_combination && dic.goods_combination.length > 0) {
              console.log('在这里打印一下goods_combination', dic.goods_combination)
              this.goodsArr = dic.goods_combination
              for (let i in this.goodsArr) {
                let goodDic = this.goodsArr[i]
                console.log('i是', i)
                console.log('i是===', goodDic)
                this.chooseServece(goodDic.p_service_id, i)
                this.chooseGoodServece(goodDic.service_id, i)
              }
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
                  card.push({'cardId': dic.cardId, 'proportion': parseFloat(dic.proportion) / 100})
                }
                let params = {
                  'goods_name': this.goodName,
                  'goods_price': this.saleSelected.state === '1' ? this.price : 0,
                  'goods_price_type': this.saleSelected.state,
                  'service_id': this.serId,
                  'combination': this.packageSelected.id,
                  'suitable_models': this.carType,
                  'appointment_info': this.reservation,
                  'goods_info': this.introduce,
                  'goods_combination': this.packageSelected.id === '1' ? this.goodsArr : [],
                  'imgArr': img,
                  'integral_ratio': card,
                  'goods_type': index,
                  'service_type': '1'
                }
                if (this.$route.params.type === 'edit') {
                  params = {...params, 'id': this.$route.params.id}
                }
//                console.log('params', params)
                api.request('post', 'goods/addGoods', params)
                  .then(response => {
//                    console.log('response', response)
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
      chooseServece (id, index) {
        this.goodsArr[index].goodsTypeArr = []
        this.goodsArr[index].goods = []
        this.addIdx = index
        console.log('选择第一级类目的id是:', id)
        console.log('选择第一级类目的index是:', index)
        if (id === '' || id === undefined) {
          this.goodsArr[index].goodsTypeArr = []
          this.goodsArr[index].goods = []
        } else {
          api.request('post', 'index/getServiceList', {'pid': id, 'level': '2', 'serviceType': ''})
            .then(response => {
              if (Number(response.data.code === 0)) {
                console.log('请求的二级类目是:', response.data.data)
                this.goodsArr[index].goodsTypeArr = response.data.data
              }
            }).catch(error => {
              console.log('error', error)
            })
        }
      },
      chooseGoodServece (id, index) {
        console.log('选择第二级类目的id是:', id)
        console.log('选择第二级类目的index是:', index)
        if (id === '' || id === undefined) {
          this.$set(this.goodsArr[index], 'goods', [])
        } else {
          api.request('post', 'index/getGoodsList', {'serviceID': id, 'page': '1', 'pagenum': '100'})
            .then(response => {
              if (Number(response.data.code === 0)) {
//              this.goodsArr[index].goods = response.data.data.info
                this.$set(this.goodsArr[index], 'goods', response.data.data.info)
                console.log('this.goodsArr===', this.goodsArr)
              }
            }).catch(error => {
              console.log('error', error)
            })
        }
      },
      chooseGood (e) {
        let that = this
        that.goodsArr[that.addIdx].money = ''
        let target = e.target
        let objs = target.options[target.selectedIndex]
        console.log('objs是=', objs)
        if (objs !== undefined && objs.value !== undefined) {
          that.goodsId = objs.value
          that.goodsName = objs.innerText
          api.request('post', 'inventory/getInventoryDetial', {'goodsId': that.goodsId})
            .then(response => {
              if (Number(response.data.code === 0)) {
                console.log('response.data是===', response.data)
                console.log('新加的response.data.money', response.data.data.money)
                that.goodsArr[that.addIdx].money = response.data.data.money
              }
            }).catch(error => {
              console.log('error', error)
            })
        }
        console.log('that.goodsId是=', that.goodsId)
        console.log('that.goodsName是=', that.goodsName)
      },
      addGood () {
        let good = {
          'service_id': '',
          'product_goods_id': '',
          'number': '',
          'money': '',
          'goods': []
        }
        this.goodsArr.push(good)
      },
      deleteGood (index) {
        if (this.goodsArr.length === 1) {
          return
        }
        this.goodsArr.splice(index, 1)
      },
      loadServiceDate () {
//        api.request('post', 'index/getServiceList', {'serviceType': '1'})
//          .then(response => {
//            if (Number(response.data.code === 0)) {
//              this.serviceArr = response.data.data
//              if (this.$route.params.type === 'edit' || this.$route.params.type === 'detail') {
//                this.reloadInfo()
//              }
//            }
//          }).catch(error => {
//            console.log('error', error)
//          })
        api.request('post', 'index/getServiceList', {'serviceType': ''})
          .then(response => {
            if (Number(response.data.code === 0)) {
//              this.parentTypeArr = response.data.data
              let arr = []
              for (let index in response.data.data) {
                let dic = response.data.data[index]
                if (dic.service_type === '1') {
                  arr.push(dic)
                }
              }
              this.serviceArr = arr
              let escArr = []
              for (let index in response.data.data) {
                let dic = response.data.data[index]
                if (dic.service_type === '2') {
                  escArr.push(dic)
                }
              }
              this.parentTypeArr = escArr
              if (this.$route.params.type === 'edit' || this.$route.params.type === 'detail') {
                this.reloadInfo()
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
