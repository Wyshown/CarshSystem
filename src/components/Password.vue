<template>
  <div class="container container-table bg-container">
    <div class="row vertical-10p">
      <div class="container">
        <img src="/static/img/logo.png" class="center-block logo">
        <div class="text-center col-md-4 col-sm-offset-4">
          <!-- login form -->
          <form class="ui form loginForm"  @submit.prevent="checkCreds">

            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input style="display:none" class="form-control">
              <input autocomplete="off" class="form-control" name="passwordOld" placeholder="请输入旧密码" type="password" v-model="passwordOld">
            </div>

            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input style="display:none">
              <input autocomplete="off" class="form-control" name="passwordNew" placeholder="请输入新密码" type="password" v-model="passwordNew">
            </div>
            <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">确定</button>
          </form>

          <!-- errors -->
          <notification
            :options.sync="options"
            :show.sync="showNotification"></notification>
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
    name: 'Password',
    data (router) {
      return {
        section: 'Password',
        loading: '',
        passwordOld: '',
        passwordNew: '',
        options: {},
        showNotification: false,
        userId: localStorage.getItem('userId')
      }
    },
    methods: {
      checkCreds () {
        const {passwordOld, passwordNew, userId} = this
        if (passwordOld === '') {
          this.options = {
            autoClose: false,
            backgroundColor: 'red',
            textColor: 'white',
            content: '请输入旧密码'
          }
          this.showNotification = true
          return
        }
        if (passwordNew === '') {
          this.options = {
            autoClose: false,
            backgroundColor: 'red',
            textColor: 'white',
            content: '请输入新密码'
          }
          this.showNotification = true
          return
        }
        this.toggleLoading()
        this.$store.commit('TOGGLE_LOADING')
        /* Making API call to authenticate a user */
        api.requestJava('post', '/login/editPassWord', {userId: userId, oldpwd: passwordOld, newpwd: passwordNew})
          .then(response => {
            this.toggleLoading()
            let data = response.data
            if (data.code === 0) {
              this.logOut()
//              this.$router.push({path: '/'})
//              this.$router.push({path: '/ceshi'})
            } else {
              this.options = {
                autoClose: false,
                backgroundColor: 'red',
                textColor: 'white',
                content: data.desc
              }
              this.showNotification = true
            }
            console.log(response.data)
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
      logOut () {
        api.request('post', 'public/loginout')
          .then(response => {
            if (response.data.code === 0) {
              localStorage.removeItem('admin_name')
              localStorage.removeItem('shop_name')
              this.$router.push({path: '/login'})
            }
          })
          .catch(error => {
            console.log(error)
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
</style>
