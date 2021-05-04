<template>
  <BasicLayout>
    <h2>Estamos en la Home</h2>
  </BasicLayout>
</template>

<script>
// @ is an alias to /src
import BasicLayout from "../layouts/BasicLayout"
import { getTokenApi } from "../api/token";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: 'Home',
  components: {
    BasicLayout,
  },
  setup(){
    const router = useRouter();
    const token = getTokenApi();
    onMounted(() => {
      if (!token) return router.push("/login");

      else{
         return router.push("/");
      }
    
    });
  }
}
</script>
