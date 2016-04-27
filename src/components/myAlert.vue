<template>
	<div  class="myloading" v-show="show">
		<div  class="my-alert-inner"  v-text="content"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['content','show'],
		replace: true
	}
</script>

<style type="text/css">
	.myloading{
		position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
	}
	.my-alert-inner {
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        background-color: rgba(49, 49, 49, 0.8);
        color: #ffffff;
        border-radius: 3px;
        font-size: 14px;
        padding: 18px 25px;
        line-height: 27px;
        vertical-align: middle;
        margin-top: 50%;
    }
</style>