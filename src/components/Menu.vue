<template>
  <div class="ui secondary menu">
      <div class="ui container">

          <div class="left menu">
              <router-link class="item" to="/">
                <img class="ui small image" src="../assets/logo.png" alt="Sistema Vue"/>
                <p>Categorias...</p>
              </router-link>
          </div>
          
          <div class="right menu">
              <router-link class="item" to="/login" v-if="!token">
                  Iniciar Sesión
              </router-link>
              <template v-if="token">
                
                <span class="item">Usuario : {{ username }} </span>
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
          //console.log(uid)
          
          const responseUser = await GetUserApi(uid);
          user.value = responseUser;
          //console.log(user.value.usuario);
          username.value = user.value.usuario.nombre;
          //console.log(username.value);
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
    width: 50%;
    .ui.image {
      width: 40px;
    }
  }

  .menu.right {
    width: 50%;
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