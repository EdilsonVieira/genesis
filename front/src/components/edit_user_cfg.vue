<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <!-- <v-img class="align-end text-white" height="200" src="https://randomuser.me/api/portraits/women/17.jpg" cover> -->
        <v-card-title>
          <v-icon color="primary" icon="mdi-file-edit-outline"></v-icon>
          <VSpacer></VSpacer>
          <span>Atualizar Perfil pessoal</span>
        </v-card-title>
      <!-- </v-img> -->

      <v-card-subtitle class="pt-4">
        <h3 v-if="!imagemSrcPerfilPessoal">Clique no ícone para definir a imagem do perfil.</h3>
        <h3 v-if="imagemSrcPerfilPessoal">Clique na imagem para escolher outro arquivo.</h3>
      </v-card-subtitle>

      <v-card-text>
        <div class="imagem-promocao">
          <label class="ponteiro" :for="`imagem_perfil_pessoal_input`">
            <div v-if="!imagemSrcPerfilPessoal">
              <v-icon color="green-darken-2" icon="mdi-account-outline" size="large"></v-icon>
            </div>
            <img class="img-config quadriculado" v-if="imagemSrcPerfilPessoal"
              :src="'data:' + tipoImgPerfilPessoal + ';base64,' + imagemSrcPerfilPessoal"
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
      confirmaPassword: ''
    },
    exibirModal: false,
    mensagem: '',
    tipoImgPerfilPessoal: null,
    imagemSrcPerfilPessoal: null,
    user_id: null,
    avatar_id: null
  }),

  methods: {
    onFileChangeImgPerfilPessoal(e) {
      serializarImagem(e, 0.5).then(resp => {
        this.imagemSrcPerfilPessoal = resp.dados
        this.tipoImgPerfilPessoal = resp.tipo
        if (this.user_id > 0) {
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
      const userId = sessionStorage.getItem('user_id');
      var params = {
        "id": this.avatar_id,
        "tipo": tipoImg,
        "nome": `Imagem_Perfil_Pessoal_${userId}`,
        "dados": img,
        "tabela": "users",
        "fk": `${campo}`,
        "chave": "id",
        "valor": userId,
        "deleteold": true
      }
      //console.error(JSON.stringify(params))
      const cmd = params.id > 0 ? servicoImagem.atualizarImagem : servicoImagem.criarImagem;
      cmd(params)
        .then(() => {
          //console.log('Imagem atualizada:');
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log('Erro ao salvar imagem!');
          console.log(error.response);
        });
    },
    async salvar() {
      //console.log(JSON.stringify(this.credenciais))
      this.userCfg.password = null;
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
    console.log(JSON.stringify(this.config,null,2));
    this.user_id = parseInt(sessionStorage.getItem('user_id'));
    this.avatar_id = parseInt(sessionStorage.getItem('avatar_id'));
    this.imagemSrcPerfilPessoal = sessionStorage.getItem('avatarDados');
    this.tipoImgPerfilPessoal = sessionStorage.getItem('avatarTipo');
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