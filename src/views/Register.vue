<template>
    <BasicLayout>
        <div class="register">
            <h2>Registro de Usuarios</h2>
        </div>
        <form class="ui form" @submit.prevent="register">
        <div class="field">
          <input
            type="text"
            placeholder="Nombre de usuario"
           
          />
        </div>
        <div class="field">
          <input
            type="text"
            placeholder="Correo electronico"
            />
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Contraseña"
            />
        </div>
        <div class="field">
        <input
          type="password"
          placeholder="Repetir contraseña"
          />
        </div>

        <button
          type="submit"
          class="ui button fluid primary"
        >
          Crear usuario
        </button>
      </form>
        <router-link to="/login">
            Iniciar Sesion 
        </router-link>
    </BasicLayout>

 </template>

<script>
    import {} from "vue";
import BasicLayout from "../layouts/BasicLayout";
export default {
    name:"Register",
    components:{
        BasicLayout
    },
    setup(){
        let formData = ref({});
    }
};
</script>

<style lang="scss" scoped>
.register {
  text-align: center;
  > h2 {
    margin: 50px 0 30px 0;
  }

  .ui.form {
    max-width: 350px !important;
    margin: 0 auto;
    margin-bottom: 10px;
    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
}
</style>