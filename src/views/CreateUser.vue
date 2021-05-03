<template>

  <BasicLayout>
      <h1>Create Users</h1>
       <create-user></create-user>
      
   </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
import CreateUser from '../components/CreateUser'


export default {
  name: 'ListUsers',
  components: {
    BasicLayout,
    CreateUser
    
  }
}
</script>

<style>

</style>