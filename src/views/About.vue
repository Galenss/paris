<template>
  <div class="about">
    <h1>This is an about page</h1>
     <el-button type="primary" @click="getUserList" size="mini">查看用户</el-button>
    {{userData}}
  </div>
</template>
<script>
export default {
  data(){
    return {
      userData:[]
    }
  },
  methods:{
    getUserList(){
      this.$http.get('http://localhost:5000/users/getUsers').then(res => {
        this.userData = res.data
      })
    }
  }
}
</script>
