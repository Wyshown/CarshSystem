<template>
  <div class="main-container">
    <!--<h5 class="title-h4"><span class="zdy-span" @click="add"><i class="fa fa-plus"></i>&nbsp; 新增</span>-->
    <h5 class="title-h4"><span class="zdy-span" ><i class="fa fa-plus"></i>&nbsp; 新增</span>
      <p>食物分类</p></h5>
    <div class="input-group">
      <!--<input type="text" class="form-control setHeight" placeholder="请输入食物分类名称" v-model="searchName">-->
      <input type="text" class="form-control setHeight" placeholder="请输入食物分类名称" >
      <span class="input-group-btn">
              <!--<button class="btn btn-primary" type="button" @click="searchStaff()">搜索</button>-->
              <button class="btn btn-primary" type="button">搜索</button>
          </span>
    </div>
    <div class="marginTop">
      <!--<Tables :bodyList="bodyList" :headerList="headerList" :edit="mod"-->
      <Tables :bodyList="bodyList" :headerList="headerList"
              :btns="[{name:'编辑', callback: mod, class: 'btn-primary'}, {name: '删除', callback: del, class: 'btn-danger'}]"/>
      <Paginaction :total="total" :display="display" :current="current"/>
    </div>
  </div>
</template>

<script type="text/javascript">
  import api from './../../api/index'
  import Tables from './../../public/components/tables/Table.vue'
  import Paginaction from './../../public/components/paging/pagination.vue'
  import Notification from './../../public/components/propup/toast/Notification.vue'

  export default {
    name: 'FoodKindList',
    mounted () {
      this.headerList = [{name: '顺序'}, {name: '图片'}, {name: '食物大类'}, {name: '食物名称'}, {name: '描述'}, {name: '操作'}]
      this._getFoodList()
    },
    data () {
      return {
        msg: '123',
        headerList: [],
        bodyList: [],
        total: 0,
        display: 10,
        current: 1,
        isLoading: false
      }
    },
    methods: {
      _getFoodKindList () {
        let that = this
        that.isLoading = true
        that.bodyList = []
        let listUrl = '/food/findAllFoodByQuery'
        let _params = {
//          'foodType': 'group',
//          'foodKindName': ''
          'page': that.current,
          'pagenum': that.display
        }
        console.log('_params', _params)

        api.requestJava('post', listUrl, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              let info = response.data.data.data
              that.total = parseInt(response.data.data.count)
              for (var i = 0; i <= info.length; i++) {
                console.log('han: ', 1111)
                let subList = {}
                subList.no = i + 1
//                subList.imageUrl = info[i].imageUrl
//                subList.imageUrl = 'http://s.boohee.cn/house/food_mid/mid_photo_201512613144756.jpg'
                subList.thumbImageUrl = info[i].thumbImageUrl
                subList.foodCnName = info[i].foodCnName
                subList.foodEnName = info[i].foodEnName
                subList.foodCode = info[i].foodCode

                subList.id = info[i].id
                that.bodyList.push(subList)
              }
            } else {
              that.bodyList = []
            }
          }).catch(error => {
            that.isLoading = false
            console.log(error)
          })
      }
    },
    watch: {
      current: function (newval, oldval) {
        if (newval !== oldval) {
          this.current = newval
          if (!this.isLoading) {
            this._getFoodKindList()
          }
        }
      },
      display: function (newval, oldval) {
        if (newval !== oldval) {
          this.display = newval
          if (!this.isLoading) {
            this._getFoodKindList()
          }
        }
      }
    },
    components: {
      Tables,
      Paginaction,
      Notification
    }
  }
</script>
