<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>SocketTalk </q-toolbar-title>

        <div>
          <q-btn color="red" label="SAIR" @click="logout"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <!-- <q-list> -->
      <!-- <q-item-label header> Amigos </q-item-label> -->
      <UserList />
      <!-- </q-list> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import UserList from '../components/ComponentUserList.vue'
import { onMounted, onBeforeMount } from 'vue'
import { useChatStore } from 'src/stores/chat'

const router = useRouter()
const auth = useAuthStore()
const chat = useChatStore()

onMounted(() => {
  chat.loadUsers()
  chat.initSocket(auth.accessToken)
})

onBeforeMount(() => {
  chat.disconnectSocket()
})
function logout() {
  chat.disconnectSocket()
  auth.clearTokens()
  router.push('/login')
}

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
