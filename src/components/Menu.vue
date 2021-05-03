<template>
  <div class="ui secondary menu">
      <div class="ui container">

          <div class="left menu">
              <router-link class="item" to="/">
                <img class="ui small image" src="../assets/logo.png" alt="Sistema Vue"/>
                <template v-if="token">
                    <router-link class="item" to="/list-users">Usuarios</router-link>
                    <router-link class="item" to="/list-categorias">Categorias</router-link>
                    <router-link class="item" to="/list-productos">Productos</router-link>
                    
                </template>
              </router-link>
          </div>
          
          <div class="right menu">
              <router-link class="item" to="/login" v-if="!token">
                  Iniciar Sesión
              </router-link>
              <template v-if="token">
                
                <span class="item">Usuario : {{ username }} </span>
                <router-link class="item" to="/settings">
                <i class="address book outline icon"></i>
                
                <router-link class="item" to="/about">
                    <i class="copyright outline icon"></i>
                </router-link>
                </router-link>
                <span class="ui item logout" @click="logout">
                  <i class="sign-out icon"></i>
                </span>
                
              </template>
             
          </div> 
      </div> 

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { getTokenApi, deleteTokenApi } from "../api/token";
import { GetUserApi } from "../api/user";
import jwtDecode from "jwt-decode";

export default {
    name:"Menu",
    setup(){

      const user = ref(null);
      let username = ref("");
      let id_user = ref(0);

      const token = getTokenApi();
      
      onMounted(async () => {
        if (token){
          const { uid } = jwtDecode(token);
         
          
          const responseUser = await GetUserApi(uid);
          user.value = responseUser;
          
          username.value = user.value.usuario.nombre;
          
          id_user.value = uid;
          
        }
      
      });


      const logout = () => {
        deleteTokenApi();
        location.replace("/login");
      };
      
      return{
        token,
        logout,
        user,
        username,
        id_user
      }
    },
    
}
</script>

<style lang="scss" scoped>
.ui.menu.secondary {
  background-color: #16202b;

  .item {
    color: #fff;
    &:hover {
      color: #1fa1f1;
    }
  }

  .menu.left {
    width: 60%;
    .ui.image {
      width: 40px;
    }
  }

  .menu.right {
    width: 40%;
    justify-content: flex-end;

    .logout,
    .cart {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>