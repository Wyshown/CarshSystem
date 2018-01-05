<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
      <a href="/" class="logo">
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini">
          <img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive center-block">
        </span>
        <!-- logo for regular state and mobile devices -->
        <div class="logo-lg">
          <img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive">
          <span>{{shop_name}}</span>
        </div>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <!--<div class="navbar-custom-menu">-->
        <!--<ul class="nav navbar-nav">-->
        <!--<li v-on:click="logOut()" class="dropdown messages-menu">-->
        <!--<a href="javascript:;;">-->
        <!--<i class="fa fa-power-off"></i> 注销-->
        <!--</a>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="navbar-custom-menu">-->
        <!--<ul class="nav navbar-nav">-->
        <!--<li v-on:click="goPwd()" class="dropdown messages-menu">-->
        <!--<a href="javascript:;;">-->
        <!--<i class="fa fa-lock"></i> 修改密码-->
        <!--</a>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->

        <!-- User Info -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">
              <router-link :to="{name: 'Message'}">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">{{count}}</span>
              </router-link>
            </li>
            <!--<li class="dropdown messages-menu">-->
            <!--<a href="javascript:;;">-->
            <!--<i class="fa fa-user"></i> {{admin_name}}-->
            <!--</a>-->
            <!--</li>-->
            <li role="presentation" class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                 aria-expanded="false">
                <i class="fa fa-user"></i> {{admin_name}}<span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li v-on:click="goPwd()" class="dropdown messages-menu">
                  <a href="javascript:;;">
                    <i class="fa fa-lock"></i> 修改密码
                  </a>
                </li>
                <li v-on:click="logOut()" class="dropdown messages-menu">
                  <a href="javascript:;;">
                    <i class="fa fa-power-off"></i> 注销
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :display-name="demo.displayName"
             :picture-url="demo.avatar"/>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{ $route.meta.description }}
          <!--<small>{{ $route.meta.description }}</small>-->
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Home</a></li>
          <li class="active">{{$route.meta.description}}</li>
        </ol>
      </section>

      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}} <a href="javascript:;">韩武洽</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script type="text/ecmascript-6">
  import faker from 'faker'
  import {mapState} from 'vuex'
  import config from '../config'
  import info from './../config/userInfo'
  import Sidebar from './Sidebar'
  import 'hideseek'
  import api from '../api'

  export default {
    name: 'Dash',
    mounted () {
      let _relf = this
      this.timer = setInterval(function () {
        _relf.count = info.count
      }, 2000)
    },
    components: {
      Sidebar
    },
    data () {
      return {
        // section: 'Dash',
        year: new Date().getFullYear(),
        classes: {
          fixed_layout: config.fixedLayout,
          hide_logo: config.hideLogoOnMobile
        },
        error: '',
        shop_name: localStorage.getItem('shop_name'),
        admin_name: localStorage.getItem('admin_name'),
        count: info.count
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      demo () {
        return {
          displayName: faker.name.findName(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          randomCard: faker.helpers.createCard()
        }
      }
    },
    methods: {
      changeloading () {
        this.$store.commit('TOGGLE_SEARCHING')
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
      goPwd () {
        this.$router.push({path: '/pwd'})
      }
    }
  }
</script>

<style lang="scss" type="text/less" rel="stylesheet/less" scoped>
  .wrapper.fixed_layout {
    .main-header {
      position: fixed;
      width: 100%;
    }

    .content-wrapper {
      padding-top: 50px;
    }

    .main-sidebar {
      position: fixed;
      height: 100vh;
    }
  }

  .wrapper.hide_logo {
    @media (max-width: 767px) {
      .main-header .logo {
        display: none;
      }
    }
    img {
      display: none;
    }
  }

  .logo-mini, .logo-lg {
    text-align: left;

    img {
      padding: .4em;
    }
  }

  .logo-lg {
    img {
      display: -webkit-inline-box;
      width: 25%;
    }
  }

  .user-panel {
    height: 4em;
  }

  hr.visible-xs-block {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.17);
    height: 1px;
    border-color: transparent;
  }
</style>
