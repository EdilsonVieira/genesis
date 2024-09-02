<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <v-img class="align-end text-white" height="200" src="https://randomuser.me/api/portraits/women/17.jpg" cover>
        <v-card-title>
          <v-icon color="primary" icon="mdi-file-edit-outline"></v-icon>
          <span>Editando o perfil pessoal</span>
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        <h3 v-if="!imagemSrcPerfilPessoal">Clique no ícone para definir uma imagem para o perfil pessoal.</h3>
        <h3 v-if="imagemSrcPerfilPessoal">Clique na imagem para escolher outro arquivo.</h3>
      </v-card-subtitle>

      <v-card-text>
        <div class="imagem-promocao">
          <label class="ponteiro" :for="`imagem_perfil_pessoal_input`">
            <div v-if="!imagemSrcPerfilPessoal">
              <v-icon color="green-darken-2" icon="mdi-account-outline" size="large"></v-icon>
            </div>
            <img class="img-config quadriculado" v-if="imagemSrcPerfilPessoal"
              :src="'data:' + userCfg.tipoImgPerfilPessoal + ';base64,' + imagemSrcPerfilPessoal"
              :id="`imagem_perfil_pessoal_img`" />
          </label>
          <input :id="`imagem_perfil_pessoal_input`" :name="`imagem_perfil_pessoal_input`"
            @change="onFileChangeImgPerfilPessoal" type="file" accept="image/png,image/jpg,image/jpeg" class="ponteiro"
            style="display:none;">
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="salvar">Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <Modal v-model="exibirModal" :texto="mensagem"></Modal>
  </v-container>
</template>

<script>

import Modal from "./modal.vue"
import servicoUsuario from "../api/usuario";
import servicoImagem from "../api/imagem";
import { serializarImagem } from '../util/imagem'

export default {
  name: "vwEditUser",
  components: {
    Modal
  },
  data: () => ({
    userCfg: {
      username: '',
      password: '',
      confirmaPassword: '',
      tipoImgPerfilPessoal: null
    },
    exibirModal: false,
    mensagem: '',
    perfis: [],
    perfilSelecionado: null,
    imagemSrcPerfilPessoal: null,
  }),

  methods: {
    onFileChangeImgPerfilPessoal(e) {
      serializarImagem(e, 0.5).then(resp => {
        this.imagemSrcPerfilPessoal = resp.dados
        this.tipoImgPerfilPessoal = resp.tipo
        if (this.userCfg.id > 0) {
          this.salvarImagem(resp.tipo, resp.dados, 'avatar_id');
        }
      }).catch(er => {
        console.error(er)
      })
    },
    salvarImagem(tipoImg, img, campo) {
      if (!img.length > 0) {
        console.error("Imagem inválida!");
        return;
      }
      const userId = (this.usuario?.id?this.usuario.id:1);
      var params = {
        "tipo": tipoImg,
        "nome": `Imagem_Perfil_Pessoal ${userId}`,
        "dados": img,
        "tabela": "users",
        "fk": `${campo}`,
        "chave": "id",
        "valor": userId,
        "idusuario": userId,
        "deleteold": true
      }
      //console.error(JSON.stringify(params))
      servicoImagem.atualizarImagem(params)
        .then(() => {
          console.log('Imagem atualizada:');
        })
        .catch((error) => {
          console.log('Erro ao salvar imagem!');
          console.log(error.response);
        });
    },
    pickImage() {
      console.log(`pickImage`)
    },
    async salvar() {
      //console.log(JSON.stringify(this.credenciais))
      this.userCfg.password = null;
      this.userCfg.perfil_id = this.perfilSelecionado;
      await servicoUsuario.updateUser(this.userCfg)
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
    //   this.userCfg = await servicoUsuario.getUser(this.$route.params.id);
    //   this.perfilSelecionado = this.userCfg.perfil_id;
    // })
    // .catch((e)=>{
    //   console.error(JSON.stringify(e));
    // });
  }
};

</script>

<style scoped>
.imagem-promocao {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.imagem-promocao img {
  border-radius: 2.55rem;
  padding: 10px;
  width: auto;
  text-align: center;
}

.ponteiro {
  cursor: pointer;
}

.img-config {
  max-width: 250px;
}

.quadriculado {
  background:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}
</style>