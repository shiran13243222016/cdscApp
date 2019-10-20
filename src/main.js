// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import App from './App'
import wsClinet from './lib/wsClinet.js'
import RestClient from './lib/restClient'
import Moment from 'moment';
import {LoadingPlugin, ConfirmPlugin, numberComma} from 'vux'
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);

Vue.filter('toThousands', function (value) {
	return numberComma(value);
});
Vue.filter('formatime',function(value){
	return value ? Moment(value).format('YYYY-MM-DD hh:mm') : '';
});

FastClick.attach(document.body);
Vue.prototype.wsClinet = new wsClinet(store);
Vue.prototype.RestClient = RestClient;

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		let role = localStorage.getItem("token");
		if(!role) {
			next({
				path: '/login'
			})
		}else {
			next();
		}
	}else {
		next();
	}
});

/*------------------加载cordova插件------------------------*/
const loadJs = (url,cb) => {
	let script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	let loaded = false;
	let loadFunction = function () {
		if (loaded) return;
		loaded = true;
		cb && cb();
	};
	script.onload = loadFunction;
	script.onreadystatechange = loadFunction;
	document.getElementsByTagName("head")[0].appendChild(script);
};

const loadCordova = () => {
	if(/RunningWithCordova/i.test(navigator.userAgent)){
		let cordova_name = "";
		if(/android/i.test(navigator.userAgent)){
			cordova_name =  '/static/android/cordova.js'
		}
		else if(/iPhone/i.test(navigator.userAgent)){
			cordova_name =  '/static/ios/cordova.js'
		}
		
		if(cordova_name){
			loadJs(cordova_name,function(){
				document.addEventListener('deviceready', function(){
					// console.log('cordova start');
					// initMiner()
				}, false);
			});
		}
	}
};

loadCordova();

document.addEventListener('deviceready', function () {
  if (cordova.getAppVersion) {
    cordova.getAppVersion.getVersionNumber().then((version) => {
      store.commit("updateState", {version: version});
    })
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box');
