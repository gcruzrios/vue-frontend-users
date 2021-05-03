<template>
  <BasicLayout>
      <h1>Edit Users</h1>
       <edit-usuario></edit-usuario>
      
   </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
import EditUsuario from '../components/EditUsuario'

export default {
  name: 'ListUsers',
  components: {
    BasicLayout,
    EditUsuario
    
  }
}
</script>

<style>

</style>