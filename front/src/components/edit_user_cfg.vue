<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <v-img class="align-end text-white" height="200" src="https://randomuser.me/api/portraits/women/17.jpg" cover>
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        <v-btn color="primary" text="Escolher nova imagem"></v-btn>
      </v-card-subtitle>

      <v-card-text>
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text="Share"></v-btn>

        <v-btn color="orange" text="Explore"></v-btn>
      </v-card-actions>
    </v-card>
    <Modal v-model="exibirModal" :texto="mensagem"></Modal>
  </v-container>
</template>

<script>

import Modal from "./modal.vue"
import servicoUsuario from "../api/usuario";
//import servicoPerfil from "../api/perfil";

export default {
  name: "vwEditUser",
  components: {
    Modal
  },
  data: () => ({
    editedUser: {
      username: '',
      password: '',
      confirmaPassword: '',
      perfil_id: null
    },
    exibirModal: false,
    mensagem: '',
    perfis: [],
    perfilSelecionado: null
  }),

  methods: {
    pickImage() {
      console.log(`pickImage`)
    },
    async salvar() {
      //console.log(JSON.stringify(this.credenciais))
      this.editedUser.password = null;
      this.editedUser.perfil_id = this.perfilSelecionado;
      await servicoUsuario.updateUser(this.editedUser)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.mensagem = `Usuário salvo com sucesso!`
          this.exibirModal = true;
        })
        .catch(() => {
          this.mensagem = `Falha ao salvar usuário!`
          this.exibirModal = true;
        });
    },
  },

  async mounted() {
    // servicoPerfil.getPerfis()
    // .then(async (res) => {
    //   this.perfis = res;
    //   this.editedUser = await servicoUsuario.getUser(this.$route.params.id);
    //   this.perfilSelecionado = this.editedUser.perfil_id;
    // })
    // .catch((e)=>{
    //   console.error(JSON.stringify(e));
    // });
  }
};

</script>
