<template>
 <LoginIni></LoginIni>
</template>

<script>
import LoginIni from '../components/login';

export default {
  name: 'Vw_Login',
  components: {
    LoginIni
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
