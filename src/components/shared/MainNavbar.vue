<template>
  <nav>
    <ul>
      <li v-show="!isLoggedIn()" @click="handleLogin()">Login</li>
      <li v-show="isLoggedIn()" @click="handleLogout()">Logout</li>
    </ul>
  </nav>
</template>

<script>
import { isLoggedIn, login, logout } from '@/auth';

export default {
  name: 'MainNavbar',
  methods: {
    handleLogin() {
      login();
    },

    handleLogout() {
      logout();
    },

    isLoggedIn() {
      return isLoggedIn();
    },
  }
};
</script>

<style language="stylus" scoped>

</style>
