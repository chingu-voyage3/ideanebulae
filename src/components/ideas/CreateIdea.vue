<template>
  <div class="container create">
    <header class="create__header">
      <h1 class="create__title">Create Idea</h1>
    </header>
    
    <section class="create__form__wrapper">
      <div class="create__form__group">
        
        <div class="createidea__form__element">
          <label for="createidea__title">Title</label>
          <input id="createidea__title" maxlength="100" type="text" name="title" v-model="ideaTitle" autofocus>
        </div>

        <div class="createidea__form__element">
          <label for="createidea__desc">Description</label>
          <textarea id="createidea__desc" type="text" name="description" cols="80" rows="13" maxlength="1000" v-model="ideaDesc"></textarea>
        </div>

        <div class="createidea__form__tags">
          <label for="createidea__tags">Tags</label>
          <div class="createidea__info" v-if="tags.length == 0">No tags added yet</div>
          <div id="createidea__tags" class="create__form__tag" v-for="(tag, index) in tags">
            <div class="createidea__link">
              <div class="tag">{{tag}}</div>
              <button id="remove__link" @click="removeTag(index)"> &#10006; </button>
            </div>
          </div>

          <div class="createidea__addtag">
            <label for="newTag">Add Tag</label>
            <input name="newTag" type="text" v-model="tagText" @keyup.enter="addTag">
            <button class="createidea__addlink__button"
            @click="addTag"> + </button>
          </div>
        </div>

        <div class="createidea__form__element">
          <label for="createidea__links">Links to more info</label>
          <div class="createidea__info" v-if="links.length == 0">No links added yet</div>
          <div id="createidea__links" class="create__form__link" v-for="(link, index) in links">
            <div class="createidea__link">
              <a :href="link">{{link}}</a>
              <button id="remove__link" @click="removeLink(index)"> &#10006; </button>
            </div>
          </div>
          
          <div class="createidea__addlink">
            <div v-show="errors.has('newlink')">Invalid link</div>
            <label for="newlink">Add link</label>
            <input name="newlink" v-validate="'required|url'" data-vv-delay="1000" type="text" v-model="linkText" @keyup.enter="addLink">
            <button class="createidea__addlink__button"
            @click="addLink"> + </button>
          </div>
        </div>

        <div class="createidea__form__element">
          <label for="createidea__type">Type</label>
          <div id="createidea__type" @mouseover="upHere = 0" @mouseleave="upHere = -1">
            <input type="radio" name="ideatype" v-validate="'required'" value="0" v-model="ideaType">
            <div class="type__title">Public</div>
            <div class="type__desc" v-if="upHere == 0">Anyone can read and give feedback</div>
          </div>
          <div id="createidea__type" @mouseover="upHere = 1" @mouseleave="upHere = -1" >
            <input type="radio" name="ideatype" value="1" v-model="ideaType">
            <div class="type__title">Private</div>
            <div class="type__desc" v-if="upHere == 1">Only visible to people that agree to the license</div>
          </div>
          <div id="createidea__type" @mouseover="upHere = 2" @mouseleave="upHere = -1" >
            <input type="radio" name="ideatype" value="2" v-model="ideaType">
            <div class="type__title">Custom</div>
            <div class="type__desc" v-if="upHere == 2">Customise the license and choose the people that see the idea</div>
          </div>
        </div>
      </div>

      <div class="createidea__cancel__button">
        <a href="/dashboard">Cancel</a>
      </div>
      <div class="createidea__submit__button">
        <button @click="submitIdea">Submit</button>
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
      tagText: '',
      ideaType: '0',
      upHere: '-1',
      addLinkError: false,
      tags: [],
      links: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
    };
  },
  methods: {
    addLink() {
      let newVal = this.linkText.trim();
      this.$validator.validate('newlink', newVal)
      .then((result) => {
        if (result) {
          if (!/^http[s]?:\/\/.+/.test(newVal)) {
            newVal = `https://${newVal}`;
          }

          this.links.push(newVal);
          this.linkText = '';
        }
      });
    },
    addTag() {
      const newVal = this.tagText.trim();
      if (newVal.length !== 0) {
        this.tags.push(newVal);
        this.tagText = '';
      }
    },
    removeLink(index) {
      this.links.splice(index, 1);
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    submitIdea() {
      const payload = {
        ideaTitle: this.ideaTitle,
        ideaDesc: this.ideaDesc,
        links: this.links,
      };

      console.log(payload);
      //  TODO Submit to server
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
