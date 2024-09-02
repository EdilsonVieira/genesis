<template>
  <div class="user">
    <div class="mx-auto" style="padding:20px;max-width:300px;">Perfis</div>

    <v-data-table :headers="headers" :items="itens">

      <template v-slot:[`item.perfil`]="{ item }">
        <v-text-field :id="`perfil_${item.id}`" :ref="`pefil_${item.id}`" v-model="itemEditado.perfil"
          :hide-details="true" dense single-line v-if="item.id === itemEditado.id"></v-text-field>
        <span v-else>
          <router-link :to="`/edit_perfil/${item.id}`">
            {{ item.perfil }}
          </router-link>
        </span>
      </template>

      <template v-slot:[`item.menu`]="{ item }">
        <v-text-field :id="`menu${item.id}`" :ref="`menu${item.id}`" v-model="itemEditado.menu" :hide-details="true"
          dense single-line v-if="item.id === itemEditado.id"></v-text-field>
        <span v-else>{{ item.menu }}</span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div style="display: flex; align-items: center">
          <div v-if="item.id === itemEditado.id">
            <v-icon color="red" class="mr-3" @click="fecharEditar()">
              mdi-window-close
            </v-icon>
            <v-icon color="green" @click="salvarItem()">
              mdi-content-save
            </v-icon>
          </div>
          <div v-else>
            <v-icon class="light-green" @click="abrirEditar(item)" title="Editar">
              mdi-pencil
            </v-icon>
          </div>
        </div>
      </template>

    </v-data-table>
    <v-btn v-if="indiceEditado === -1" small color="success" @click="novoPerfil()">
      + NOVO PERFIL
    </v-btn>

  </div>
</template>

<script>

import servicoPerfil from "../api/perfil";

export default {
  name: "vwPerfil",

  data: () => ({
    itens: [],
    itemDefault: {
      id: 0,
      perfil: 'Novo',
      menu: {}
    },
    itemEditado: {},
    indiceEditado: -1,
    headers: [
      { key: 'id', title: 'ID' },
      { key: 'perfil', title: 'Perfil' },
      { key: 'menu', title: 'Menu' },
      { key: 'actions', title: "Ações" },
    ],
  }),

  methods: {
    async carregarPerfis() {
      this.itens = await servicoPerfil.getPerfis();
      //console.log(JSON.stringify(this.itens));
    },
    abrirEditar(item) {
      this.indiceEditado = this.itens.indexOf(item);
      this.itemEditado = Object.assign({}, item);
    },
    fecharEditar() {
      setTimeout(() => {
        this.itemEditado = {};
        this.indiceEditado = -1;
      }, 300);
    },
    atualizarItem() {
      servicoPerfil.updatePerfil(this.itemEditado)
        .then(() => {
          // mensagem ao usuário...
          this.fecharEditar();
        })
        .catch((e) => {
          console.error(e);
          this.fecharEditar();
        });
    },
    criarItem() {
      servicoPerfil.createPerfil(this.itemEditado)
        .then(() => {
          // mensagem ao usuário...
          this.fecharEditar();
        })
        .catch((e) => {
          console.error(e);
          this.fecharEditar();
        });
    },
    async salvarItem() {
      //console.log(`teste salvar`)
      if (this.indiceEditado > -1) {
        Object.assign(this.itens[this.indiceEditado], this.itemEditado);
      }
      console.log(this.itemEditado)
      if (this.itemEditado.id > 0) {
        await this.atualizarItem();
      } else {
        this.itemEditado.menu = {};
        await this.criarItem();
      }
      this.carregarPerfis();
    },
    novoPerfil() {
      this.itens.push(this.itemDefault);
      this.indiceEditado = this.itens.length - 1;
      console.log(this.itens[this.indiceEditado]);
      this.itemEditado = Object.assign({}, this.itemDefault);
    },
  },

  mounted() {
    this.carregarPerfis();
  },
};

</script>