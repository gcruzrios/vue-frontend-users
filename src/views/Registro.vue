<template>
  <BasicLayout>
        <div class="register">
            <h2>Registro de Usuarios</h2>
       
        <form class="ui form" @submit.prevent="register" 
              :class="{ error: formError.rol }">

        <div class="ui selection" >
          <select class="ui dropdown" v-model="formData.rol">
            <option value="USER_ROLE" selected>Usuario Regular</option>
            <option value="VENTAS_ROLE">Usuario Ventas</option>
          </select>
         </div> 
         <div class="row mb-3"></div>
        
        
        <div class="field">
          <input
            type="text"
            placeholder="Nombre de usuario"
            v-model="formData.nombre"
            :class="{ error: formError.username }"
          />
        </div>
        <div class="field">
          <input
            type="text"
            placeholder="Correo electronico"
            v-model="formData.correo"
            :class="{ error: formError.email }"
            />
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Contraseña"
            v-model="formData.password"
            :class="{ error: formError.password }"
            />
        </div>
        <div class="field">
        <input
          type="password"
          placeholder="Repetir contraseña"
          v-model="formData.repeatPassword"
          :class="{ error: formError.repeatPassword }"
          />
        </div>
        
        
        <button
          type="submit"
          class="ui button fluid primary"
          :class="{ loading }"
        >
          Crear usuario
        </button>
      </form>
        <router-link to="/login">Iniciar Sesion</router-link>
      </div>
    </BasicLayout>
</template>

<script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import * as Yup from "yup";
  import BasicLayout from "../layouts/BasicLayout";
  import { registerApi } from "../api/user";
  import { getTokenApi } from "../api/token";

  export default {
    name:"Register",
    components:{
        BasicLayout
    },
    setup(){
        let formData = ref({});
        let formError = ref({});
        let loading = ref(false);


        const router = useRouter();
        const token = getTokenApi();


        const schemaForm = Yup.object().shape({
          rol: Yup.string().required(true),
          nombre: Yup.string().required(true),
          correo: Yup.string().email(true).required(true),
          password: Yup.string().required(true),
          repeatPassword: Yup.string()
            .required(true)
            .oneOf([Yup.ref("password")], true),
        });

        const register = async () =>{
          //console.log("Registro de usuario");
          //console.log(formData.value);

          formError.value = {};
          loading.value = true;

          try {
            await schemaForm.validate(formData.value, { abortEarly: false });

            try {
              
              const response = await registerApi(formData.value);
              router.push("/login");
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            error.inner.forEach((err) => {
              formError.value[err.path] = err.message;
            });
          }

          loading.value = false;

        };

        return{
          formData,
          register,
          formError,
          loading
        };
    },
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