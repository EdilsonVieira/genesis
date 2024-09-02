<template>
  <v-app>
    <!-- Barra superior do app -->
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="primary" variant="text" @click.stop="menuPrincipal = !menuPrincipal"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>App Treino</v-app-bar-title>
      <template v-slot:append>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/17.jpg" 
          title="App Treino"
          subtitle="Vuetify"
          @click.stop="userDrawer = !userDrawer"
        ></v-list-item>
      </template>
    </v-app-bar>
    <!-- Menu Principal -->
    <v-navigation-drawer temporary v-model="menuPrincipal">
      <v-divider></v-divider>
      <v-list-item v-for="(item, index) in itens" :key="`item_index_${index}`" :title="item.titulo"
        :prepend-icon="item.icone" link :to="item.link"></v-list-item>
    </v-navigation-drawer>
    <!-- Menu do Usuário -->
    <v-navigation-drawer temporary v-model="userDrawer" location="right">
      <v-list-item :title="`Perfil Pessoal`"
        prepend-icon="mdi-account-edit-outline" link to="/user/cfg"></v-list-item>
      <v-divider></v-divider>
      <v-list-item :title="`Logout`"
        prepend-icon="mdi-logout" link to="/logout"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <div id="app">
          <router-view></router-view>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'app',

  components: {
    //
  },

  data: () => ({
    menuPrincipal: null,
    userDrawer: null,
    menuItens: []
  }),
  
  watch: {
    '$route'() {
      this.carregarMenu(); // Recarrega o menu sempre que a rota mudar
    }
  },

  computed: {
    itens() {
      return this.menuItens;
    }
  },
  methods: {
    carregarMenu() {
      try {
        this.menuItens = JSON.parse(sessionStorage.getItem('menu'));
      } catch (e) {
        console.error(e);
        this.menuItens = ['Erro ao buscar o menu'];
      }
    }
  },
  mounted() {
    this.carregarMenu();
  }
}
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';

nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
