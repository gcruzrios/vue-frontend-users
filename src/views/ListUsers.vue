<template>
  <BasicLayout>
      <h1>List Users</h1>
      <lusers></lusers>
      <!-- <list-users></list-users>  -->
   </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
import Lusers from '../components/Lusers'
import ListUsers from '../components/ListUsers.vue'

export default {
  name: 'ListUsers',
  components: {
    BasicLayout,
    ListUsers,
    Lusers
    
  }
}
</script>

<style>

</style>