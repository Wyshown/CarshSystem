<!--<template>-->
  <!--<div class="main-container">-->
    <!--<div class="bs-callout">-->
      <!--<div class="bs-callout-primary"></div>-->
      <!--<div class="bs-callout-title">会员信息修改</div>-->
    <!--</div>-->
    <!--<form class="form-horizontal marginTop" @submit.prevent="validateCard">-->
      <!--<div class="bs-tab">-->
        <!--<div class="bs-tab-primary"></div>-->
        <!--<div class="bs-callout-title">基本信息</div>-->
      <!--</div>-->

      <!--<div class="row">-->
        <!--<div class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-4">-->
          <!--<div class="">-->
            <!--<label for="phone" class="col-xs-0 col-sm-0 col-md-4 col-lg-3 control-label rmpaddingR"><em class="red">*</em>会员账户</label>-->
            <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">-->
              <!--<input type="text"-->
                     <!--class="form-control"-->
                     <!--v-model="phone"-->
                     <!--@blur="validationMember"-->
                     <!--name="phone"-->
                     <!--placeholder="请输入手机号"-->
                     <!--v-validate="{ rules: { required: true, regex: /^1[3|4|5|7|8]\d{9}$/} }">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div>-->
            <!--<div class="row">-->
              <!--<div class="col-xs-0 col-sm-0 col-md-4 col-lg-3 "></div>-->
              <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-9 tip has-error">-->
                <!--<label v-if="errors.has('phone')" for="phone" class="control-label ellipsis">-->
                  <!--<i class="fa fa-fw fa-times-circle-o"></i> 请输入正确的手机号-->
                <!--</label>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-4">-->
          <!--<div class="">-->
            <!--<label for="username" class="col-xs-0 col-sm-0 col-md-4 col-lg-3 control-label rmpaddingR"><em class="red">*</em>客户姓名</label>-->
            <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">-->
              <!--<input type="text" class="form-control" v-model="username" name="username" v-validate="{ rules: { required: true, regex: /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,10}$/} }">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="row">-->
            <!--<div class="col-xs-0 col-sm-0 col-md-4 col-lg-3 "></div>-->
            <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-9 tip has-error">-->
              <!--<label v-if="errors.has('username')" for="username" class="control-label ellipsis">-->
                <!--<i class="fa fa-fw fa-times-circle-o"></i> 姓名由数字、英文字母、下划线、中文组成-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="row">-->
        <!--<div class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-4">-->
          <!--<div class="">-->
            <!--<label for="sex" class="col-xs-0 col-sm-0 col-md-4 col-lg-3 control-label rmpaddingR">会员性别</label>-->
            <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">-->
              <!--<select class="form-control" v-model="sex" name="sex" >-->
                <!--<option value="">请选择</option>-->
                <!--<option value="0">男</option>-->
                <!--<option value="1">女</option>-->
              <!--</select>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-4">-->
          <!--<label for="birthday" class="col-xs-0 col-sm-0 col-md-4 col-lg-3 control-label rmpaddingR">会员生日</label>-->
          <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">-->
            <!--<datepicker id="birthday" :value="birthday" @on-change="onStartChange" :readonly="true" width="100%"></datepicker>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="bs-tab">-->
        <!--<div class="bs-tab-primary"></div>-->
        <!--<div class="bs-callout-title">添加车辆</div>-->
      <!--</div>-->
      <!--<Tables :provincial="provincial" :area="area" :brand="brand" :brandName="brandName" :modules="modules" :audi="audi" :car="car" :startTime="startTime" :endTime="endTime" :identity="identity"/>-->
      <!--<div class="text-right">-->
        <!--<button class="btn btn-primary">保存</button>-->
      <!--</div>-->
    <!--</form>-->
    <!--<notification-->
      <!--:options.sync="options"-->
      <!--:show.sync="showNotification"></notification>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import datepicker from 'vue-date-picker'-->
  <!--import api from './../../api/index'-->
  <!--import Notification from './../../public/components/propup/toast/Notification.vue'-->
  <!--export default {-->
    <!--mounted () {-->
      <!--this.phone = this.$route.params.userId-->
      <!--this.validationMember()-->
    <!--},-->
    <!--data () {-->
      <!--return {-->
        <!--phone: '',-->
        <!--username: '',-->
        <!--sex: '',-->
        <!--birthday: '',-->
        <!--userId: '',-->
        <!--brand: '',-->
        <!--brandName: '',-->
        <!--modules: '',-->
        <!--audi: '',-->
        <!--car: '', // 车款-->
        <!--startTime: '',-->
        <!--endTime: '',-->
        <!--identity: '',-->
        <!--isLoading: false,-->
        <!--showNotification: false,-->
        <!--options: {},-->
        <!--provincial: '苏',-->
        <!--area: 'A'-->
      <!--}-->
    <!--},-->
    <!--components: {-->
      <!--datepicker,-->
      <!--Notification-->
    <!--},-->
    <!--methods: {-->
      <!--onStartChange (val) {-->
        <!--this.birthday = val-->
      <!--},-->
      <!--validateCard () {-->
        <!--this.$validator.validateAll().then(() => {-->
          <!--if (this.modules !== '' && this.brand > 0 && this.audi !== '') {-->
            <!--this.saveClk()-->
          <!--} else if (this.modules !== '' && this.brandName !== '' && this.audi !== '') {-->
            <!--this.saveClk()-->
          <!--} else {-->
            <!--this.showNotification = true-->
            <!--this.options = {-->
              <!--autoClose: true,-->
              <!--backgroundColor: '#fc5050',-->
              <!--content: '*号为必填项'-->
            <!--}-->
          <!--}-->
        <!--}).catch(() => {-->
          <!--this.showNotification = true-->
          <!--this.options = {-->
            <!--autoClose: true,-->
            <!--backgroundColor: '#fc5050',-->
            <!--content: '*号为必填项'-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--validationMember () {-->
        <!--let _reft = this-->
        <!--if (_reft.phone === '') {-->
          <!--return-->
        <!--}-->
        <!--let _params = {-->
          <!--userName: _reft.phone-->
        <!--}-->
        <!--api.request('post', 'customer/customerOneDetails', _params)-->
          <!--.then(response => {-->
            <!--if (Number(response.data.code) === 0) {-->
              <!--let data = response.data.data-->
              <!--_reft.userId = data.userId-->
              <!--_reft.carId = data.carId-->
              <!--_reft.username = data.userNick != null ? data.userNick : ''-->
              <!--_reft.sex = data.userSex != null ? data.userSex : ''-->
              <!--_reft.birthday = data.userBirthday-->
              <!--if (data.carNumber !== null) {-->
                <!--let str = data.carNumber.split('  ')-->
                <!--if (str.length > 1) {-->
                  <!--_reft.modules = str[1]-->
                  <!--_reft.provincial = str[0].substr(0, 1)-->
                  <!--_reft.area = str[0].substr(1, 2)-->
                <!--} else {-->
                  <!--_reft.modules = ''-->
                <!--}-->
              <!--}-->
              <!--_reft.brand = data.brandId != null ? data.brandId : ''-->
              <!--_reft.brandName = data.brandName != null ? data.brandName : ''-->
              <!--_reft.car = data.carName != null ? data.carName : ''-->
              <!--_reft.audi = data.carModelName-->
              <!--_reft.identity = data.carVin-->
              <!--_reft.startTime = data.carInsurance !== null && data.carInsurance !== '' ? data.carInsurance.replace(/\//g, '-') : ''-->
              <!--_reft.endTime = data.carVehicleDate !== null && data.carVehicleDate !== '' ? data.carVehicleDate.replace(/\//g, '-') : ''-->
            <!--} else if (Number(response.data.code) === -1) {-->
              <!--_reft.showNotification = true-->
              <!--_reft.options = {-->
                <!--autoClose: false,-->
                <!--backgroundColor: '#fbff7c',-->
                <!--textColor: '#92253f',-->
                <!--content: response.data.desc-->
              <!--}-->
            <!--} else if (Number(response.data.code) === 401) {-->
              <!--_reft.$router.push('login')-->
            <!--}-->
          <!--}).catch(error => {-->
            <!--console.log('error', error)-->
          <!--})-->
      <!--},-->
      <!--saveClk () {-->
        <!--let _params = {-->
          <!--user_id: this.userId,-->
          <!--user_name: this.phone,-->
          <!--nick: this.username,-->
          <!--sex: this.sex,-->
          <!--birthday: this.birthday,-->
          <!--carId: this.carId,-->
          <!--car_number: this.provincial + this.area + '  ' + this.modules,-->
          <!--brand_id: this.brand,-->
          <!--brand_name: this.brandName,-->
          <!--car_name: this.car,-->
          <!--car_model_name: this.audi,-->
          <!--insurance_expiration: this.startTime,-->
          <!--vehicle_date: this.endTime,-->
          <!--vin: this.identity,-->
          <!--isDefault: 1-->
        <!--}-->
        <!--console.log('params:', _params)-->
        <!--let _reft = this-->
        <!--api.request('post', 'customer/customerOneUpdate', _params)-->
          <!--.then(response => {-->
            <!--if (Number(response.data.code) === 0) {-->
              <!--_reft.showNotification = true-->
              <!--_reft.options = {-->
                <!--autoClose: true,-->
                <!--showTime: 5000,-->
                <!--backgroundColor: '#769FCD',-->
                <!--content: '保存成功',-->
                <!--countdownBar: true,-->
                <!--barColor: '#415F77'-->
              <!--}-->
              <!--setTimeout(() => {-->
                <!--_reft.$router.push('/customerDetails')-->
              <!--}, 1000)-->
            <!--} else if (Number(response.data.code) === -1) {-->
              <!--_reft.showNotification = true-->
              <!--_reft.options = {-->
                <!--autoClose: false,-->
                <!--backgroundColor: '#fbff7c',-->
                <!--textColor: '#92253f',-->
                <!--content: response.data.desc-->
              <!--}-->
            <!--} else if (Number(response.data.code) === 401) {-->
              <!--_reft.$router.push('login')-->
            <!--}-->
          <!--}).catch(error => {-->
            <!--console.log('error', error)-->
          <!--})-->
      <!--},-->
      <!--setDefault () {-->
        <!--this.phone = ''-->
        <!--this.userId = ''-->
        <!--this.username = ''-->
        <!--this.sex = ''-->
        <!--this.birthday = ''-->
        <!--this.modules = ''-->
        <!--this.brand = 0-->
        <!--this.brandName = ''-->
        <!--this.carName = ''-->
        <!--this.audi = ''-->
        <!--this.identity = ''-->
        <!--this.startTime = ''-->
        <!--this.endTime = ''-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style lang="scss" scoped>-->
  <!--.marginTop{-->
    <!--margin-top: 20px;-->
  <!--}-->
  <!--.bs-tab {-->
    <!--width: 100%;-->
    <!--margin: 0.5rem 0;-->
    <!--padding: 0.5rem 0;-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--align-items: center;-->
    <!--.bs-tab-primary {-->
      <!--margin: 0 0;-->
      <!--width: 10px;-->
      <!--height: 10px;-->
      <!--background: #3c8dbc;-->
      <!--border-radius: 50%;-->
      <!--display: inline-block;-->
    <!--}-->
  <!--}-->
<!--</style>-->
