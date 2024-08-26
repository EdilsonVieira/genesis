<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Editar Perfil
        </h1>

        <v-sheet class="mx-auto" max-width="300">
          <v-form ref="form">
            <v-text-field v-model="editPerfil.perfil" label="Nome do perfil" required></v-text-field>
            <Vue3JsonEditor
              v-model="menuEditado"
              :show-btns="false"
              :expandedOnStart="false"
              @json-change="onJsonChange"
            />
            <v-btn @click="salvar">Salvar</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
    <Modal v-model="exibirModal" :texto="mensagem"></Modal>
  </v-container>
</template>

<script>

import Modal from "./modal.vue"
import servicoPerfil from "../api/perfil";
import { Vue3JsonEditor } from 'vue3-json-editor'

export default {
  name: "vwEditPerfil",
  components: {
    Modal,
    Vue3JsonEditor
  },
  data: () => ({
    editPerfil: {
      perfil: '',
      menu: '{}'
    },
    exibirModal: false,
    mensagem: '',
    perfis: [],
    perfilSelecionado: null,
    menuEditado: null
  }),

  methods: {
    onJsonChange(novoMenu) {
      console.log(novoMenu)
      this.menuEditado = novoMenu;
    },
    async salvar() {
      this.editPerfil.menu = this.menuEditado;
      await servicoPerfil.updatePerfil(this.editPerfil)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.mensagem = `Perfil salvo com sucesso!`
          this.exibirModal = true;
        })
        .catch(() => {
          this.mensagem = `Falha ao salvar perfil!`
          this.exibirModal = true;
        });
    },
  },

  async mounted() {
    servicoPerfil.getPerfis()
    .then(async (res) => {
      this.perfis = res;
      this.editPerfil = await servicoPerfil.getPerfil(this.$route.params.id);
      this.menuEditado = this.editPerfil.menu;
    })
    .catch((e)=>{
      console.error(JSON.stringify(e));
    });
  }
};

</script>
