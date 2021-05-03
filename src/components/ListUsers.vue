<template>
    <div class="row">
        <div class="col md-10"></div>
        <div class="col md-2"> <router-link :to="`/add-user`" class="text-light btn btn-primary float-right mb-3">New Record</router-link>
          
        </div>
     </div>
    <table class="table table-hover table-bordered" id="example">
      <thead>
        <tr>
         
          <th>Name</th>
          <th>Email</th>
          <th>TypeUser</th>
          <th>Actions</th>
          
        </tr>
      </thead>
     <tbody>
        <tr v-for="user in users" :key="user.uid">
          <td>{{user.nombre}}</td>
          <td>{{user.correo}}</td>
          <td>{{user.rol}}</td>
          <td>
            <span>
              <router-link :to="`/edit-user/${user.uid}`">
                <i class="fas fa-edit mr-2"></i>
              </router-link> 
              
              <i class="fas fa-trash-alt text-danger borrar"  @click="deleteUser(user.uid)"></i> </span>  
          </td>
          
        </tr>
        
      </tbody> 
   </table>
</template>

<script>
import { API_URL } from "../utils/constants";
import { getTokenApi } from "../api/token";
import axios from "axios";

    export default {
        
        

        data() {

            

            return {
                users: []
            }
        },
        created() {
            let apiURL = `${API_URL}/api/usuarios`;
            axios.get(apiURL).then(res => {
                this.users = res.data.total;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteUser(id){
                const token = getTokenApi();
                //console.log(token)
                let apiURL = `${API_URL}/api/usuarios/${id}`;


                const params = {
                    headers: {
                    "Content-Type": "application/json",
                    "token": token,
                    }    
                };
                //console.log(params);


                let indexOfArrayItem = this.users.findIndex(i => i.uid === id);
                
                console.log("index =>",indexOfArrayItem);
                //console.log(id);
                if (window.confirm("Do you really want to delete?")) {
                     axios.delete(apiURL, params).then(() => {
                        console.log('Index:',indexOfArrayItem);
                        this.users.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style lang="css" scoped>

.borrar{
    cursor: pointer;
}

</style>