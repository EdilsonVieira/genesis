<template>
 <div class="user">
     <div class="mx-auto" style="padding:20px;max-width:300px;">Usuários</div>
     <!--<ul>
       <li v-for="user in itens" :key="user.username">
         {{ user.username }}
       </li>
     </ul>-->
     <v-data-table :headers="headers" :items="itens">

    <template v-slot:[`item.username`]="{ item }">
        <v-text-field
          :id="`username_${item.id}`"
          :ref="`username_${item.id}`"
          v-model="itemEditado.username"
          :hide-details="true"
          dense
          single-line
          v-if="item.id === itemEditado.id"
        ></v-text-field>
        <span v-else>
          <router-link :to="`/edit_user/${item.id}`">
            {{ item.username }}
          </router-link>
        </span>
      </template>

    <template v-slot:[`item.password`]="{ item }">
        <v-text-field
          :id="`password${item.id}`"
          :ref="`password${item.id}`"
          v-model="itemEditado.password"
          :hide-details="true"
          dense
          single-line
          v-if="item.id === itemEditado.id"
        ></v-text-field>
        <span v-else>{{ item.password }}</span>
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
      <v-btn v-if="indiceEditado === -1" small color="success" @click="novoUsuario()">
          + NOVO USUÁRIO
      </v-btn>     

   </div>
</template>

<script>

//import dados from "../api";
import servicoUsuario from "../api/usuario";

export default {
  name: "vwUser",

  data: () => ({
    itens: [],
    itemDefault: {
      id: 0, 
      username: 'Novo',
      password: '123456'
    },    
    itemEditado: {},
    indiceEditado: -1,
    headers: [
      { key: 'id', title: 'ID' },
      { key: 'nome_completo', title: 'Nome' },
      { key: 'username', title: 'Usuário' },
      { key: 'perfil.perfil', title: 'Perfil' },
      { key: 'actions', title: "Ações"  },
    ],
  }),

  methods: {
    async carregarUsuarios() {
      this.itens = await servicoUsuario.getUsers();
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
      servicoUsuario.updateUser(this.itemEditado)
      .then(()=>{
        // mensagem ao usuário...
        this.fecharEditar();
      })
      .catch((e)=>{
        console.error(e);
        this.fecharEditar();
      });
    },
    criarItem(){
      servicoUsuario.createUser(this.itemEditado)
      .then(()=>{
        // mensagem ao usuário...
        this.fecharEditar();
      })
      .catch((e)=>{
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
        this.itemEditado.password = '123456'
        await this.criarItem();
      }
      this.carregarUsuarios();
    },
    novoUsuario() {
      this.itens.push(this.itemDefault);
      this.indiceEditado = this.itens.length-1;
      console.log(this.itens[this.indiceEditado]);
      this.itemEditado = Object.assign({}, this.itemDefault);
    },
  },

  mounted() {
    this.carregarUsuarios();    
  },   
};

</script>