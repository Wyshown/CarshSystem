<template>
  <div class="main-container">
    <div class="bs-callout">
      <div class="bs-callout-primary"></div>
      <div class="bs-callout-title">食物详情</div>
    </div>
    <form class="form-horizontal" @submit.prevent="submit">
      <div class="form-group ">
        <div>
          <label class="col-sm-2 control-label padding-left-right-0"><em class="red">*</em>食物类别：</label>
          <div class="col-sm-9">
            <div class="col-sm-6">
              <select class="form-control" name="serverType" v-model = 'serviceSelected'  v-validate="{ rules: { required: true} }" @change="_selSer()">
                <option value = ''>请选择一级类目</option>
                <option v-for="a in serviceArr" :value = 'a.foodType'>{{a.foodKindName}}</option>
              </select>
            </div>
            <div class="col-sm-6">
              <select class="form-control" name="serverSecType" v-model = 'serverSecSelected'  v-validate="{ rules: { required: true} }" @change="_selSecSer()">
                <option value = ''>请选择二级类目</option>
                <option v-for="a in serverSecArr" :value = 'a.id'>{{a.foodKindName}}</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-9">
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
          <label class="col-sm-2 control-label padding-left-right-0"><em class="red">*</em>食物code：</label>
          <div class="col-sm-9">
            <input  class="form-control" v-model="foodCodeModel" name="foodCodeModel" placeholder="请输入食物code" v-validate="{ rules: { required: true}}">
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-9 has-error">
              <label v-if="errors.has('foodCodeModel')" for="foodCodeModel" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入食物code
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group ">
        <div>
          <label class="col-sm-2 control-label padding-left-right-0"><em class="red">*</em>中文名称：</label>
          <div class="col-sm-9">
            <input  class="form-control" v-model="foodCnNameModel" name="foodCnNameModel" placeholder="请输入食物中文名称" v-validate="{ rules: { required: true}}">
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-9 has-error">
              <label v-if="errors.has('foodCnNameModel')" for="foodCnNameModel" class="control-label ellipsis">
                <i class="fa fa-fw fa-times-circle-o"></i> 请输入食物中文名称
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">英文名称：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="foodEnNameModel"  placeholder="请输入英文名称" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">食物别名：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="goodAliseModel"  placeholder="请输入食物别名" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">重量(100g)：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="weightModel"  placeholder="请输入重量" readonly >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">热量：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="caloryModel"  placeholder="请输入热量" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">热量等级：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="caloryStateRemarkModel" name="caloryStateRemarkModelRadio"> 低热量&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="caloryStateRemarkModel" name="caloryStateRemarkModelRadio"> 热量一般 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="caloryStateRemarkModel" name="caloryStateRemarkModelRadio"> 高热量

        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">脂肪：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="fatModel"  placeholder="请输入脂肪" >
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">脂肪等级：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="fatStateRemarkModel" name="fatStateRemarkModelRadio"> 低脂肪&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="fatStateRemarkModel" name="fatStateRemarkModelRadio"> 脂肪一般 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="fatStateRemarkModel" name="fatStateRemarkModelRadio"> 高脂肪
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">蛋白质：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="proteinModel"  placeholder="请输入蛋白质" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">膳食化纤：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="fiberDietaryModel"  placeholder="请输入膳食化纤" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">碳水化合物：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="carbohydrateModel"  placeholder="请输入碳水化合物" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">维生素A：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="vitaminAModel"  placeholder="请输入维生素A" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">维生素B1：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="thiamineModel"  placeholder="请输入维生素B1" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">胡萝卜素：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="lactoflavinDodel"  placeholder="请输入胡萝卜素" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">维生素C：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="vitaminCModel"  placeholder="请输入维生素C" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">维生素E：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="vitaminEModel"  placeholder="请输入维生素E" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">盐酸：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="niacinModel"  placeholder="请输入盐酸" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">钠：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="natriumModel"  placeholder="请输入钠" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">钙：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="calciumModel"  placeholder="请输入钙" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">铁：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="ironModel"  placeholder="请输入铁" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">钾：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="kaliumModel"  placeholder="请输入钾" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">碘：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="iodineModel"  placeholder="请输入碘" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">锌：</label>
        <div class="col-sm-9">
          <input  class="form-control" name="zincName" v-model="zincModel"  placeholder="请输入锌"  v-validate="{ rules: { decimal: 2}}">
        </div>
      </div>

      <div>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-9 has-error">
            <label v-if="errors.has('zincName')" for="zincName" class="control-label ellipsis">
              <i class="fa fa-fw fa-times-circle-o"></i> 类型错误,最多为两位小数的数字
            </label>
          </div>
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">硒：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="seleniumModel"  placeholder="请输入硒" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">镁：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="magnesiumModel"  placeholder="请输入镁" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">铜：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="copperModel"  placeholder="请输入铜" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">锰：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="manganeseModel"  placeholder="请输入锰" >
        </div>
      </div>

      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">胆固醇：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="cholesterolModel"  placeholder="请输入胆固醇" >
        </div>
      </div>

      <!--GL能量备注(1: 低GL 2.GL一般 3. 高GL)-->
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">gl值：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="glModel"  placeholder="请输入gl值" >
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">gl值等级：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="glStateRemarkModel" name="glStateRemarkModelRadio"> 低gl&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="glStateRemarkModel" name="glStateRemarkModelRadio"> gl一般 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="glStateRemarkModel" name="glStateRemarkModelRadio"> 高gl
        </div>
      </div>

      <!--GI能量备注(1: 低GI 2.GI一般 3. 高GI)-->
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">gi值：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="giModel"  placeholder="请输入gl值" >
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">gi值等级：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="giStateRemarkModel" name="giStateRemarkModelRadio"> 低gi&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="giStateRemarkModel" name="giStateRemarkModelRadio"> gi一般 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="giStateRemarkModel" name="giStateRemarkModelRadio"> 高gi
        </div>
      </div>

      <!--尿毒症安全等级(1.推荐 2.适量 3. 少吃)-->
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">尿毒症：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="uremiaSateGradeModel" name="uremiaSateGradeModelRadio"> 推荐&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="uremiaSateGradeModel" name="uremiaSateGradeModelRadio"> 适量 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="uremiaSateGradeModel" name="uremiaSateGradeModelRadio"> 少吃
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">尿毒症备注：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="uremiaSateGradeRemarkModel"  placeholder="请输入尿毒症安全等级备注" >
        </div>
      </div>

      <!--糖尿病肾病安全等级(1.推荐 2.适量 3. 少吃)-->
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">糖尿病肾病：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="dnSateGradeModel" name="dnSateGradeModelRadio"> 推荐&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="dnSateGradeModel" name="dnSateGradeModelRadio"> 适量 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="dnSateGradeModel" name="dnSateGradeModelRadio"> 少吃
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">糖尿病肾病备注：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="dnSateGradeRemarkModel"  placeholder="请输入糖尿病肾病安全等级备注" >
        </div>
      </div>

      <!--iga肾病安全等级(1.推荐 2.适量 3. 少吃)-->
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">iga肾病：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="igaSateGradeModel" name="igaSateGradeModelRadio"> 推荐&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="igaSateGradeModel" name="igaSateGradeModelRadio"> 适量 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="igaSateGradeModel" name="igaSateGradeModelRadio"> 少吃
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">iga肾病备注：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="igaSateGradeRemarkModel"  placeholder="请输入iga肾病安全等级备注" >
        </div>
      </div>

      <!--膜性肾病安全等级(1.推荐 2.适量 3. 少吃)-->
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">膜性肾病：</label>
        <div class="col-sm-9">
          <input type="radio" value="1" v-model="maSateGradeModel" name="maSateGradeModelRadio"> 推荐&nbsp &nbsp &nbsp
          <input type="radio" value="2" v-model="maSateGradeModel" name="maSateGradeModelRadio"> 适量 &nbsp &nbsp &nbsp
          <input type="radio" value="3" v-model="maSateGradeModel" name="maSateGradeModelRadio"> 少吃
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label padding-left-right-0">膜性肾病备注：</label>
        <div class="col-sm-9">
          <input  class="form-control" v-model="maSateGradeRemarkModel"  placeholder="请输入膜性肾病安全等级备注" >
        </div>
      </div>

      <div class="form-group ">
        <div>
          <div class="col-sm-11 ">
            <div class="col-sm-2 btn-margin-top">
              <button type="button" class="btn btn-primary check" v-on:click="submit">保存</button>
            </div>
            <div class="col-sm-2 btn-margin-top">
              <button type="button" class="btn btn-primary check" v-on:click="$router.back(-1)" >返回</button>
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
  import api from './../../api/index'
  import Notification from './../../public/components/propup/toast/Notification.vue'
  export default {
    mounted () {
      this.serviceSelected = this.$route.params.foodType
      console.log(this.serviceSelected, '-----------hanhan')
      this._getSecList()

      console.log('调用方法结束................')
      this._loadEditData()
      console.log('kwkwk...........kwk哈哈')
    },
    data () {
      return {
        serverName: '',
        serviceArr: [
          {
            'id': '1',
            'foodType': 'group',
            'foodKindName': '食物分类'
          },
          {
            'id': '2',
            'foodType': 'brand',
            'foodKindName': '热门品牌'
          },
          {
            'id': '3',
            'foodType': 'restaurant',
            'foodKindName': '连锁餐饮'
          }
        ],
        serviceSelected: '', // 1级类目
        goodsArr: [],
        showNotification: false,
        options: {},
        serverSecSelected: '', // 二级类目
        serverSecArr: '',
        foodObj: {},
        serId: '',

        foodCodeModel: '', // 食物code
        foodCnNameModel: '', // 食物中文名称
        foodEnNameModel: '', // 食物中文名称
        goodAliseModel: '', // 食物别名
        weightModel: '100', // 食物重量

        caloryModel: '', // 热量
        caloryStateRemarkModel: '2', // 热量安全等级备注

        fatModel: '', // 脂肪
        fatStateRemarkModel: '2', // 脂肪安全等级备注

        proteinModel: '', // 蛋白质
        fiberDietaryModel: '', // 膳食化纤
        carbohydrateModel: '', // 碳水化合物
        vitaminAModel: '', // 维生素A
        thiamineModel: '', // 维生素B1
        lactoflavinDodel: '', // 胡萝卜素
        vitaminCModel: '', // 维生素C
        vitaminEModel: '', // 维生素E

        niacinModel: '', // 盐酸
        natriumModel: '', // 钠
        calciumModel: '', // 钙
        ironModel: '', // 铁
        kaliumModel: '', // 钾
        iodineModel: '', // 碘
        zincModel: '', // 锌
        seleniumModel: '', // 硒
        magnesiumModel: '', // 镁
        copperModel: '', // 铜
        manganeseModel: '', // 锰
        cholesterolModel: '', // 胆固醇

        glModel: 0.0, // GL能量
        glStateRemarkModel: 2, // GL能量备注(1: 低GL 2.GL一般 3. 高GL)

        giModel: 0.0, // GI值
        giStateRemarkModel: 2, // GI能量备注(1: 低GI 2.GI一般 3. 高GI)

        uremiaSateGradeModel: 0,  // 尿毒症安全等级(1.推荐 2.适量 3. 少吃)
        uremiaSateGradeRemarkModel: '', //  尿毒症安全等级备注

        dnSateGradeModel: 0,  //  糖尿病肾病安全等级(1.推荐 2.适量 3. 少吃)
        dnSateGradeRemarkModel: '', // 糖尿病肾病安全等级备注

        igaSateGradeModel: 0, //  iga肾病安全等级(1.推荐 2.适量 3. 少吃)
        igaSateGradeRemarkModel: '',  //  iga肾病安全等级备注
        maSateGradeModel: 0,  //  膜性肾病安全等级(1.推荐 2.适量 3. 少吃)
        maSateGradeRemarkModel: '',  //  膜性肾病安全等级备注
        idModel: this.$route.params.id
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
        console.log('serverSecSelected===1', that.serverSecSelected)
        if (that.serverSecSelected !== '') {
          that.serId = that.serverSecSelected
          console.log('serverSecSelected===2', that.serverSecSelected)
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
          let url = '/foodKind/findAllFoodKindByFoodTypeAndName'
          let _params = {
            'foodType': that.serviceSelected,
            'page': -1,
            'pagenum': -1
          }

          console.log('二级类目的_params===', _params)
          api.requestJava('post', url, _params)
            .then(response => {
              that.isLoading = false
              that.serverSecArr = response.data.data.data
              console.log('请求之后的参数111111: ', response.data.data.data)
              that.serverSecSelected = this.$route.params.foodKindId
              console.log('-----params---: ', this.$route.params)
            }).catch(error => {
              that.isLoading = true
              console.log(error)
            })
        }
      },
      submit () {
        let that = this
        let _params = {

          'id': that.idModel,
          'foodKindId': that.serverSecSelected,
          'foodCode': that.foodCodeModel,
          'foodCnName': that.foodCnNameModel,
          'foodEnName': that.foodEnNameModel,
          'foodAlias': that.goodAliseModel,
          'weight': that.weightModel,

          'calory': that.caloryModel,
          'caloryStateRemark': that.caloryStateRemarkModel,
          'fat': that.fatModel,
          'fatStateRemark': that.fatStateRemarkModel,

          'protein': that.proteinModel,
          'fiberDietary': that.fiberDietaryModel,
          'carbohydrate': that.carbohydrateModel,

          'vitaminA': that.vitaminAModel,
          'thiamine': that.thiamineModel,
          'lactoflavin': that.lactoflavinDodel,

          'vitaminC': that.vitaminCModel,
          'vitaminE': that.vitaminEModel,
          'niacin': that.niacinModel,
          'natrium': that.natriumModel,
          'calcium': that.calciumModel,
          'iron': that.ironModel,
          'kalium': that.kaliumModel,
          'iodine': that.iodineModel,

          'zinc': that.zincModel,
          'selenium': that.seleniumModel,
          'magnesium': that.magnesiumModel,
          'copper': that.copperModel,
          'manganese': that.manganeseModel,
          'cholesterol': that.cholesterolModel,

          'gl': that.glModel,
          'glStateRemark': that.glStateRemarkModel,
          'gi': that.giModel,
          'giStateRemark': that.giStateRemarkModel,
          'uremiaSateGrade': that.uremiaSateGradeModel,

          'uremiaSateGradeRemark': that.uremiaSateGradeRemarkModel,
          'dnSateGrade': that.dnSateGradeModel,
          'dnSateGradeRemark': that.dnSateGradeRemarkModel,
          'igaSateGrade': that.igaSateGradeModel,
          'igaSateGradeRemark': that.igaSateGradeRemarkModel,
          'maSateGrade': that.maSateGradeModel,
          'maSateGradeRemark': that.maSateGradeRemarkModel
        }

        console.log('请求的参数===', _params)
        let url = '/food/updateFood'

        if (Number(_params.id) === 0) {
          url = '/food/saveFood'
        }
        api.requestJava('post', url, _params)
          .then(response => {
            that.isLoading = false
            this.$router.push({name: 'FoodList'})
          }).catch(error => {
            that.isLoading = true
            console.log(error)
          })
      },
      _loadEditData () {
        if (this.$route.params.type === 'edit') {
          let that = this
          that.isLoading = true
          let url = '/food/findFoodById'
          let _params = {
            'foodId': that.idModel
          }

          console.log('请求的参数===', _params)
          api.requestJava('post', url, _params)
            .then(response => {
              that.isLoading = false
              console.log('请求获得的参数1111111111---han------')
              that.foodObj = response.data.data
              console.log(that.foodObj)

              that.foodCodeModel = that.foodObj.foodCode
              that.foodCnNameModel = that.foodObj.foodCnName
              that.foodEnNameModel = that.foodObj.foodEnName
              that.goodAliseModel = that.foodObj.foodAlias
              that.weightModel = that.foodObj.weight

              that.caloryModel = that.foodObj.calory
              that.caloryStateRemarkModel = that.foodObj.caloryStateRemark
              that.fatModel = that.foodObj.fat
              that.fatStateRemarkModel = that.foodObj.fatStateRemark

              that.proteinModel = that.foodObj.protein
              that.fiberDietaryModel = that.foodObj.fiberDietary
              that.carbohydrateModel = that.foodObj.carbohydrate
              that.vitaminAModel = that.foodObj.vitaminA
              that.thiamineModel = that.foodObj.thiamine
              that.lactoflavinDodel = that.foodObj.lactoflavin

              that.vitaminCModel = that.foodObj.vitaminC
              that.vitaminEModel = that.foodObj.vitaminE
              that.niacinModel = that.foodObj.niacin
              that.natriumModel = that.foodObj.natrium
              that.calciumModel = that.foodObj.calcium
              that.ironModel = that.foodObj.iron
              that.kaliumModel = that.foodObj.kalium
              that.iodineModel = that.foodObj.iodine

              that.zincModel = that.foodObj.zinc
              that.seleniumModel = that.foodObj.selenium
              that.magnesiumModel = that.foodObj.magnesium
              that.copperModel = that.foodObj.copper
              that.manganeseModel = that.foodObj.manganese
              that.cholesterolModel = that.foodObj.cholesterol

              that.serviceSelected = that.foodObj.foodType

              that.glModel = that.foodObj.gl
              that.glStateRemarkModel = that.foodObj.glStateRemark
              that.giModel = that.foodObj.gi
              that.giStateRemarkModel = that.foodObj.giStateRemark
              that.uremiaSateGradeModel = that.foodObj.uremiaSateGrade
              that.uremiaSateGradeRemarkModel = that.foodObj.uremiaSateGradeRemark
              that.dnSateGradeModel = that.foodObj.dnSateGrade
              that.dnSateGradeRemarkModel = that.foodObj.dnSateGradeRemark

              that.igaSateGradeModel = that.foodObj.igaSateGrade
              that.igaSateGradeRemarkModel = that.foodObj.igaSateGradeRemark
              that.maSateGradeModel = that.foodObj.maSateGrade
              that.maSateGradeRemarkModel = that.foodObj.maSateGradeRemark

              console.log('--------: ' + that.foodObj.glModel)
              that._getSecList()
            }).catch(error => {
              that.isLoading = true
              console.log(error)
            })
        }
      }
    },
    components: {
      Notification
    }
  }
</script>

<style scoped>
  .placehold{
    height: 50px;
  }
  .padding-left-right-0{
    padding-left: 0px;
    padding-right: 0px;

  }
  .btn-margin-top{
    margin-top: 50px;
  }
</style>
