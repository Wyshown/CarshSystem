<style lang="scss" scoped>
    table{
        background-color: #FFF!important;
        word-break:break-all; word-wrap:break-all;
    }
    button{
        margin: 2px;
    }
    .fr{
      float:right
    }
</style>
<template>
  <table class="table table-striped table-bordered  table-hover">
          <thead>
              <tr class="text-center">
                <td v-for="item in headerList">{{item.name}} <span v-if="item.isStar">*</span></td>
              </tr>
          </thead>
          <tbody>
              <tr v-if ="bodyList.length == 0"  class="text-center">
                <td :colspan = "headerList.length">暂无数据</td>
              </tr>
              <tr v-else class="text-center" v-for="body in bodyList">
                  <td v-for="(item, key) in body">
                      <template v-if="key === 'id' && btns.length > 0">
                          <button type="button" v-for="btn in btns" class="btn" :class="btn.class" @click="btn.callback(item)">{{btn.name}}</button>
                      </template>
                      <template v-else>
                          <template v-if="item && item.isBtn">
                            <button type="button" v-for="btn in item.str" class="btn" :class="btn.class" @click="btn.callback(item)">{{btn.name}}</button>
                          </template>
                          <div v-else-if="item && item.isHtml" v-html="item.str" style="max-width: 550px" class="text-left"></div>
                          <div v-else>
                            {{item}}
                          </div>
                      </template>
                  </td>
              </tr>
          </tbody>

      </table>
</template>
<script type="text/javascript">
  export default {
    props: {
      headerList: {
        type: Array,
        default: () => []
      },
      bodyList: {
        type: Array,
        default: () => []
      },
      btns: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      editClk (id) {
        this.edit(id)
      },
      delClk (id) {
        this.edit(id)
      },
      tempMethod (str) {
        console.log('method name:', str)
      }
    }
  }
</script>
<style>

</style>
