import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Registro from "../views/Registro.vue";
import ListUsers from '../views/ListUsers.vue';
import EditUser from '../views/EditUser.vue'
import CreateUser from '../views/CreateUser.vue'
import ListCategorias from '../views/ListCategorias.vue';
import ListProductos from '../views/ListProductos.vue';
import Settings from '../views/Settings.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/list-users',
    name: 'ListUsers',
    component: ListUsers
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: CreateUser
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/list-users',
    name: 'ListUsers',
    component: ListUsers
  },
  {
    path: '/list-categorias',
    name: 'ListCategorias',
    component: ListCategorias
  },
  {
    path: '/list-productos',
    name: 'ListProductos',
    component: ListProductos
  },

  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
