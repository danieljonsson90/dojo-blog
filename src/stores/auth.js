// stores/auth.js
import { defineStore } from 'pinia';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    _ready: false,
  }),
  actions: {
    initAuth() {
      // Immediate check
      this.user = auth.currentUser;

      // Set up listener for future changes
      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this._ready = true;
      });
    },
  },
  getters: {
    isReady: (state) => state._ready,
    currentUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
  },
});
