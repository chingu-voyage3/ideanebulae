<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
            </slot>
          </div>

          <div class="modal-buttons">
              <button class="btn btn__primary splash__button modal-button" @click="emitAnswer('cancel')">
                Cancel
              </button>
              <button class="btn btn__primary splash__button" @click="emitAnswer('accept')">
                Accept Terms
              </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalDialog',
  data() {
    return {
      showDialog: false,
    };
  },
  mounted() {
    // TODO: Do something
  },
  methods: {
    emitAnswer(answer) {
      this.showDialog = false;
      this.$emit(answer);
    },
  },
};
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    max-width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  }

  .modal-header {
    margin-top: 0;
    color: #7c48c2;
    font-weight: 100;
    font-size: 48px;
    line-height: .8em;
    text-align: center;
    padding-top: 10px;
  }

  .modal-footer {
    color: #7c48c2;
    font-weight: 300;
    font-size: 24px;
    text-align: center;
    padding-top: 20px;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-p {
    margin-bottom: 20px;
  }

  .modal-proper {
    text-tranform: capitalize;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .modal-button {
    margin-right: 10px;
  }
  /*
  * The following styles are applied automatically by Vue.js to page elements
  * in the transition when they become visible.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>