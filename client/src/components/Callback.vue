<template>
  <h1>Callback</h1>
</template>

<script>
import { setIdToken, setAccessToken } from '@/auth';

export default {
  name: 'Callback',
  mounted() {
    // Once we get back to the callback url
    // the tokens must be stored and the page
    // reloaded for the store to kick in
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      window.location.href = '/';
    });
  },
};
</script>
