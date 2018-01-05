<template>
  <div class="main-container">
    <div class="bs-callout">
      <div class="bs-callout-primary"></div>
      <div class="bs-callout-title">我的消息 <span class="alert-warning">(温馨提示：此处只展示近30天的消息)</span></div>
    </div>
    <div class="btn-group btn-group-justified" role="group">
      <div class="btn-group" role="group">
        <button type="button" @click="checkGood(1)" class="btn active" :class="goodType === 1 ? 'btn-primary' : 'btn-default'">未读消息</button>
      </div>
      <div class="btn-group" role="group">
        <button type="button" @click="checkGood(2)" class="btn active" :class="goodType === 2 ? 'btn-primary' : 'btn-default'">已读消息</button>
      </div>
    </div>
    <div class="row center-block">
      <ul class="timeline" v-if="goodType == 1">
        <!-- timeline time label -->
        <li class="time-label">
          <span class="bg-green">{{Dates}}</span>
        </li>
        <li v-if="count == 0">
          <i class="fa fa-envelope bg-blue"></i>
          <div class="timeline-item">
            <h3 class="timeline-header">暂无任何消息～</h3>
          </div>
        </li>
        <template v-for="(item, index) in messages">
          <li v-if="count > 0 && item.isread == 1">
            <i class="fa fa-envelope bg-blue"></i>
            <div class="timeline-item">
            <span class="time">
              <i class="fa fa-remove" @click="remClk(item, index)"></i>
            </span>
            <span class="time">
              <i class="fa fa-clock-o"></i>
              &nbsp;{{item.createTime}}
            </span>
              <h3 class="timeline-header">订单消息</h3>
              <div class="timeline-body">
                {{item.content}}
              </div>
              <div class="timeline-footer text-right">
                <a href="javascript:;;" @click="infoClk(item, index)"  class="btn btn-primary btn-xs">
                  查看详情
                </a>
                <!--<router-link :to="{name: 'orderList'}"  class="btn btn-primary btn-xs">-->
                <!--查看详情-->
                <!--</router-link>-->
              </div>
            </div>
          </li>
        </template>
      </ul>
      <ul class="timeline" v-if="goodType == 2">
        <!-- timeline time label -->
        <li class="time-label">
          <span class="bg-green">{{Dates}}</span>
        </li>
        <template v-for="item in messages">
          <li v-if="item.isread != 1">
            <i class="fa fa-envelope bg-blue"></i>
            <div class="timeline-item">
            <span class="time">
              <i class="fa fa-remove" @click="remClk(item)"></i>
            </span>
            <span class="time">
              <i class="fa fa-clock-o"></i>
              &nbsp;{{item.createTime}}
            </span>
              <h3 class="timeline-header">订单消息</h3>
              <div class="timeline-body">
                {{item.content}}
              </div>
              <!--<div class="timeline-footer text-right">-->
                <!--&lt;!&ndash;<a href="javascript:;;" @click="infoClk(item)"  class="btn btn-primary btn-xs">&ndash;&gt;-->
                  <!--&lt;!&ndash;查看详情&ndash;&gt;-->
                <!--&lt;!&ndash;</a>&ndash;&gt;-->
                <!--&lt;!&ndash;<router-link :to="{name: 'orderList'}"  class="btn btn-primary btn-xs">&ndash;&gt;-->
                <!--&lt;!&ndash;查看详情&ndash;&gt;-->
                <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
              <!--</div>-->
            </div>
          </li>
        </template>
      </ul>
    </div>
    <notification
      :options.sync="options"
      :show.sync="showNotification"></notification>
    <vodal :show="btnShow" animation="zoom" @hide="btnShow = false" :width="width" :height="height">
      <div>提示</div>
      <h4 class="text-left">
        确定删除这条消息么？
      </h4>
      <div class="text-right" style="text-align: right;position: absolute;bottom: 30px;right: 30px;">
        <a @click="delClk" class="btn btn-default">确定</a>
        <button @click="hideModal" class="btn btn-primary">取消</button>
      </div>
    </vodal>
  </div>
</template>
<script>
  import info from './../../config/userInfo'
  import api from '../../api'
  import Vodal from 'vodal'
  import Notification from './../../public/components/propup/toast/Notification.vue'
  export default {
    name: 'Index',
    mounted () {
      let date = new Date()
      this.Dates = (date.getMonth()) + 1 + '月' + date.getDate() + '日'
      let _relf = this
      this.timer = setInterval(function () {
        _relf.count = info.count
        _relf.messages = info.messages
      }, 2000)
    },
    data () {
      return {
        goodType: 1,
        Dates: '',
        width: 300,
        height: 150,
        btnShow: false,
        options: {},
        delId: '',
        delIdx: '',
        showNotification: false,
        count: info.count,
        messages: info.messages
      }
    },
    methods: {
      checkGood (num) {
        this.goodType = num
      },
      remClk (Obj, index) {
        this.btnShow = true
        this.delId = Obj.id
        this.delIdx = index
      },
      infoClk (Obj, index) {
        let _relf = this
        api.request('post', 'part/readNews', {'id': Obj.id})
          .then(response => {
            if (Number(response.data.code) === 0) {
              _relf.$router.push({path: '/orderList'})
            } else if (Number(response.data.code) === 401) {
              _relf.$router.push('login')
            }
          }).catch((err) => {
            console.err(err)
          })
      },
      hideModal () {
        this.btnShow = false
        this.delId = this.delIdx = ''
      },
      delClk () {
        let _relf = this
        api.request('post', 'part/deleteNews', {'id': this.delId})
          .then(response => {
            if (Number(response.data.code) === 0) {
              _relf.messages.splice(_relf.delIdx, 1)
              _relf.btnShow = false
              _relf.showNotification = true
              _relf.options = {
                autoClose: true,
                showTime: 2000,
                backgroundColor: '#769FCD',
                content: '删除成功！',
                countdownBar: true,
                barColor: '#415F77'
              }
              if (_relf.messages.length <= 0) {
                _relf.count = 0
              }
            } else if (Number(response.data.code) === 401) {
              _relf.$router.push('login')
            }
          }).catch((err) => {
            console.err(err)
          })
      }
    },
    components: {
      Vodal,
      Notification
    },
    watch: {
      'messages': (newval, oldval) => {
        if (newval !== oldval) {
          this.count = info.count
          this.messages = newval
          console.log('info.message:', newval)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '/static/css/common.css';
  @import '/static/css/rotate.css';
</style>
