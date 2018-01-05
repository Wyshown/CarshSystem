<script type="text/javascript">
  import Tables from './../../../public/components/tables/Table.vue'
  import Paginaction from './../../../public/components/paging/pagination.vue'
  import Notification from './../../../public/components/propup/toast/Notification.vue'
  import Vodal from 'vodal'
  import datePicker from 'vue-date-picker'
  import api from './../../../api/index'
  export default {
    name: 'Staff',
    mounted () {
      this.headerList = [{name: '员工姓名'}, {name: '手机号码'}, {name: '登录账号'}, {name: '入职时间'}, {name: '所属角色'}, {name: '操作'}]
      this._getManagerList()
      this._getRoleList()
    },
    data () {
      return {
        msg: '123',
        headerList: [],
        bodyList: [],
        total: 0,
        display: 10,
        current: 1,
        isLoading: false,
        searchName: '',              /* 搜索员工的名字 */
        modShow: false,              /* 修改弹窗 */
        addShow: false,              /* 新增弹窗 */
        delShow: false,              /* 删除弹窗 */
        addItemName: '',             /* 新增员工的姓名 */
        addItemTel: '',              /* 新增员工的手机号 */
        addItemNum: '',              /* 新增员工的登录账号 */
        addItemPwd: '',              /* 新增员工的登录密码 */
        addItemDate: '',             /* 新增员工的入职日期 */
        addItemDep: '',              /* 新增员工的所属角色 */
        modItemName: '',             /* 修改员工的姓名 */
        modItemTel: '',              /* 修改员工的手机号 */
        modItemNum: '',              /* 修改员工的登录账号 */
        modItemPwd: '',              /* 修改员工的登录密码 */
        modItemDate: '',             /* 修改员工的入职日期 */
        modItemDep: '',              /* 修改员工的所属角色 */
        depList: [],                 /* 角色列表 */
        showNotification: false,
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
      onStartChange (val) {
        this.addItemDate = val
        console.log('选择日期之后===', this.addItemDate)
      },
      onEndChange (val) {
        this.modItemDate = val
        console.log('选择日期之后===', this.modItemDate)
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
        let listUrl = 'configuration/getManagerList'
        let _listParams = {
          'id': that.itemId,
          'name': '',
          'page': that.current,
          'pagenum': that.display
        }
        api.request('post', listUrl, _listParams)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              that.modItemName = response.data.data.info[0].name
              that.modItemTel = response.data.data.info[0].tel
              that.modItemPwd = response.data.data.info[0].pwd
              that.modItemDate = response.data.data.info[0].entrytime
              that.modItemDep = response.data.data.info[0].roleInfo[0].role_id
            } else {
              that.total = 0
              that.bodyList = []
            }
          }).catch(error => {
            that.isLoading = false
            console.log(error)
          })
      },
      _modSave (num) {
        let that = this
        that.$validator.validateAll(num).then(() => {
          let url = 'configuration/editManeger'
          let _params = {
            'id': that.itemId,
            'name': that.modItemName,
            'tel': that.modItemTel,
            'pwd': that.modItemPwd,
            'entrytime': that.modItemDate,
            'role_id': that.modItemDep
          }

          api.request('post', url, _params)
            .then(response => {
              that.isLoading = false
              if (Number(response.data.code) === 0) {
                that.modShow = false
                that.showNotification = true
                that.btns[0].options.content = response.data.desc
                that.options = that.btns[0].options
                that._getManagerList()
                that.modItemName = ''
                that.modItemTel = ''
                that.modItemPwd = ''
                that.modItemDate = ''
                that.modItemDep = ''
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
        let url = 'configuration/delManager'
        let _params = {
          'managerId': that.itemId
        }

        api.request('post', url, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              that.showNotification = true
              that.btns[0].options.content = response.data.desc
              that.options = that.btns[0].options
              that._getManagerList()
            } else {
              that.showNotification = true
              that.btns[1].options.content = response.data.desc
              that.options = that.btns[1].options
              that._getManagerList()
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
        that.addItemTel = ''
        that.addItemNum = ''
        that.addItemPwd = ''
        that.addItemDate = ''
        that.addItemDep = ''
      },
      _addSave (num) {
        let that = this
        that.$validator.validateAll(num).then(() => {
          let url = 'configuration/addManager'
          let _params = {
            'name': that.addItemName,
            'tel': that.addItemTel,
            'admin_name': that.addItemNum,
            'pwd': that.addItemPwd,
            'entrytime': that.addItemDate,
            'role_id': that.addItemDep
          }

          console.log('选择日期之后===', that.addItemDate)

          api.request('post', url, _params)
            .then(response => {
              that.isLoading = false
              if (Number(response.data.code) === 0) {
                that.addShow = false
                that.showNotification = true
                that.btns[0].options.content = response.data.desc
                that.options = that.btns[0].options
                that._getManagerList()
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
      searchStaff () {
        var that = this
        that._getManagerList()
        that.searchName = ''
      },
      /**
       * 获得员工列表
       * @method _getManagerList
       *
       * 进入页面的时候会请求数据(此时id,name都为空),点击查询也可以(id为空,name就是输入搜索的内容),点击编辑员工资料的时候(id就是员工的id,name为空),选择每页展示条数之后,或者是点击选择页码也可以请求数据
       *
       * @param  id:编辑员工的时候传入的id
       * @param  name:搜索输入的员工姓名
       *
       */
      _getManagerList () {
        let that = this
        that.isLoading = true
        that.bodyList = []
        let listUrl = 'configuration/getManagerList'
        let _params = {
          'id': '',
          'name': that.searchName,
          'page': that.current,
          'pagenum': that.display
        }

        api.request('post', listUrl, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              that.total = parseInt(response.data.data.count)
              let info = response.data.data.info
              for (var i = 0; i <= info.length; i++) {
                console.log(i)
                let subList = {}
                subList.name = info[i].name
                subList.cate = info[i].tel
                subList.tdata4 = info[i].admin_name
                subList.tdata5 = info[i].entrytime

                if (info[i].roleInfo.length === 0) {
                  subList.tdata6 = '暂无所属角色'
                } else {
                  subList.tdata6 = info[i].roleInfo[0].role_name
                }

                subList.id = info[i].id
                that.bodyList.push(subList)
              }
            } else {
              that.total = 0
              that.bodyList = []
            }
          }).catch(error => {
            that.isLoading = false
            console.log(error)
          })
      },
      /**
       * 获取部门列表 _getRoleList
       *
       * 无参数
       *
       */
      _getRoleList () {
        let that = this
        that.isLoading = true
        that.depList = []
        let listUrl = 'configuration/getRoleList'
        let _params = {}
        api.request('post', listUrl, _params)
          .then(response => {
            that.isLoading = false
            if (Number(response.data.code) === 0) {
              that.depList = response.data.data
            } else {
              that.depList = []
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
            this._getManagerList()
          }
        }
      },
      display: function (newval, oldval) {
        if (newval !== oldval) {
          this.display = newval
          if (!this.isLoading) {
            this._getManagerList()
          }
        }
      }
    },
    components: {
      Tables,
      Paginaction,
      Vodal,
      Notification,
      datePicker
    }
  }
</script>

<template>
  <div class="main-container">
    <h5 class="title-h4"><span class="zdy-span" @click="add"><i class="fa fa-plus"></i>&nbsp; 新增</span><p>员工配置</p></h5>
    <div class="input-group">
      <input type="text" class="form-control setHeight"  placeholder="请输入员工姓名" v-model="searchName">
          <span class="input-group-btn">
              <button class="btn btn-primary" type="button" @click="searchStaff()">搜索</button>
          </span>
    </div>
    <div class="marginTop">
      <Tables :bodyList="bodyList" :headerList="headerList" :edit="mod" :btns="[{name:'编辑', callback: mod, class: 'btn-primary'}, {name: '删除', callback: del, class: 'btn-danger'}]" />
      <Paginaction :total="total" :display="display" :current="current"/>
    </div>
    <!--新增员工-->
    <Vodal
      measure="em"
      animation="animation"
      :show="addShow"
      :width="42"
      :height="38"
      :duration="301"
      @hide="addShow = false"
    >
      <form class="form-horizontal" @submit.prevent="_addSave('form-1')"  data-vv-scope="form-1">
        <div class="header">新增员工</div>
        <div class="body">
          <div class="form-group" :class="{'has-error':errors.has('form-1.addItemName')}">
            <div>
              <label for="addItemName" class="col-sm-3 control-label">员工姓名&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="addItemName" placeholder="请输入员工姓名" v-model="addItemName" name="addItemName" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.addItemName')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入部门名称
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-1.addItemTel')}">
            <label for="addItemTel" class="col-sm-3 control-label">手机号码&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="addItemTel" placeholder="请输入手机号码" v-model="addItemTel" name="addItemTel" v-validate="{ rules: { required: true, regex: /^1[3|4|5|7|8]\d{9}$/ } }">
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.addItemTel')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入正确的手机号码
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-1.addItemNum')}">
            <div>
              <label for="addItemNum" class="col-sm-3 control-label">登录账号&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="addItemNum" placeholder="请输入登录账号" v-model="addItemNum" name="addItemNum" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.addItemNum')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入登录账号
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-1.addItemPwd')}">
            <div>
              <label for="addItemPwd" class="col-sm-3 control-label">登录密码&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="addItemPwd" placeholder="请输入登录密码" v-model="addItemPwd" name="addItemPwd" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.addItemPwd')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入登录密码
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-1.addItemDate')}">
            <div>
              <label class="col-sm-3 control-label">入职时间&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <date-picker :value="addItemDate" @on-change="onStartChange" :readonly="true" name="addItemDate" v-validate="{ rules: { required: true } }"></date-picker>
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.addItemDate')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请选择入职时间
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-1.addItemDep')}">
            <div>
              <label class="col-sm-3 control-label">所属部门&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <select class="input-sm ser-sel" v-model="addItemDep" style="width: 100%;line-height: 34px" name="addItemDep" v-validate="{ rules: { required: true } }">
                  <option v-for="opt in depList" :value="opt.id">{{ opt.name }}</option>
                </select>
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-1.addItemDep')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请选择所属部门
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="vodal-confirm-btn" type="submit">确定</button>
      </form>
      <button class="vodal-cancel-btn" @click="addShow = false">取消</button>
    </Vodal>
    <!--修改员工-->
    <Vodal
      measure="em"
      animation="animation"
      :show="modShow"
      :width="40"
      :height="34"
      :duration="301"
      @hide="modShow = false"
    >
      <form class="form-horizontal" @submit.prevent="_modSave('form-2')"  data-vv-scope="form-2">
        <div class="header">修改员工</div>
        <div class="body">
          <div class="form-group" :class="{'has-error':errors.has('form-2.modItemName')}">
            <div>
              <label for="modItemName" class="col-sm-3 control-label">员工姓名&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="modItemName" placeholder="请输入员工姓名" v-model="modItemName" name="modItemName" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-2.modItemName')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入员工姓名
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-2.modItemTel')}">
            <div>
              <label for="modItemTel" class="col-sm-3 control-label">手机号码&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="modItemTel" placeholder="请输入手机号码" v-model="modItemTel" name="modItemTel" v-validate="{ rules: { required: true, regex: /^1[3|4|5|7|8]\d{9}$/ } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-2.modItemTel')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入正确的手机号码
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-2.modItemPwd')}">
            <div>
              <label for="modItemPwd" class="col-sm-3 control-label">登录密码&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="modItemPwd" placeholder="请输入登录密码" v-model="modItemPwd" name="modItemPwd" v-validate="{ rules: { required: true } }">
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-2.modItemPwd')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请输入登录密码
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-2.modItemDate')}">
            <div>
              <label class="col-sm-3 control-label">入职时间&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <date-picker :value="modItemDate" @on-change="onEndChange" :readonly="true" name="modItemDate" v-validate="{ rules: { required: true } }"></date-picker>
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-2.modItemDate')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请选择入职时间
                </label>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('form-2.modItemDep')}">
            <div>
              <label class="col-sm-3 control-label">所属部门&nbsp;&nbsp;<i class="fa fa-asterisk facolor"></i></label>
              <div class="col-sm-9">
                <select class="input-sm ser-sel" v-model="modItemDep" style="width: 100%;line-height: 34px" name="modItemDep" v-validate="{ rules: { required: true } }">
                  <option v-for="opt in depList" :value="opt.id">{{ opt.name }}</option>
                </select>
              </div>
            </div>
            <div>
              <div class="col-sm-3"></div>
              <div class="col-sm-9 tip">
                <label v-if="errors.has('form-2.modItemDep')" class="control-label ellipsis">
                  <i class="fa fa-fw fa-times-circle-o"></i> 请选择所属部门
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="vodal-confirm-btn" type="submit">确定</button>
      </form>
      <button class="vodal-cancel-btn" @click="modShow = false">取消</button>
    </Vodal>
    <!--删除部门-->
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
  .marginTop{
    margin-top: 12px;
  }
</style>
