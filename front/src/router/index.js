import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/vw_login.vue';
import Home from '../views/vw_home.vue';
import Users from '../views/vw_users.vue';
import Perfis from '../views/vw_perfil.vue';
import Sobre from '../views/vw_about.vue';
import EditUser from '../views/vw_edit_user.vue';
import EditPerfil from '../views/vw_edit_perfil.vue';
import Logout from '../views/vw_logout.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    name: 'Usuarios',
    component: Users,
  },
  {
    path: '/perfis',
    name: 'Perfis',
    component: Perfis,
  },
  {
    path: '/edit_perfil/:id',
    name: 'EditarPerfil',
    component: EditPerfil,
  },
  {
    path: '/edit_user/:id',
    name: 'EditarUsuarios',
    component: EditUser,
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
