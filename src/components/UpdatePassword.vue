<template>
  <div class="register">
        
        <template v-if="token">

            <form class="ui form" @submit.prevent="Update" 
                  :class="{ error: formError.rol }">
            
          
            
            
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
              Editar usuario
            </button>
          </form>
      </template>
      <template v-if="!token">
        <div text-danger>
          Error no estás autenticado para hacer esta operación
        <br/>
     
        </div>
           <router-link to="/login">Iniciar Sesion</router-link>
      
      </template>

  </div> 
</template>

<script>
import { ref, onMounted } from "vue";

import * as Yup from "yup";

import { useRoute, useRouter } from 'vue-router'
import { getTokenApi, deleteTokenApi } from "../api/token";
import { GetUserApi, UpdateUserApi} from "../api/user";
import { API_URL } from "../utils/constants";
import axios from "axios";
import jwtDecode from "jwt-decode";

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
          //rol: Yup.string().required(true),
          nombre: Yup.string().required(true),
          correo: Yup.string().email(true).required(true),
          password: Yup.string().required(true),
          repeatPassword: Yup.string()
             .required(true)
             .oneOf([Yup.ref("password")], true),
        });
      
      onMounted(async () => {

        let route = useRoute()
        //console.log(route.params.id)
        loading.value = true;

        const { uid } = jwtDecode(token);
             
        const responseUser = await GetUserApi(uid);
        user.value = responseUser;
               
        id_user = uid;
        //console.log(id_user)
        

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
                  router.push("/");
                              
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
