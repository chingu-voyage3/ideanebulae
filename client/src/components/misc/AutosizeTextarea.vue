<template>
    <textarea :value="value" @change="onChange" />
</template>

<script>
    import autosize from 'autosize';

    export default {
      props: ['value'],
      methods: {
        onChange(e) {
          this.$emit('update', e.target.value);
        },
      },

      mounted() {
        autosize(this.$el);
      },
    };

</script>