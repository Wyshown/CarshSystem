<template>
  <div class="main-container">
    <h5 class="title-h4"><span class="zdy-span" @click="add"><i class="fa fa-plus"></i>&nbsp; 新增</span>
      <p>食物列表</p></h5>
    <div class="input-group">
      <input type="text" class="form-control setHeight" placeholder="请输入食物名称" v-model="searchFoodName">
      <span class="input-group-btn">
              <button class="btn btn-primary" type="button" @click="searchFoodNameFunc()">搜索</button>
          </span>
    </div>
    <div class="marginTop">
      <!--<Tables :bodyList="bodyList" :headerList="headerList" :edit="mod"-->
      <Tables :bodyList="bodyList" :headerList="headerList"
      />
      <!--:btns="[{name:'编辑', callback: edit, class: 'btn-primary'}, {name: '删除', callback: del, class: 'btn-danger'}]"/>-->
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
      this.headerList = [{name: '顺序'}, {name: '图片'}, {name: '食物大类'}, {name: '食物分类'}, {name: '食物中文名'}, {name: '食物英文名'}, {name: '食物别名'}, {name: '食物代码'}, {name: '操作'}]
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
        searchFoodName: '', //
        isLoading: false
      }
    },
    methods: {
      _getFoodList () {
        let that = this
        that.isLoading = true
        that.bodyList = []
        let listUrl = '/food/findAllFoodByQuery'
        let _params = {
//          'foodType': 'group',
          'foodName': that.searchFoodName,
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
                let subList = {}
                subList.no = i + 1
                subList.todata = {}
                subList.todata.str = '<div style="text-align: center"><img width="32px" height="32px"  src="' + info[i].thumbImageUrl + '"/></div>'
                subList.todata.isHtml = true

                // 食物大类
                if (info[i].foodType === 'group') {
                  subList.foodType = '食物分类'
                } else if (info[i].foodType === 'brand') {
                  subList.foodType = '热门品牌'
                } else if (info[i].foodType === 'restaurant') {
                  subList.foodType = '连锁餐饮'
                }
                // 食物分类
                subList.foodKindName = info[i].foodKindName
                // 食物中文名
                subList.foodCnName = info[i].foodCnName
                // 食物英文名
                subList.foodEnName = info[i].foodEnName

                // 食物代码
                subList.foodAlias = info[i].foodAlias
                // 食物别名
                subList.foodCode = info[i].foodCode

                subList.tdata13 = {str: that.returnBtnArr(info[i].id, info[i].foodKindId, info[i].foodType), isBtn: true}
                console.log('subList:', subList)
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
      searchFoodNameFunc () {
        console.log('11111111111111han')
        var that = this
        that.total = 0
        that.display = 10
        that.current = 1
        that._getFoodList()
      },
      add () {
        console.log('添加')
        this.$router.push({name: 'foodDetail', params: {type: 'add', 'id': '0'}})
      },
      edit (item) {
        console.log('编111111111111han1111111111s辑')
        console.log(item.str[0].foodType)
        this.$router.push({name: 'foodDetail', params: {type: 'edit', id: item.str[0].id, foodKindId: item.str[0].foodKindId, foodType: item.str[0].foodType}})
      },
      del () {
        alert('dele')
        console.log('11111111212111111han')
      },
      returnBtnArr (id, foodKindId, foodType) {
        return [
          {
            id: id,
            foodKindId: foodKindId,
            foodType: foodType,
            name: '编辑',
            class: 'btn-primary',
            callback: this.edit
          },
          {
            id: id,
            foodKindId: foodKindId,
            foodType: foodType,
            name: '删除',
            class: 'btn-danger',
            callback: this.del
          }
        ]
      }
    },
    watch: {
      current: function (newval, oldval) {
        if (newval !== oldval) {
          this.current = newval
          if (!this.isLoading) {
            this._getFoodList()
          }
        }
      },
      display: function (newval, oldval) {
        if (newval !== oldval) {
          this.display = newval
          if (!this.isLoading) {
            this._getFoodList()
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
