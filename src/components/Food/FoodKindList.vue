<template>
  <div class="main-container">
    <h5 class="title-h4"><span class="zdy-span" @click="add"><i class="fa fa-plus"></i>&nbsp; 新增</span>
      <p>食物分类</p></h5>
    <div class="input-group">
      <input type="text" class="form-control setHeight" placeholder="请输入食物分类名称" v-model="searchFoodKindName">
      <span class="input-group-btn">
              <button class="btn btn-primary" type="button" @click="searchFoodKindNameFunc()">搜索</button>
          </span>
    </div>
    <div class="marginTop">
      <!--<Tables :bodyList="bodyList" :headerList="headerList" :edit="mod"-->
      <Tables :bodyList="bodyList" :headerList="headerList"
              :btns="[{name:'编辑', callback: edit, class: 'btn-primary'}, {name: '删除', callback: del, class: 'btn-danger'}]"/>
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
      this._getFoodKindList()
    },
    data () {
      return {
        msg: '123',
        headerList: [],
        bodyList: [],
        total: 0,
        display: 10,
        current: 1,
        searchFoodKindName: '',
        isLoading: false
      }
    },
    methods: {
      _getFoodKindList () {
        let that = this
        that.isLoading = true
        that.bodyList = []
        let listUrl = '/foodKind/findAllFoodKindByFoodTypeAndName'
        let _params = {
//          'foodType': 'group',
          'foodKindName': that.searchFoodKindName,
          'page': that.current,
          'pagenum': that.display
        }
        console.log('_params', _params)

        api.requestJava('post', listUrl, _params)
          .then(response => {
            that.isLoading = false
            console.log('han------------------------')
            console.log(response.data)
            if (Number(response.data.code) === 0) {
              let info = response.data.data.data
              that.total = parseInt(response.data.data.count)
              for (var i = 0; i <= info.length; i++) {
                console.log('han: ', info[i])
                let subList = {}
                subList.no = i + 1
                subList.todata = {}
                subList.todata.str = '<div style="text-align: center"><img width="32px" height="32px"  src="' + info[i].imageUrl + '"/></div>'
                subList.todata.isHtml = true

                if (info[i].foodKind === 'group') {
                  subList.foodKind = '食物分类'
                } else if (info[i].foodKind === 'brand') {
                  subList.foodKind = '热门品牌'
                } else if (info[i].foodKind === 'restaurant') {
                  subList.foodKind = '连锁餐饮'
                } else {
                  subList.foodKind = '未知'
                }
                subList.foodKindName = info[i].foodKindName
                subList.description = info[i].description

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
      },
      add () {
//        console.log('')
        alert('添加')
//        this.$router.push({name: 'GoodsDetail', params: {type: 'add', 'id': '0'}})
      },
      edit (item) {
        alert('编辑')
//        console.log('编辑')
//        this.$router.push({name: 'GoodsDetail', params: {type: 'edit', id: item.str[0].id}})
      },
      del () {
        alert('删除')
      },
      searchFoodKindNameFunc () {
        var that = this
        that._getFoodKindList()
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
