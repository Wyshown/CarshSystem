<style lang="scss" scoped>
  @import '/static/css/common.css';
  @import '/static/css/rotate.css';
</style>
<template>
  <div class="main-container">
    <Tables  refs="tables" :bodyList="bodyList" :headerList="headerList" :edit="edits"/>
    <!--:btns="[{name:'编辑', callback: edits, class: 'btn-primary'}, {name: '删除', callback: del, class: 'btn-danger'}]" />-->


    <Paginaction :total="total" :current.sync="current" refs="paginaction"/>

    <form class="form-horizontal" @submit.prevent="validateBeforeSubmit">
      <div class="form-group col-sm-6" :class="{'has-error':errors.has('username')}">
        <div class="row">
          <label for="username" class="col-sm-3 control-label rmpaddingR">客户姓名</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="username" name="username" placeholder="请输入用姓名" v-validate="{ rules: { required: true, regex: /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,10}$/} }">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-9 tip">
            <label v-if="errors.has('username')" for="username" class="control-label ellipsis">
              <i class="fa fa-fw fa-times-circle-o"></i> 姓名由数字、英文字母、下划线、中文组成
            </label>
          </div>
        </div>
      </div>

      <div class="form-group col-sm-6" :class="{'has-error':errors.has('phone')}">
        <div class="row">
          <label for="phone" class="col-sm-3 control-label rmpaddingR">会员账户</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="phone" name="phone" placeholder="请输入手机号" v-validate="{ rules: { required: true, regex: /^1[3|4|5|7|8]\d{9}$/} }">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-9 tip">
            <label v-if="errors.has('phone')" for="phone" class="control-label ellipsis">
              <i class="fa fa-fw fa-times-circle-o"></i> 请输入正确的手机号
            </label>
          </div>
        </div>
      </div>
      <div class="form-group  col-sm-6" :class="{'has-error':errors.has('numeric')}">
        <div class="row">
          <label for="numeric" class="col-sm-3 control-label rmpaddingR">充值金额</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="numeric" name="numeric" placeholder="3000"  v-validate="'required|numeric'">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-9 tip">
            <label v-if="errors.has('numeric')" for="numeric" class="control-label ellipsis">
              <i class="fa fa-fw fa-times-circle-o"></i> 请输入整数
            </label>
          </div>
        </div>
      </div>
      <div class="form-group  col-sm-6" :class="{'has-error':errors.has('platenumber')}">
        <div class="row">
          <label for="platenumber" class="col-sm-3 control-label rmpaddingR">车 牌 号</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="platenumber" name="platenumber" placeholder="苏A88888"  v-validate="{ rules: { required: true, regex: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/} }">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-9 tip">
            <label v-if="errors.has('platenumber')" for="platenumber" class="control-label ellipsis">
              <i class="fa fa-fw fa-times-circle-o"></i> 请正确的车牌格式
            </label>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <p class="control">
          <button class="btn btn-primary" type="submit">Submit</button>
        </p>
      </div>

      <table class="table table-striped table-bordered  table-hover">
        <thead>
        <tr class="text-center">
          <td width="50">序号</td>
          <td><em class="red">* </em>车牌号</td>
          <td><em class="red">* </em>品牌车型</td>
          <td>保险到期日</td>
          <td>生产年份</td>
          <td>车驾号</td>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center">
          <td width="50" style="height: 34px;line-height: 34px">
            1
          </td>
          <td>
            <input type="text" class="form-control" v-model="car.brand">
          </td>
          <td>
            <input type="text" class="form-control" v-model="car.modules">
          </td>
          <td>
            <div class="input-group">
                            <span class="input-group-addon">
                              <i class="fa fa-fw fa-calendar"></i>
                            </span>
              <datepicker v-model="car.startTimer" @on-change="onStartChange" :readonly="true" format="YYYY-MM-DD" id="dateInput" width="100%"></datepicker>
            </div>
          </td>
          <td>
            <div class="input-group">
                            <span class="input-group-addon">
                              <i class="fa fa-fw fa-calendar"></i>
                            </span>
              <datepicker v-model="car.endTimer" @on-change="onEndChange" :readonly="true" format="YYYY-MM-DD" id="dateInput" width="100%"></datepicker>
            </div>
          </td>
          <td>
            <input type="text" class="form-control" v-model="car.identity">
          </td>
        </tr>
        </tbody>
      </table>

    </form>
    <button
      class="btn scale"
      :style="delay"
      @click="onShow"
    >zoom</button>

    <vodal :show="btnShow" animation="zoom" @hide="btnShow = false">
      <div>A vue modal with animations.</div>
    </vodal>

    <main>
      <h1>Yummy Notie!</h1>
      <div class="btns">
        <a class="btn"
           v-for="btn of btns"
           @click="notice(btn.options)">{{ btn.content }}</a>
      </div>
    </main>
    <notification
      :options.sync="options"
      :show.sync="showNotification"></notification>
  </div>
</template>
<script type="text/ecmascript-6">
  import Tables from './../../public/components/tables/Table.vue'
  import Paginaction from './../../public/components/paging/pagination.vue'
  import { mapGetters } from 'vuex'
  import datepicker from 'vue-date-picker'
  import Vodal from 'vodal'
  import Notification from './../../public/components/propup/toast/Notification.vue'
  export default {
    name: 'Ceshi',
    mounted () {
      let [a, b, c] = [1, 2, 3]
      console.log(`a: ${a}`)
      console.log(`b: ${b}`)
      console.log(`c: ${c}`)
      let btn = [
        {
          id: 1,
          name: '编辑',
          class: 'btn-primary',
          callback: this.edits
        },
        {
          id: 2,
          name: '修改',
          class: 'btn-info',
          callback: this.edits
        },
        {
          id: 3,
          name: '删除',
          class: 'btn-danger',
          callback: this.del
        }
      ]
      this.headerList = [{name: '产品名称', isStar: true}, {name: '产品名称'}, {name: '产品名称'}, {name: '产品名称'}, {name: '产品名称'}, {name: '产品名称'}, {name: '产品名称'}, {name: '操作'}]
      this.bodyList = [
        {name: 'c2', cate: 'c3', tdata4: 'c4', tdata5: '【测试标题1】&#10; 【测试标题2】【测试标题1】', tdata6: 'c6', tdata7: 'c7', tdata8: 'c8', tdata9: {str: btn, isBtn: true}},
        {name: 'c2', cate: 'c3', tdata4: 'c4', tdata5: 'c5', tdata6: 'c6', tdata7: 'c7', tdata8: 'c8', tdata9: {str: btn, isBtn: true}}
      ]
    },
    data () {
      return {
        msg: '123',
        headerList: [],
        bodyList: [],
        total: 108,
        display: 10,
        current: 1,
        username: '',
        phone: '',
        numeric: '',
        platenumber: '',
        car: {
          brand: '苏A88888',
          modules: '奥迪R8',
          startTimer: '2017-5-17',
          endTimer: '2017-5-20',
          identity: '55757676754434'
        },
        show: false,
        btnShow: false,
        showNotification: false,
        options: {},
        btns: [
          {
            content: 'success',
            options: {
              autoClose: false,
              content: 'Uhh...it tastes yummy!'
            }
          },
          {
            content: 'warning',
            options: {
              autoClose: false,
              backgroundColor: '#fbff7c',
              textColor: '#92253f',
              content: 'You can also customerize the background color and text color.'}
          },
          {
            content: 'error',
            options: {
              autoClose: true,
              backgroundColor: '#fc5050',
              content: 'Yummy notie can be closed automatically.'
            }
          },
          {
            content: 'info',
            options: {
              autoClose: true,
              showTime: 5000,
              backgroundColor: '#769FCD',
              content: 'There is an optional countdown bar for the auto close mode.',
              countdownBar: true,
              barColor: '#415F77'
            }
          },
          {
            content: 'flexible',
            options: {
              backgroundColor: 'rgba(6,45,146,.6)',
              content: '<P><span style="font-family: anana;font-size: 1.5rem">Yummy notie</span> is extremely flexible! You can use HTML to make any kind of notification.<br><i><a href="https://github.com/Yuyz0112/vue-notie">More information.</a></i></P>',
              textColor: '#03D6D2'
            }
          }
        ],
        animation: '',
        types: ['zoom']
      }
    },
    computed: {
      ...mapGetters({
        curIdx: 'getCurrentIdx'
      })
    },
    methods: {
      btnArray (arr) {
        let str = ''
        for (let i in arr) {
          let btns = '<button style="margin: 0 5px" class="btn ' + arr[i].color + '"> ' + arr[i].name + ' </button>'
          str += btns
        }
        return str
      },
      edits (id) {
        alert('edit' + id)
      },
      del (id) {
        alert('del' + id)
      },
      validateBeforeSubmit () {
        this.$validator.validateAll().then(() => {
          alert('From Submitted!')
        }).catch(() => {
          alert('Correct them errors!')
        })
      },
      onStartChange (val) {
        this.car.startTimer = val
      },
      onEndChange (val) {
        this.car.endTimer = val
      },
      notice (options) {
        this.showNotification = true
        this.options = options
      },
      delay () {
        return `
                animationDelay: ${1 * 100}ms;
                WebkitAnimationDelay: ${1 * 100}ms;
            `
      },
      onShow () {
        this.animation = 'zoom'
        this.btnShow = true
      }
    },
    components: {
      Tables,
      Paginaction,
      datepicker,
      Vodal,
      Notification
    },
    watch: {
      current: function (newval, oldval) {
        console.log('current:', newval)
      },
      display: function (newval, oldval) {
        if (newval !== oldval) {
          console.log('display:', newval)
          console.log('current', this.current)
        }
      }
    }
  }
</script>
