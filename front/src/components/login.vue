<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo_eliel.png')" class="my-3" contain height="100" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Acesso ao Sistema
        </h1>

        <v-sheet class="mx-auto" max-width="300">
          <v-form ref="form">
            <v-text-field v-model="credenciais.username" label="Username" required></v-text-field>
            <v-text-field v-model="credenciais.password" label="Password" type="password" required></v-text-field>
            <v-btn @click="login">Login</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
    <Modal v-model="exibirModal" :titulo="titulo" :texto="mensagem"></Modal>
  </v-container>
</template>

<script>

import servicoAuth from "../api/auth";
import Modal from "./modal.vue"

export default {
  name: "vwUserLogin",
  components: {
    Modal
  },
  data: () => ({
    credenciais: {
      username: 'master',
      password: 'abc321',
    },
    exibirModal: false,
    titulo: '',
    mensagem: ''
  }),

  methods: {
    async login() {
      //console.log(JSON.stringify(this.credenciais))
      await servicoAuth.login(this.credenciais)
        .then((res) => {
          //console.log(`login: ${JSON.stringify(res)}`);
          //console.log(`menu: ${JSON.stringify(res.menu)}`);
          sessionStorage.setItem('menu', JSON.stringify(res.menu));
          this.$router.push('/home');
        })
        .catch(() => {
          this.titulo = `Falha no Login`;
          this.mensagem = `Verifique as credenciais!`
          this.exibirModal = true;
          //console.error(`Falhou o login...`)
        });
    },
  },

};

</script>
../api/auth