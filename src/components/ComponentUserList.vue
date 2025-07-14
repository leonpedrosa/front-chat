<template>
  <div class="flex flex-right column">
    <!-- SEÇÃO: Você -->
    <q-item clickable @click="selectUser(currentUser)">
      <q-item-section avatar>
        <q-avatar>
          <img :src="currentUser.avatar || avatarUrl(currentUser)" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ currentUser.username }} | Eu</q-item-label>
        <q-item-label caption>
          <q-icon :color="currentUser.is_online ? 'green' : 'grey'" name="circle" size="10px" />
          {{ currentUser.is_online ? 'Online' : 'Offline' }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced inset />

    <div class="flex flex-right flex-center text-center text-grey-7">Amigos</div>
    <template v-if="users.length > 0">
      <q-item v-for="user in users" :key="user.id" clickable @click="selectUser(user)">
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.avatar || avatarUrl(user)" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ avatarName(user) }}</q-item-label>
          <q-item-label caption>
            <q-icon :color="user.is_online ? 'green' : 'grey'" name="circle" size="10px" />
            {{ user.is_online ? 'Online' : 'Offline' }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <div class="q-pa-md text-center text-grey">
        <q-spinner color="primary" size="30px" class="q-mb-sm" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { api } from 'boot/axios'
import { useAuthStore } from 'src/stores/auth'
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
const users = computed(() => userStore.users.filter((u) => u.username !== auth.username))
const currentUser = computed(() => userStore.users.find((u) => u.username === auth.username))
const auth = useAuthStore()

function avatarName(user) {
  if (user.username === auth.username) {
    return `${user.username} | Eu`
  } else {
    return user.username
  }
}

function avatarUrl(user) {
  const nameEncoded = encodeURIComponent(user.username)
  return `https://ui-avatars.com/api/?name=${nameEncoded}&background=random`
}

function selectUser(user) {
  // opcionalmente implemente lógica futura
  console.debug('Usuário selecionado:', user)
}

onMounted(async () => {
  // try {
  const response = await api.get('/user/')
  userStore.setUsers(response.data.results)
  // } catch (err) {
  // console.debug(err)
  // } finally {
  // console.debug('final')
  // }
})
</script>

<style></style>
