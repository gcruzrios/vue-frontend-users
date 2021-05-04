<template>

  <BasicLayout> 
     <h1>Settings</h1>
     <update-password></update-password>
  </BasicLayout>
    
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
import UpdatePassword from '../components/UpdatePassword'
// import { getTokenApi } from "../api/token";
// import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";

export default {
  name: 'Settings',
  components: {
    BasicLayout,
    UpdatePassword
  },
  // setup(){
  //   const router = useRouter();
  //   const token = getTokenApi();

    
  //   onMounted(() => {
  //     if (!token) return router.push("/login");

  //     else{
  //        return router.push("/settings");
  //     }
    
  //   });
  
  //}
}
</script>

<style>

</style>