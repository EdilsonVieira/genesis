<template>
 <EditUser></EditUser>
</template>

<script>
// Exemplo 001: Importar arquivo JSON local
//import apiUsuarios from '@/data/data_user.json';
import EditUser from '../components/edit_user.vue';

export default {
  name: 'Vw_EditUser',
  components: {
    EditUser
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
