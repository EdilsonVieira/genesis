<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon color="primary" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer temporary v-model="drawer">
      <v-list-item title="App Treino" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="(item,index) in itens" :key="`item_index_${index}`" 
        :title="item.titulo" 
        :prepend-icon="item.icone"
        link :to="item.link"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <div id="app">
          
          <!-- <nav>
            <router-link to="/">Login</router-link> |
            <router-link to="/home">Home</router-link> |
            <router-link to="/users">Usuários</router-link> |
            <router-link to="/perfis">Perfis</router-link> |
            <router-link to="/sobre">Sobre</router-link>
          </nav> -->

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
    //itens: []
    //
    drawer: null
  }),
  computed: {
    itens() {
      try {
        return JSON.parse(localStorage.getItem('menu'));
      } catch (e) {
        console.error(e);
        return ['Erro ao buscar o menu']
      }
    }
  },
  mounted() {

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
