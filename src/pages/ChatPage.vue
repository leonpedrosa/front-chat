<template>
  <q-page>
    <div style="" class="flex items-center justify-center">
      <Chat
        :mensagem="messageSend"
        style="width: 400px; border: 1px solid green"
      />
    </div>
    <div class="flex full-width justify-between" style="">
      <div style="width: 40%">
        Tutuco
        <q-input v-model="message" rounded />
        <q-btn @click="sendMessage">Enviar</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import Chat from "components/ChatComponent.vue";

const messageSend = ref("");

const message = ref("");

const sendMessage = () => {
  messageSend.value = message.value;
  message.value = "";
};
</script>
