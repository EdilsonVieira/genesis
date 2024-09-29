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
import servicoImagem from "../api/imagem";
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
    async bufferToBase64(buffer) {
      let binary = '';
      let bytes = new Uint8Array(buffer.data);
      let len = bytes.byteLength;      
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }      
      return btoa(binary);
    },
    async login() {
      //console.log(JSON.stringify(this.credenciais))
      await servicoAuth.login(this.credenciais)
        .then(async (res) => {
          sessionStorage.setItem('menu', JSON.stringify(res.user.menu));
          sessionStorage.setItem('user_id', JSON.stringify(res.user.id));
          sessionStorage.setItem('avatar_id', JSON.stringify(res.user.avatar_id));
          sessionStorage.setItem('username', JSON.stringify(res.user.username));
          sessionStorage.setItem('nome_completo', JSON.stringify(res.user.nome_completo));
          this.config.loginInfo = res;
          const imgObj = await servicoImagem.buscarImagem(this.config.loginInfo.user.avatar_id);
          //const imgData = await this.bufferToBase64(imgObj.dados);
          var Buffer = require('buffer/').Buffer;
          const imgData = Buffer.from(imgObj.dados).toString()
          sessionStorage.setItem('avatarDados', imgData);
          sessionStorage.setItem('avatarTipo', imgObj.tipo);
          this.$forceUpdate();
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