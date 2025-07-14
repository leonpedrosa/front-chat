import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const url = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001/api/'
const api = axios.create({ baseURL: url })

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config
    const auth = useAuthStore()

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axios.post(url + 'auth/refresh/', {
          refresh: auth.refresh,
        })

        auth.accessToken = response.data.access
        originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`

        return api(originalRequest)
      } catch (err) {
        auth.clearTokens()
        const router = useRouter()
        router.push('/login')

        return Promise.reject(err)
      }
    }

    return Promise.reject(err)
  },
)
export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
