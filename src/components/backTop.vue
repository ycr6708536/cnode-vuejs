<template>
	<div class="top-icon" @click="toTop" v-show="show">
		<img src="../assets/toTop.png" width="40" />
	</div>
	
</template>
<script type="text/javascript">
	export default{
		replace: true,
		name: "backToTop",
		data () {
			return {
				show: false
			}
		},
		methods: {
			toTop: () => {
				window.scrollTo(0,0);
				this.show = false;
			}
		},
		ready () {
			window.addEventListener("scroll",() => {
				if(document.body.scrollTop > 80){
					this.show = true;
				}else{
					this.show = false;
				}
			}); 
		}
	}
</script>
<style type="text/css">
	.top-icon{
		position: fixed;
		width: 40px;
		bottom: 10px;
		right: 2px;
		z-index: 9999;
	}
</style>