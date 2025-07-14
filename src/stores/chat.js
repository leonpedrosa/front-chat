import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { useUserStore } from './user'

export const useChatStore = defineStore('chat', {
  state: () => ({
    socket: null,
    connectionId: null,
    currentUser: null,
    currentContact: null,
    keepAliveInterval: null,
  }),
  actions: {
    async loadUsers() {
      try {
        const response = await api.get('/user/')
        const userStore = useUserStore()
        userStore.setUsers(response.data.results)
      } catch (err) {
        console.debug('Erro ao carregar usuários', err)
      }
    },

    initSocket(token) {
      const url = `ws://127.0.0.1:8001/ws/auth/?${token}`
      this.socket = new WebSocket(url)

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        // Recebendo dados iniciais da conexão
        if (data.type === 'connected') {
          this.connectionId = data.connection_id
          this.currentUser = data.user
        }

        // recebe broadcast de presença
        else if (data.type === 'presence') {
          const userStore = useUserStore()
          userStore.updateUserPresence(data.user_id, data.is_online)
        }

        // console.debug('WS:', data)
      }

      this.socket.onclose = () => {
        console.debug('WS desconectado')
        this.socket = null
        clearInterval(this.keepAliveInterval)
      }

      this.socket.onerror = (err) => {
        console.debug('Erro WS:', err)
      }
      // Keep-alive
      this.keepAliveInterval = setInterval(() => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.sendMessage({ type: 'keepalive' })
        }
      }, 30000)
    },

    sendMessage(messageObj) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(messageObj))
      }
    },

    setContact(user) {
      this.currentContact = user
    },

    disconnectSocket() {
      if (this.socket) {
        this.socket.close()
        this.socket = null
        clearInterval(this.keepAliveInterval)
      }
    },
  },
})
