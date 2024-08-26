<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Você saiu do Sistema!
        </h1>

        <v-sheet class="mx-auto" max-width="300">
          <v-form ref="form">
            <v-btn @click="login">Clique aqui para logar novamente.</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "user-logout",
  components: {

  },
  data: () => ({
  }),

  methods: {
    async login() {
      this.$router.push('/');
    },
  },

  mounted() {
    localStorage.clear();
    sessionStorage.clear();
  }
};

</script>
