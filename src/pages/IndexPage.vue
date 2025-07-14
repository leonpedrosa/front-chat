<template>
  <q-page class="column">
    <ChatHeader />
    <q-separator />
    <ChatBox />
    <q-separator />
    <MessageInput />
  </q-page>
</template>

<script setup>
import ChatHeader from 'src/components/ComponentChatHeader.vue'
import ChatBox from 'src/components/ComponentChatBox.vue'
import MessageInput from 'src/components/ComponentMessageInput.vue'
import { onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useChatStore } from 'src/stores/chat'

const auth = useAuthStore()
const chat = useChatStore()

onMounted(() => {
  chat.initSocket(auth.accessToken)
})
</script>
