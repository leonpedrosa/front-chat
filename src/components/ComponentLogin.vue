<template>
  <div class="page-wrapper">
    <div class="login-card shadow-2">
      <div class="logo">
        <q-img
          src="../assets/logoComNome.png"
          fit="scale-down"
          style="width: 120px; height: auto"
        />
      </div>

      <q-form @submit="onSubmit" class="login-form">
        <q-input
          v-model="username"
          label="Username"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
        <q-btn
          label="Acessar"
          type="submit"
          color="primary"
          :loading="loading"
          class="full-width q-mt-md"
        />

        <div class="text-grey-6 text-h8 q-pa-md">Esqueci minha senha</div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    const payload = {
      username: username.value,
      password: password.value,
    }

    const response = await api.post('/auth/login/', payload)
    auth.setToken({
      access: response.data.access,
      refresh: response.data.refresh,
      username: response.data.username,
      nickname: 'NicknameTeste',
    })
    router.push('/')
  } catch (err) {
    console.debug(err)
    $q.notify({
      type: 'negative',
      message: 'Falha no login. Verifique suas credencias',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f5f5f5;
}

.login-card {
  width: 320px;
  min-height: 480px;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 24px;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
