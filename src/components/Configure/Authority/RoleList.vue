<script type="text/javascript">
  import Tables from './../../../public/components/tables/Table.vue'
  import Notification from './../../../public/components/propup/toast/Notification.vue'
  import Vodal from 'vodal'
  import api from './../../../api/index'
  export default {
    name: 'Department',
    mounted () {
      this.headerList = [{name: '序号'}, {name: '角色名称'}, {name: '角色备注'}, {name: '操作'}]
      this._getRoleList()
//      this._getAuthList()
    },
    data () {
      return {
        msg: '123',
        headerList: [],              /* table的头部 */
        bodyList: [],                /* table的body部分 */
        authList: [],                /* 权限列表 */
        isLoading: false,            /* 是否加载 */
        show: false,
        modShow: false,              /* 修改弹窗 */
        addShow: false,              /* 新增弹窗 */
        delShow: false,              /* 删除弹窗 */
        allotShow: false,            /* 分配权限弹窗 */
        itemId: '',                  /* 要进行操作的id */
        modItemName: '',             /* 要修改的角色名称 */
        modItemRemark: '',           /* 要修改的角色备注 */
        addItemName: '',             /* 要新增的角色名称 */
        addItemRemark: '',           /* 要修改的角色备注 */
        allAuthList: [],             /* 全部的权限列表 */
        selAuthList: [],             /* 被选中的权限列表 */
        submitAuth: '',
        titIdx: [],                  /* 被选中的头部的索引 */
        newArr: [],                  /* 被选中的头部的数组 */
        roleIdAuthList: [],          /* 根据roleId请求的某个角色的权限列表 */
        showNotification: false,
        curIdx: '',
        options: {},
        btns: [
          {
            content: 'success',
            options: {
              autoClose: true,
              content: ''
            }
          },
          {
            content: 'error',
            options: {
              autoClose: true,
              backgroundColor: '#fc5050',
              content: ''
            }
          }
        ],
        animation: '',
        types: ['zoom']
      }
    },
    methods: {
      edits () {
        console.log(1)
      },
      /**
       *  mod
       * @param id 表示编辑此条信息的id
       * 编辑数据
       *
       */
      mod (id) {
        let that = this
        that.modShow = true
        that.itemId = id
        that.modItemName = ''
        that.modItemRemark = ''
      },
      _modSave (num) {
        let that = this
        that.$validator.validateAll(num).then(() => {
          that.modShow = false
          let url = 'configuration/editRole'
          let _params = {
            'id': that.itemId,
            'roleName': that.modItemName,
            'remark': that.modItemRemark
          }

          api.request('post', url, _params)
            .then(response => {
              that.isLoading = false
              if (Number(response.data.code) === 0) {
                that.showNotification = true
                that.btns[0].options.content = response.data.desc
                that.options = that.btns[0].options
                that._getRoleList()
              } else {
                that.showNotification = true
                that.btns[1].options.content = response.data.desc
                that.options = that.btns[1].options
              }
            }).catch(error => {
              console.log(error)
            })
        }).catch(() => {
          that.showNotification = true
          that.btns[1].options.content = '请检验输入是否正确'
          that.options = that.btns[1].options
        })
      },
      /**
       *  allot
       * @param id 表示分配此条信息的id
       * 分配权限
       *
       */
      allot (id) {
        let that = this
        that.allotShow = true
        that.itemId = id
        that._getAuthListByRoleId()
      },
      _allotSave () {
//        alert(1)
      },
      /**
       *  del
       * @param id 表示删除此条信息的id
       * 删除数据
       *
       */
      del (id) {
        let that = this
        that.delShow = true
        that.itemId = id
      },
      _delSave () {
        let that = this
        that.delShow = false
        console.log('删除确定里的id', that.itemId)
        let url = 'configuration/delRole'
        let _params = {
          'id': that.itemId
        }

        api.request('post', url, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              that.showNotification = true
              that.btns[0].options.content = response.data.desc
              that.options = that.btns[0].options
              that._getRoleList()
            } else {
              that.showNotification = true
              that.btns[1].options.content = response.data.desc
              that.options = that.btns[1].options
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       *  add
       */
      add () {
        let that = this
        that.addShow = true
        that.addItemName = ''
        that.addItemRemark = ''
      },
      _addSave (num) {
        let that = this
        that.$validator.validateAll(num).then(() => {
          let url = 'configuration/addRole'
          let _params = {
            'roleName': that.addItemName,
            'remark': that.addItemRemark
          }

          api.request('post', url, _params)
            .then(response => {
              that.addShow = false
              that.isLoading = false
              if (Number(response.data.code) === 0) {
                that.showNotification = true
                that.btns[0].options.content = response.data.desc
                that.options = that.btns[0].options
                that._getRoleList()
              } else {
                that.showNotification = true
                that.btns[1].options.content = response.data.desc
                that.options = that.btns[1].options
              }
            }).catch(error => {
              console.log(error)
            })
        }).catch(() => {
          that.showNotification = true
          that.btns[1].options.content = '请检验输入是否正确'
          that.options = that.btns[1].options
        })
      },
      /**
       * 获取角色列表 _getRoleList
       *
       * 无参数
       *
       */
      _getRoleList () {
        let that = this
        that.isLoading = true
        that.bodyList = []
        let listUrl = 'configuration/getRoleList'
        let _params = {}
        console.log('_params', _params)

        api.request('post', listUrl, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              let info = response.data.data
              for (var i = 0; i <= info.length; i++) {
                let subList = {}
                subList.name = i + 1
                subList.cate = info[i].name
                subList.tdata4 = info[i].remark
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
      /**
       * 获取全部的权限列表 _getAuthList
       *
       * 无参数
       *
       */
      _getAuthList () {
        let that = this
        let listUrl = 'configuration/getAuthList'
        let _params = {}
        console.log('_params', _params)

        api.request('post', listUrl, _params)
          .then(response => {
            if (Number(response.data.code) === 0) {
              that.allAuthList = response.data.data
              console.log('请求权限列表')
              console.log(that.allAuthList)
            } else {
              that.allAuthList = []
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       * 根据角色的id来获得权限 _getAuthListByRoleId
       *
       * 无参数
       *
       */
      _getAuthListByRoleId () {
        let that = this
        that.isLoading = true
        that.selAuthList = []
        let listUrl = 'configuration/getAuthListByRoleId'
        let _params = {
          'roleId': that.itemId
        }
        console.log('根据角色的id来获得权限_params', _params)

        api.request('post', listUrl, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              that.allAuthList = response.data.data
              for (let i = 0; i < that.allAuthList.length; i++) {
                console.log('i:', that.allAuthList[i])
                for (let j = 0; j < that.allAuthList[i].nextLevel.length; j++) {
                  if (that.allAuthList[i].nextLevel[j].access === 1) {
                    let subList = {}
                    subList.nodeId = that.allAuthList[i].nextLevel[j].id
                    subList.level = that.allAuthList[i].nextLevel[j].level
                    that.selAuthList.push(subList)
                  }
                }
              }
            } else {
              that.allAuthList = []
            }
          }).catch(error => {
            that.isLoading = false
            console.log(error)
          })
      },
      /**
       * 点击全选 _selAllAuth
       *
       * 无参数
       *
       */
      _selAllAuth (titSel) {
        titSel.access = 1
        for (var i = 0; i < titSel.nextLevel.length; i++) {
          titSel.nextLevel[i].access = 1
        }
      },
      /**
       * 点击取消全选 _cancelAllAuth
       *
       * 无参数
       *
       */
      _cancelAllAuth (titSel) {
        titSel.access = 0
        for (var i = 0; i < titSel.nextLevel.length; i++) {
          titSel.nextLevel[i].access = 0
        }
      },
      /**
       * 点击选择此项权限 _selAuth
       *
       * 无参数
       *
       */
      _selAuth (sigSel) {
        console.log('sigSel是===', sigSel)
        if (sigSel.access === 1) {
          sigSel.access = 0
        } else {
          sigSel.access = 1
        }
      },
      /**
       * 添加角色权限 _addRoleAuth
       *
       * 无参数
       *
       */
      _addRoleAuth () {
        let that = this
        that.isLoading = true
        that.submitAuth = []
        that.titIdx = []
        that.newArr = []
        for (var i = 0; i < that.allAuthList.length; i++) {
          for (var j = 0; j < that.allAuthList[i].nextLevel.length; j++) {
            if (that.allAuthList[i].nextLevel[j].access === 1) {
              that.titIdx.push(i)
              that.submitAuth.push(
                {
                  nodeId: that.allAuthList[i].nextLevel[j].id,
                  level: that.allAuthList[i].nextLevel[j].level
                }
              )
            }
          }
        }
        that.newArr = [that.titIdx[0]]
        console.log('newArr是11：', that.newArr)
        if (that.titIdx[0] === undefined) {
          that.submitAuth = []
        } else {
          for (var k = 1; k < that.titIdx.length; k++) {
            if (that.titIdx.indexOf(that.titIdx[k]) === k) {
              that.newArr.push(that.titIdx[k])
            }
          }
          console.log('新的数组是：', that.newArr)
          console.log('that.newArr.length===', that.newArr.length)
          for (let m = 0; m < that.newArr.length; m++) {
            that.submitAuth.push(
              {
                nodeId: that.allAuthList[that.newArr[m]].id,
                level: that.allAuthList[that.newArr[m]].level
              }
            )
          }
          console.log('===最后的submitAuth===', that.submitAuth)
        }
        let listUrl = 'configuration/addRoleAuth'
        let _params = {
          'roleId': that.itemId,
          'node': that.submitAuth
        }
        console.log('添加角色权限_params', _params)

        api.request('post', listUrl, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              that.allotShow = false
              that.showNotification = true
              that.btns[0].options.content = response.data.desc
              that.options = that.btns[0].options
              that._getRoleList()
              that.submitAuth = []
            } else {
              that.showNotification = true
              that.btns[1].options.content = response.data.desc
              that.options = that.btns[1].options
            }
          }).catch(error => {
            that.isLoading = false
            console.log(error)
          })
        that.selAuthList = []
      }

    },
    components: {
      Tables,
      Vodal,
      Notification
    }
  }
</script>

<template>
  <div class="main-container">
    <h5 class="title-h4"><span class="zdy-span" @click="add"><i class="fa fa-plus"></i>&nbsp; 新增</span><p>角色配置</p></h5>
    <Tables :bodyList="bodyList" :headerList="headerList" :edit="edits" :btns="[{name:'编辑', callback: mod, class: 'btn-primary'}, {name: '分配权限', callback: allot, class: 'btn-info'}, {name: '删除', callback: del, class: 'btn-danger'}]" />
    <!--新增角色-->
    <Vodal
      measure="em"
      animation="animation"
      :show="addShow"
      :width="30"
      :height="17"
      :duration="301"
      @hide="addShow = false"
    >
      <form class="form-horizontal" @submit.prevent="_addSave('form-1')"  data-vv-scope="form-1">
        <div class="header">新增角色</div>
        <div class="body">
          <div class="form-group" :class="{'has-error':errors.has('form-1.addItemName')}">
            <div>
              <label for="addItemName" class="col-sm-3 control-label">角色名称&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="addItemName" name="addItemName" placeholder="请输入角色名称" v-model="addItemName" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.addItemName')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入角色名称
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="addItemRemark" class="col-sm-3 control-label">角色备注&nbsp;&nbsp;</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="addItemRemark" placeholder="请输入角色备注" v-model="addItemRemark">
            </div>
          </div>
        </div>
        <button class="vodal-confirm-btn" type="submit">确定</button>
      </form>
        <button class="vodal-cancel-btn" @click="addShow = false">取消</button>
    </Vodal>
    <!--修改角色-->
    <Vodal
      measure="em"
      animation="animation"
      :show="modShow"
      :width="30"
      :height="17"
      :duration="301"
      @hide="modShow = false"
    >
      <form class="form-horizontal" @submit.prevent="_modSave('form-2')"  data-vv-scope="form-2">
        <div class="header">修改角色</div>
        <div class="body">
          <div class="form-group" :class="{'has-error':errors.has('form-2.modItemName')}">
            <div>
              <label for="modItemName" class="col-sm-3 control-label">角色名称&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="modItemName" name="modItemName" placeholder="请输入角色名称" v-model="modItemName" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-2.modItemName')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入角色名称
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="modItemRemark" class="col-sm-3 control-label">角色备注&nbsp;&nbsp;</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="modItemRemark" placeholder="请输入角色备注" v-model="modItemRemark">
            </div>
          </div>
        </div>
        <button class="vodal-confirm-btn" type="submit">确定</button>
      </form>
      <button class="vodal-cancel-btn" @click="modShow = false">取消</button>
    </Vodal>
    <!--删除角色-->
    <Vodal
      measure="em"
      animation="animation"
      :show="delShow"
      :width="30"
      :height="12"
      :duration="301"
      @hide="delShow = false"
    >
      <div class="header">删除</div>
      <div class="body" style="text-align: center; margin-top: 15px">确定要删除吗?</div>
      <button class="vodal-confirm-btn" @click="_delSave()">确定</button>
      <button class="vodal-cancel-btn" @click="delShow = false">取消</button>
    </Vodal>
    <!--权限分配-->
    <Vodal
      measure="em"
      animation="animation"
      :show="allotShow"
      :width="60"
      :height="40"
      :duration="301"
      @hide="allotShow = false"
    >
      <div class="header">分配权限</div>
      <div class="body" style="overflow-y: auto; height: 32em">
        <div style="margin-bottom: 20px" v-for="(items, index) in allAuthList">
          <h6 style="background-color: #ccc;padding: 10px;" :id="items.id">
            <span style="float: right;color: #0c84e4;cursor: pointer" @click="_cancelAllAuth(items)">取消全选</span>
            <span style="float: right;color: #0c84e4;cursor: pointer;margin-right: 30px" @click="_selAllAuth(items)">全选</span>
            {{items.title}}
          </h6>
          <label class="checkbox-inline" v-for="(item, key) in items.nextLevel" v-bind:key="item.id">
            <input type="checkbox" :id="item.id" :level="item.level" :checked="item.access == 1 ? true : false" @click="_selAuth(item)"> {{item.title}}
          </label>
        </div>
      </div>
      <button class="vodal-confirm-btn" @click="_addRoleAuth()">确定</button>
      <button class="vodal-cancel-btn" @click="allotShow = false">取消</button>
    </Vodal>
    <!--提示信息-->
    <notification
      :options.sync="options"
      :show.sync="showNotification">
    </notification>
  </div>
</template>

<style lang="scss" scoped>
  .main-container{
    padding:20px;
  }
  table{
    background-color: #FFF!important;
  }
  .title-h4{
    border-bottom: 1px solid #cccccc;
    position: relative;
    margin: 15px 0;
  }
  .title-h4 p{
    border-left: 2px solid #2194fe;
    padding-left: 8px;
    margin-bottom: 10px;
  }
  .zdy-span{
    position: absolute;
    top: 0;
    right: 0;
    color: #2194fe;
    cursor: pointer;
  }
  .jifen-input-number {
    position: relative;
    float: left;
    width: 110px;
  }
  .jifen-card {
    float: left;
    width: 40px;
    line-height: 34px;
    text-align: center;
    font-size: 12px;
  }
  .jifen-del {
    height: auto;
    width: 30px;
    line-height: 32px;
    top: 0;
    left: 0;
    text-align: center;
    color: #97a8be;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    border: 1px solid #ccc;
    border-right: none;
  }
  .jifen-add {
    height: auto;
    width: 30px;
    line-height: 32px;
    top: 0;
    right: 0;
    text-align: center;
    color: #97a8be;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    border: 1px solid #ccc;
    border-left: none;
  }
  .jifen-input {
    /*padding: 0 30px;*/
    padding: 0 10px;
  }
  .is-disabled {
    color: #d1dbe5;
    cursor: not-allowed;
  }
  /* -- title -- */
  .header {
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9e9e9;
    text-align: center;
  }
  /* -- body -- */
  .body {
    padding-top: 15px;
  }
  /* -- button -- */
  .vodal-cancel-btn, .vodal-confirm-btn {
    position: absolute;
    font: inherit;
    bottom: 16px;
    width: 70px;
    padding: 4px 15px;
    border-radius: 3px;
    transition: background .2s;
    border: 1px solid #03a9f4;
  }
  .vodal-confirm-btn {
    color: #fff;
    right: 102px;
    background: #03a9f4;
  }
  .vodal-confirm-btn:hover {
    background: #0098e3;
  }
  .vodal-cancel-btn {
    color: #03a9f4;
    right: 16px;
    background: #fff;
  }
  .vodal-cancel-btn:hover {
    background: #fafafa;
  }
  .vodal-cancel-btn:focus, .vodal-confirm-btn:focus {
    outline: none;
  }
  .vodal-confirm-btn:active {
    background: #0087d2;
  }
  .vodal-cancel-btn:active {
    background: #fafafa;
    box-shadow: inset 1px 1px 1px rgba(0,0,0,.2),0 0 1px transparent;
  }
  .facolor {
    color: #c72e29;
    font-size: 5px;
  }

</style>
