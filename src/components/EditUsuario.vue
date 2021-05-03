<template>

   <div class="register">
              
        <form class="ui form" @submit.prevent="Update" 
              :class="{ error: formError.rol }">
        
        <div class="ui selection" >
          <select class="ui dropdown" v-model="formData.rol">
            <option value="ADMIN_ROLE" selected>Usuario Administrador</option>
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
            disabled
            placeholder="Correo electronico"
            v-model="formData.correo"
            :class="{ error: formError.email }"
            />
        </div>
        <!-- <div class="field">
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
        </div> -->
        
        
        <button
          type="submit"
          class="ui button fluid primary"
          :class="{ loading }"
        >
          Editar usuario
        </button>
      </form>
  </div> 

</template>

<script>


//

//

//v-model="user.rol"

import { ref, onMounted } from "vue";

import * as Yup from "yup";

import { useRoute, useRouter } from 'vue-router'
import { getTokenApi, deleteTokenApi } from "../api/token";
import { GetUserApi, UpdateUserApi} from "../api/user";
import { API_URL } from "../utils/constants";
import axios from "axios";

export default {
    name:"Menu",
    setup(){

      let formData = ref({});
      let formError = ref({});
      let loading = ref(false);

      const user = ref(null);
      // let username = ref("");
      // let correo = ref("");
      // let rol = ref("");
      // let password = ref("");

      let id = ref("");
      let id_user = ref("");
      const token = getTokenApi();


      //console.log(token);
      const router = useRouter();


      let route = useRoute()
      //console.log(route.params.id)
      loading.value = true;
      id_user = route.params.id;

      const schemaForm = Yup.object().shape({
          rol: Yup.string().required(true),
          nombre: Yup.string().required(true),
          correo: Yup.string().email(true).required(true),
          // password: Yup.string().required(true),
          // repeatPassword: Yup.string()
          //   .required(true)
          //   .oneOf([Yup.ref("password")], true),
        });
      
      onMounted(async () => {

        let route = useRoute()
        //console.log(route.params.id)
        loading.value = true;

        id_user = route.params.id;
        //id = id_user;        

        const responseUser = await GetUserApi(id_user);
        user.value = responseUser; 
        formData.value = responseUser.usuario;

        // username.value = user.value.usuario.nombre;
        // correo.value =user.value.usuario.correo;
        // password.value = user.value.usuario.password;
        // console.log(username.value)  
        
        loading.value = false;
        
    
      });

      

      const Update = async () => {

        //const token = getTokenApi();
        //console.log(id)
        
        loading.value = true;

        try {
            await schemaForm.validate(formData.value, { abortEarly: false });
            try {
                  const response = await UpdateUserApi(id_user,formData.value, token);
                  //console.log(response);
                  router.push("/list-users");
                              
            } catch (error) {
                console.log(error);
            }

          
          
        } catch (error) {
            error.inner.forEach((err) => {
              formError.value[err.path] = err.message;
            });
        }
        loading.value = false;
        
      }


      const logout = () => {
        deleteTokenApi();
        location.replace("/login");
      };
      
      return{
        formData,
        formError,
        loading,
        Update,
        token,
        logout,
        user,
        id_user,
        // username,
        // correo,
        // rol
      }
    },
    
}
</script>


<style lang="scss" scoped>
.register {
  text-align: left;
   
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