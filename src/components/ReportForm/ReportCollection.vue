<template>
  <h1>收藏报表统计</h1>
</template>
<!--<template>-->
  <!--<div class="main-container">-->
    <!--<div class="row form-horizontal">-->
      <!--<div class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-3">-->
        <!--<label for="startTime" class="col-xs-0 col-sm-0 col-md-4 col-lg-4 control-label rmpaddingR">开始时间</label>-->
        <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">-->
          <!--<datepicker id="startTime" :value="startTime" @on-change="onStartChange" :readonly="true" width="100%"></datepicker>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="form-group col-xs-12  col-sm-12 col-sm-5 col-md-5 col-lg-3">-->
        <!--<label for="endTime" class="col-xs-0 col-sm-0 col-md-4 col-lg-4 control-label rmpaddingR">结束时间</label>-->
        <!--<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">-->
          <!--<datepicker id="endTime" :value="endTime" @on-change="onEndChange" :readonly="true" width="100%"></datepicker>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="col-xs-12 col-sm-12 col-sm-12 col-md-2 col-lg-4">-->
        <!--<div>-->
          <!--<button type="button" class="btn btn-primary check" v-on:click="loadData()">查询</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="tableTitle"><div class="titleLine"></div><div class="marginLeft">总计</div></div>-->
    <!--<Tables :bodyList="totalbodyList" :headerList="totalheaderList" />-->
    <!--<div class="tableTitle"><div class="titleLine"></div><div class="marginLeft">明细</div></div>-->
    <!--<Tables :bodyList="detailbodyList" :headerList="detailheaderList" />-->
    <!--<Paginaction :total="total" :display="display" :current="current"/>-->

  <!--</div>-->
<!--</template>-->
<!--<script type="text/ecmascript-6">-->
  <!--import Tables from './../../public/components/tables/Table.vue'-->
  <!--import Paginaction from './../../public/components/paging/pagination.vue'-->
  <!--import datepicker from 'vue-date-picker'-->
  <!--import api from './../../api/index'-->
  <!--export default {-->
    <!--name: 'ReportForm',-->
    <!--mounted () {-->
      <!--this.totalheaderList = [{name: '开卡数量'}, {name: '充值次数'}, {name: '充值金额'}, {name: '消费次数'}, {name: '消费金额'}, {name: '赠送积分'}]-->
      <!--this.detailheaderList = [{name: '时间'}, {name: '开卡数量'}, {name: '充值次数'}, {name: '充值金额'}, {name: '消费次数'}, {name: '消费金额'}, {name: '赠送积分'}]-->
      <!--this.loadData()-->
    <!--},-->
    <!--data () {-->
      <!--return {-->
        <!--totalheaderList: [],-->
        <!--totalbodyList: [],-->
        <!--detailheaderList: [],-->
        <!--detailbodyList: [],-->
        <!--startTime: '',-->
        <!--endTime: '',-->
        <!--total: 0,-->
        <!--display: 10,-->
        <!--current: 1,-->
        <!--isLoading: false-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--onStartChange (val) {-->
        <!--this.startTime = val-->
      <!--},-->
      <!--onEndChange (val) {-->
        <!--this.endTime = val-->
      <!--},-->
      <!--loadData () {-->
<!--//        let _params = {-->
<!--//          admin_name: '15358309720',-->
<!--//          pwd: '123456'-->
<!--//        }-->
<!--//        api.request('post', 'public/login', _params)-->
<!--//          .then(response => {-->
<!--//            console.log('response', response)-->
<!--//          }).catch(error => {-->
<!--//            console.log('error', error)-->
<!--//          })-->
        <!--let _params = {-->
          <!--begintime: this.startTime,-->
          <!--endtime: this.endTime,-->
          <!--page: this.current,-->
          <!--pagenum: this.display-->
        <!--}-->
        <!--this.isLoading = true-->
        <!--api.request('post', 'report/reportCardVipConsume', _params)-->
          <!--.then(response => {-->
            <!--if (Number(response.data.code) === 0) {-->
              <!--this.isLoading = false-->
              <!--this.total = response.data.data.count-->
              <!--let data = response.data.data-->
              <!--this.totalbodyList = [-->
                <!--{name: data.allFirstCard, cate: data.allRechargeCount, tdata4: '¥' + (data.allRecharge == null ? '0' : data.allRecharge), tdata5: data.allConsumeCount, tdata6: data.allConsume, tdata7: data.allScore}-->
              <!--]-->
              <!--let detail = response.data.data.details-->
              <!--let arr = []-->
              <!--for (let key in detail) {-->
                <!--let dic = detail[key]-->
                <!--arr.push({name: dic.date, cate: dic.firstCard, tdata4: dic.rechargeCount, tdata5: '¥' + (dic.recharge == null ? '0' : dic.recharge), tdata6: dic.consumeCount, tdata7: '¥' + dic.consume, tdata8: dic.score})-->
              <!--}-->
              <!--this.detailbodyList = arr-->
            <!--} else if (Number(response.data.code) === -1) {-->
              <!--this.total = 0-->
              <!--this.detailbodyList = []-->
            <!--} else if (Number(response.data.code) === 401) {-->
              <!--this.$router.push('login')-->
            <!--}-->
          <!--}).catch(error => {-->
            <!--this.isLoading = false-->
            <!--console.log('error', error)-->
          <!--})-->
<!--//        $.ajax({-->
<!--//          type: 'POST',-->
<!--//          url: 'http://test3.gouchehui.com:8082/cashsysback.php/public/login',-->
<!--//          data: JSON.stringify({admin_name: '15358309720', pwd: '123456'}),-->
<!--//          url: 'http://test3.gouchehui.com:8082/cashsysback.php/index/getServiceList',-->
<!--//          data: JSON.stringify({serviceType: 1}),-->
<!--//          xhrFields: {-->
<!--//            withCredentials: true-->
<!--//          },-->
<!--//          success: function (data) {-->
<!--//            console.log(data)-->
<!--//          },-->
<!--//          error: function (fail) {-->
<!--//          }-->
<!--//        })-->
      <!--}-->
    <!--},-->
    <!--watch: {-->
      <!--current: function (newval, oldval) {-->
        <!--if (newval !== oldval) {-->
          <!--this.current = newval-->
          <!--if (!this.isLoading) {-->
            <!--this.loadData()-->
          <!--}-->
        <!--}-->
      <!--},-->
      <!--display: function (newval, oldval) {-->
        <!--if (newval !== oldval) {-->
          <!--this.display = newval-->
          <!--if (!this.isLoading) {-->
            <!--this.loadData()-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--components: {-->
      <!--Tables,-->
      <!--Paginaction,-->
      <!--datepicker-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style lang="scss">-->
  <!--.titleLine{-->
    <!--background-color: #2194fe;-->
    <!--height: 1.3rem;-->
    <!--width: 0.2rem;-->
  <!--}-->
  <!--.tableTitle{-->
    <!--width: 100%;-->
    <!--background-color: #f9f9f9;-->
    <!--margin-top: 0.5rem;-->
    <!--padding: 0.5rem;-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--align-items: center;-->
  <!--}-->
  <!--.checkBox{-->
    <!--flex-grow:1;-->
    <!--display: flex;-->
    <!--flex-direction: row-reverse;-->
  <!--}-->
  <!--.marginLeft{-->
    <!--margin-left: 0.7rem;-->
  <!--}-->
  <!--.timebox{-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
  <!--}-->
  <!--table{-->
    <!--background-color: #FFF!important;-->
  <!--}-->
  <!--.datetime-picker input {-->
    <!--height: 34px !important;-->
  <!--}-->
<!--</style>-->
