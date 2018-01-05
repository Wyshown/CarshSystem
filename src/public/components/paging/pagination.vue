<style lang="scss">
  nav {
    text-align: right;
  }
  nav ul {
    margin: 0 0!important;
  }
</style>
<template>
  <div class="row">
    <div class="col-sm-2">
      <select class="form-control" v-model="updateDisplay" @change="onSelectChange(updateDisplay)">
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="col-sm-10">
      <nav>
        <ul class="pagination">
          <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
          <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"> 上一页 </a></li>
          <li v-for="p in grouplist" :class="{'active': current == p.val}"><a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a></li>
          <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"> 下一页</a></li>
          <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'pagination',
    props: {
      from: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      display: {
        type: Number,
        default: 10
      },
      current: {
        type: Number,
        default: 1
      },
      pagegroup: {
        type: Number,
        default: 5,
        coerce (v) {
          v = v > 0 ? v : 5
          return v % 2 === 1 ? v : v + 1
        }
      }
    },
    data () {
      return {
        updateDisplay: this.display
      }
    },
    computed: {
      page: function () {
        return Math.ceil(this.total / this.display)
      },
      grouplist: function () {
        let len = this.page
        let temp = []
        let list = []
        let count = Math.floor(this.pagegroup / 2)
        let center = this.current
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len})
          }
          return temp
        }
        while (len--) {
          temp.push(this.page - len)
        }
        let idx = temp.indexOf(center)
        idx < count && (center = center + count - idx)
        this.current > this.page - count && (center = this.page - count)
        temp = temp.splice(center - count - 1, this.pagegroup)
        do {
          let t = temp.shift()
          list.push({
            text: t,
            val: t
          })
        } while (temp.length)
        if (this.page > this.pagegroup) {
          this.current > count + 1 && list.unshift({ text: '...', val: list[0].val - 1 })
          this.current < this.page - count && list.push({ text: '...', val: list[list.length - 1].val + 1 })
        }
        return list
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current !== idx && idx > 0 && idx < this.page + 1) {
          console.log('this.from:', this.from)
          if (this.from === 1) {
            this.$parent.current = idx
          } else {
            this.$parent.rechargeCurrent = idx
          }
        }
      },
      onSelectChange: function (num) {
        if (this.from === 1) {
          this.$parent.current = 1
          this.$parent.display = parseInt(num)
        } else {
          this.$parent.rechargeCurrent = 1
          this.$parent.rechargeDisplay = parseInt(num)
        }
      }
    }
  }
</script>
