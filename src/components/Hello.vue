<template>
  <div class="hello">
    <h1>{{ count }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  computed: {
    count() {
      return this.$store.state.counter.number;
    },
  },
  methods: {
    increment() {
      this.$store.dispatch('INCREMENT_NUMBER_COUNT');
    },

    decrement() {
      this.$store.dispatch('DECREMENT_NUMBER_COUNT');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
