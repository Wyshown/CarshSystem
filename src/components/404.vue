<template>
  <div class="container container-table bg-container">
      <div class="row vertical-10p">
        <div class="container">
          <img src="static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1>You are lost.</h1>
            <h4>This page doesn't exist.</h4>
            <router-link :to="{name:'Index',params:{orderId:1}}">Take me home.</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>

<style scoped>
  .container-table, body, html {
    height: 100%;
    background-color: #282B30 !important;
  }
  .container-table {
    display: table;
    color: white;
    position: absolute;
  }
  .vertical-10p {
    padding-top: 10%;
  }
  .logo {
    width: 15em;
    padding: 3em;
  }
  .input-group input {
    height: 4em;
  }
  .bg-container {
    width: 100%;
    height: 100%
  }
</style>
