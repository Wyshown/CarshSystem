<template>
  <ul class="sidebar-menu">
    <template v-for="sides in sidebars" v-if="sides.cash_display == 1">
      <!--<li class="header">{{sides.title}}</li>-->
      <li v-if="sides.name != 'Index'" class="treeview">
        <a href="#">
          <i v-if="sides.name == 'Configuration'" class="fa fa-cogs"></i>
          <i v-if="sides.name == 'Report'" class="fa fa-table"></i>
          <i v-if="sides.name == 'Goods'" class="fa fa-shopping-cart"></i>
          <i v-if="sides.name == 'Food'" class="fa fa-list-alt"></i>

          <span>{{sides.title}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left fa-fw pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <template v-for="side in sides.nextLevel">
            <li v-if="side.cash_display == 1">
              <router-link :to="{name: side.name}">
                <i class="fa"></i> {{side.title}}
              </router-link>
            </li>
          </template>
        </ul>
      </li>
      <li v-if="sides.name == 'Index'" class="active pageLink">
        <router-link :to="{name: 'Index', params: {}}"><i class="fa fa-home"></i>
          <span class="page">{{sides.title}}</span>
        </router-link>
      </li>
    </template>
  </ul>
</template>
<script type="text/javascript">
  import api from './../api/index'
//  import config from './../config'
//  import info from './../config/userInfo'
//  import axios from 'axios'
  export default {
    name: 'SidebarName',
    mounted () {
      this.init()
    },
    data () {
      return {
        sidebars: [],
        timer: null
      }
    },
    methods: {
      init () {
        let _relf = this
        api.requestJava('post', '/rolePermitDao/findRolePermitAndSubPermitByRoleNum', {'roleNum': '11'})
          .then(response => {
            if (Number(response.data.code) === 0) {
              _relf.sidebars = response.data.data
            } else if (Number(response.data.code) === 401) {
              _relf.$router.push('login')
            }
          }).catch((err) => {
            console.err(err)
          })
      },
      toggleMenu (event) {
        // remove active from li
        var active = document.querySelector('li.pageLink.active')

        if (active) {
          active.classList.remove('active')
        }
        // window.$('li.pageLink.active').removeClass('active')
        // Add it to the item that was clicked
        event.toElement.parentElement.className = 'pageLink active'
      }
    }
  }
</script>
<style>
  /* override default */
  .sidebar-menu > li > a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active > a > .fa-angle-left, .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
