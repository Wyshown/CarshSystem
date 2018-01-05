<template>
  <div class="container container-table bg-container">
      <div class="row vertical-10p">
        <div class="container">
          <img src="static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input class="form-control" name="username" placeholder="请输入手机号或用户名" type="text" v-model="username">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="请输入密码" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">登录</button>
            </form>
            <notification
              :options.sync="options"
              :show.sync="showNotification"></notification>
            <!-- errors -->
            <!--<div v-if=response class="text-red tip-margin-top"><p>{{response}}</p></div>-->
          </div>
        </div>
      </div>

  </div>
</template>

<script type="text/ecmascript-6">
import api from '../api'
import Notification from './../public/components/propup/toast/Notification.vue'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
//      username: 'gchcash',
//      username: '15358309720',
      username: '',
      password: '',
      options: {},
      showNotification: false
    }
  },
  methods: {
    checkCreds () {
      const {username, password} = this
      if (username === '') {
        this.options = {
          autoClose: false,
          backgroundColor: 'red',
          textColor: 'white',
          content: '请输入手机号或用户名'
        }
        this.showNotification = true
        return
      }
      if (password === '') {
        this.options = {
          autoClose: false,
          backgroundColor: 'red',
          textColor: 'white',
          content: '请输入密码'
        }
        this.showNotification = true
        return
      }
      this.toggleLoading()
      this.$store.commit('TOGGLE_LOADING')
      /* Making API call to authenticate a user */
      api.requestJava('post', '/login/doLogIn', {loginName: username, loginPwd: password})
      .then(response => {
        this.toggleLoading()
        let data = response.data
        if (data.code === 0) {
          console.log('data.data.userId: ', data.data.userId)
          localStorage.setItem('userId', data.data.userId)
          localStorage.setItem('admin_name', data.data.userName)
          localStorage.setItem('shop_name', 'CKD饮食管理平台')
          this.$router.push({path: '/'})
//          this.$router.push({path: '/ceshi'})
        } else {
          this.options = {
            autoClose: false,
            backgroundColor: 'red',
            textColor: 'white',
            content: data.desc
          }
          this.showNotification = true
        }
      })
      .catch(error => {
        this.$store.commit('TOGGLE_LOADING')
        this.options = {
          autoClose: false,
          backgroundColor: 'red',
          textColor: 'white',
          content: '服务器异常'
        }
        this.showNotification = true
        console.log(error)
        this.toggleLoading()
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    }
  },
  components: {
    Notification
  }
}
</script>

<style scoped>
.container-table, body, html {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
    position: absolute;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
  .bg-container {
    width: 100%;
    height: 100%
  }
  .tip-margin-top {
    margin-top: 1rem !important;

  }
</style>
