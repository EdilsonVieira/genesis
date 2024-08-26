<template>
  <div v-if="modelValue" class="modal-backdrop" @click="closeModal">
    <div class="modal-content">
      <v-card>
        <v-card-title>{{ titulo }}</v-card-title>
        <v-card-text>{{ texto }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeModal">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msg-modal',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    titulo: {
      type: String,
      default: 'Mensagem'
    },
    texto: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
