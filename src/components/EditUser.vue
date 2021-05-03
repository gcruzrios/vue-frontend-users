<template>
  <div class="row justify-content-center">
        <div class="col-md-6">
            
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="this.UserEdit.usuario.nombre" required>
                </div>

                <div class="form-group">
                    <label>Correo</label>
                    <input type="email" class="form-control" v-model="this.UserEdit.usuario.correo" required>
                </div>

                <div class="form-group">
                    <label>Rol</label>
                    <input type="text" class="form-control" v-model="this.UserEdit.usuario.rol" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { GetUserApi } from "../api/user"



import { API_URL } from "../utils/constants";


export default {
    data() {
        return {
            user: { },
            UserEdit: {}

        }
    },
    created() {
        //let apiURL = `${API_URL}/api/usuarios/${id}`;
        
        let apiURL = `${API_URL}/api/usuarios/${this.$route.params.id}`;
        
        //console.log(apiURL);
        //const idUser = this.$route.params.id;
        //console.log(idUser)

        // const get_user = async() => {
        //     const responseUser = await GetUserApi(idUser);
        //     user.value = responseUser;
        //     //console.log(user.value);
        //     return user.value;
        // }
        
        // const user = get_user();
        // console.log(user);
       
        axios.get(apiURL).then((res) => {
           this.UserEdit = res.data;
           this.user = res.data;
           console.log(this.UserEdit.usuario);
        })
    
    
    },
    methods: {
        handleUpdateForm() {
            //let apiURL = `http://localhost:4000/api/update-student/${this.$route.params.id}`;

            const token = getTokenApi();
            //const { uid } = jwtDecode(token);
            //console.log(token)
            let apiURL = `${API_URL}/api/usuarios/${this.$route.params.id}`;


            const params = {
                headers: {
                "Content-Type": "application/json",
                "token": token,
                }    
            };


                //axios.post(apiURL, params, this.user).then((res) => {
                axios.put(apiURL, params, this.user).then((res) => {
      
                console.log(res)
                this.$router.push('/list-users')
                //router.push("/list-users");
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>

<style>

</style>