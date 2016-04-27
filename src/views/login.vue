<template>
	<nav-con page-type="登录" ></nav-con>
	<section class="login-form">
		<div class="label">
        <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
    </div>
    <div class="label">
    	<a class="button" @click="login">登录</a>
    </div>
	</section>
	<my-alert :show="alert.show" :content="alert.txt"></my-alert>
</template>

<script type="text/javascript">
	import navCon from '../components/Nav'
	import myAlert from '../components/myAlert'

	export default {
		data () {
			let self = this;
			return {
				token: '',
				redirect: '/list',
				alert: {
					show: false,
					txt: '',
					hideFn: function(){
						let timer;
            clearTimeout(timer);
            timer = setTimeout(function () {
                self.alert.show = false;
            }, 1000);
					}
				}

			}
		},
		route: {
			data (transition) {
				let query = transition.to.query,redirect = query.redirect || '/list';
				
				this.redirect = redirect;
			}
		},
		methods: {
			login (){
				let self = this;
				if(self.token == ""){
					let text = "令牌格式错误,应为36位UUID字符串";
          self.alert.txt = text;
          self.alert.show = true;
          self.alert.hideFn();
				}
				$.ajax({
					url: '/api/v1/accesstoken',
					data:{accesstoken:self.token},
					type:'post',
					dataType: 'json',
					success: function(data){
						localStorage.loginName = data.loginname;
						localStorage.avatar_url = data.avatar_url;
						localStorage.userId = data.id;
						localStorage.token = self.token;
						let redirect = decodeURIComponent(self.redirect || '/list');
						window.console.log(redirect);
						self.$route.router.go(redirect);
					},
					error: function(data){
						var error = JSON.parse(data.responseText);
            self.alert.txt = error.error_msg;
            self.alert.show = true;
            self.alert.hideFn();
            return false;
					}
				});
			}
			
		},
		components: {
			navCon,
			myAlert
		}
	}
	
</script>

<style type="text/css">
	.login-form{
		padding: 50px 15px;
	}
	.label{
		display: inline-block;
    width: 100%;
    margin-top: 15px;
    position: relative;
    left: 0;
    top: 0;
	}
	.txt{
		padding: 12px 0;
    border: none;
    border-bottom: 1px solid #444;
    background-color: transparent;
    width: 100%;
    font-size: 14px;
    color: #313131;
	}
	.button{
		display: inline-block;
    margin-bottom: 0;
    width: 25%;
    position: absolute;
    left: 37%;
    top:0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background: #444;
    color: #fff;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    border-radius: 3px;
	}
</style>