<template>
  <Logout></Logout>
</template>

<script>
import Logout from '../components/logout';

export default {
  name: 'Vw_Logout',
  components: {
    Logout
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
