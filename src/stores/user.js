import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    setUsers(list) {
      this.users = list
    },
    updateUserPresence(userId, isOnLine) {
      console.debug('update user', userId, isOnLine)
      const index = this.users.findIndex((u) => u.id === userId)
      if (index !== -1) {
        this.users[index].is_online = isOnLine
      }
    },
  },
})
