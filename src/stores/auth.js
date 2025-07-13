import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    username: localStorage.getItem('username'),
    nickname: localStorage.getItem('nickname'),
  }),
  getters: {
    getUsername: (state) => state.username,
    getNickname: (state) => state.nickname,
  },
  actions: {
    setToken({ access, refresh, username, nickname }) {
      this.accessToken = access
      this.refreshToken = refresh
      this.username = username
      this.nickname = nickname

      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('username', username)
      localStorage.setItem('nickname', nickname)
    },
    clearTokens() {
      this.accessToken = null
      this.refreshToken = null
      this.username = null
      this.nickname = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('username')
      localStorage.removeItem('nickname')
    },
  },
})
