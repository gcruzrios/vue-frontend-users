<template>
  <BasicLayout>
      <h1>List Users</h1>
      <lusers></lusers>
      
   </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
import Lusers from '../components/Lusers'
import ListUsers from '../components/ListUsers.vue'
import { getTokenApi } from "../api/token";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: 'ListUsers',
  components: {
    BasicLayout,
    ListUsers,
    Lusers
    
  },
  setup(){
    const router = useRouter();
    const token = getTokenApi();
    onMounted(() => {
      if (!token) return router.push("/login");

      else{
         return router.push("/list-users");
      }
    
    });
  }

}
</script>

<style>

</style>