<template lang="html">
<div class="file-upload-container">
  <a class="file-upload-icon" >
    <input ref="input" type="file" accept="image/png,image/jpeg,image/gif" @change="uploadImg" >
  </a>
  <div class="crop-container" v-show="openCrop">
    <template>
      <div class="content">
        <div class="show-info">
          <div class="test">
            <vueCropper
              ref="cropper2"
              :img="example2.img"
              :outputSize="example2.size"
              :outputType="example2.outputType"
              :info="example2.info"
              :canScale="example2.canScale"
              :autoCrop="example2.autoCrop"
              :autoCropWidth="example2.width"
              :autoCropHeight="example2.height"
              :fixed="example2.fixed"
              :fixedNumber="example2.fixedNumber"
            ></vueCropper>
          </div>
          <label class="btnbtn" for="upload2">更换</label>
          <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg">
          <div @click="finish2('base64')"class="btnbtn" >确定</div>
          <div @click="close"class="btnbtn" >取消</div>
        </div>
      </div>
    </template>
  </div>
</div>
</template>


<script>
  import vueCropper from 'vue-cropper'
  export default {
    data: function () {
      return {
        openCrop: false,
        example2: {
          img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          width: 300,
          height: 250,
          fixed: true,
          fixedNumber: [4, 3]
        }
      }
    },
    methods: {
      close () {
        this.openCrop = false
      },
      finish2 (type) {
        this.$refs.cropper2.getCropData((data) => {
          this.openCrop = false
          this.$parent.addImage(data)
        })
      },
      uploadImg (e) {
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.example2.img = e.target.result
          this.openCrop = true
        }
        reader.readAsDataURL(file)
      }
    },
    components: {
      vueCropper
    },
    mounted () {
//      this.changeImg()
    }
  }
</script>



<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .content {
    margin: auto;
    max-width: 1200px;
    /*margin-bottom: 100px;*/
  }
  .btnbtn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
  }
  /*.show-info {*/
    /*margin-bottom: 50px;*/
  /*}*/

  .show-info h2 {
    line-height: 50px;
  }
  .test {
    height: 500px;
  }
  @keyframes slide {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
.file-upload-container {
  * {
    box-sizing: border-box;
  }

  .file-upload-icon {
    display: inline-block;
    border: 1px solid #000000;
    position: relative;
    z-index: 1;
    cursor: pointer;
    height: 100%;
    width: 100%;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:before {
      width: 40%;
      height: 1px;
      background-color: #000000;
    }

    &:after {
      height: 40%;
      width: 1px;
      background-color: #000000;
    }
  }

  input {
    display: block;
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    z-index: 3;
    cursor: pointer;
  }
}
.crop-container {
  position: fixed;
  width: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, .7);
  text-align: center;
  border-radius: 4px;
  z-index: 9999;

}

</style>
