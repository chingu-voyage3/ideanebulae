<template>
  <footer class="footer">
  	<div class="footer__text">
  	Made with &hearts; by Chingu Coders
  	</div>
  	<div class="footer__icon">
  		<a href="https://github.com/chingu-coders/Voyage2-Bears-27" target="_blank" rel="noopener noreferrer" title="github">
				<img class="footer__img" src="../../assets/github.svg" alt="github"/>
  		</a>
  	</div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.footer
	display flex
	justify-content space-between
	width 100%
	padding 20px

	&__text
		color $purple
		text-transform uppercase
		letter-spacing 2.5px
		font-size .8em

	&__icon, &__img
		width 20px
		height auto

</style>
