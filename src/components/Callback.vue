<template>

</template>

<script>
import { setIdToken, setAccessToken } from '@/auth';

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      // Once we get back to the callback url
      // the tokens must be stored and the page
      // reloaded for the store to kick in
      setAccessToken();
      setIdToken();
      window.location.href = '/';
    });
  },
}
</script>
