<template>
 <BasicLayout>
    <h1>Estamos en Login</h1>
    <router-link to="/register">
        Crear Cuenta
    </router-link>
 </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
export default {
    name:"Login",
    components:{
        BasicLayout
    }

}
</script>

<style>

</style>