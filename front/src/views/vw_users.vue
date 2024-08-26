<template>
 <Users></Users>
</template>

<script>
// Exemplo 001: Importar arquivo JSON local
//import apiUsuarios from '@/data/data_user.json';
import Users from '../components/users.vue';

export default {
  name: 'Vw_Users',
  components: {
    Users
  },
  data() {
    return {
      usuarios: [],
    };
  },
};
</script>

<style scoped>
.cmb1 {max-width:300px;}
.mx-auto1 {background-color:snow;padding:20px;max-width:300px;text-align:center;}
</style>
