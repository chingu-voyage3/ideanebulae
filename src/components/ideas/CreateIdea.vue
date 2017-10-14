<template>
  <div class="container create">
    <header class="create__header">
      <h1 class="create__title">Create Idea</h1>
    </header>
    <section class="create__form__wrapper">
      <div class="create__form__group">
        <div class="createidea__form__element">
          <label for="createidea__title">Title</label>
          <input id="createidea__title" type="text" name="title" v-model="ideaTitle" autofocus>
        </div>

        <div class="createidea__form__element">
          <label for="createidea__desc">Description</label>
          <textarea id="createidea__desc" type="text" name="description" cols="80" rows="13" maxlength="1000" v-model="ideaDesc"></textarea>
        </div>

        <div class="createidea__form__element">
          <label for="createidea__links">Links to more info</label>
          <div id="createidea__links" class="create__form__link" v-for="(link, index) in links">
            <div :id="'link-'+index" class="createidea__link">
              <a :href="link">{{link}}</a>
              <button id="remove__link"> X </button>
            </div>
          </div>
          <div class="createidea__addlink">
            <div v-if="addLinkError">Invalid link</div>
            <input id="createidea__newlink" type="text" v-model="linkText">
            <button class="createidea__addlink__button"
            @click="addLink"> + </button>
          </div>
        </div>

        <div class="createidea__form__element">
          <label for="createidea__type">Type</label>
          <select name="type" id="createidea__type">
            <option value="">Public</option>
            <option value="">
              <div class="type__title">Private</div>
              <div class="type__desc">Only visible to people that have link</div>
            </option>
            <option value="">Custom <span></span></option>
          </select>
        </div>

      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'CreateIdea',
  data() {
    return {
      ideaTitle: '',
      ideaDesc: '',
      linkText: '',
      addLinkError: false,
      links: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
    };
  },
  methods: {
    addLink() {
      const newVal = this.linkText.trim();
      if (newVal.length !== 0) {
        this.links.push(newVal);
        this.linkText = '';
        this.addLinkError = false;
      } else {
        this.addLinkError = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
