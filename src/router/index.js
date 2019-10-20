import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes: [
		{
			path: '/',
			name: 'Home',
			redirect: 'first',
			component: resolve => require(['@/components/pages/Home.vue'], resolve),
			children: [
				{
					path: '/first',
					name: 'First',
					component: resolve => require(['@/components/pages/First.vue'], resolve),
					meta: {
						requireAuth: true
					}
				},
				{
					path: '/my',
					name: 'My',
					component: resolve => require(['@/components/pages/My.vue'], resolve),
					meta: {
						requireAuth: true
					}
				},
			]
		},
		{
			path: '/detail',
			name: 'Detail',
			component: resolve => require(['@/components/pages/Detail.vue'], resolve),
		},
		{
			path: '/addDevice',
			name: 'AddDevice',
			component: resolve => require(['@/components/pages/AddDevice.vue'], resolve),
		},
		{
			path: '/selectDisk',
			name: 'SelectDisk',
			component: resolve => require(['@/components/pages/SelectDisk.vue'], resolve),
		},
		{
			path: '/setPort',
			name: 'SetPort',
			component: resolve => require(['@/components/pages/SetPort.vue'], resolve),
		},
		{
			path: '/setIp',
			name: 'SetIp',
			component: resolve => require(['@/components/pages/SetIp.vue'], resolve),
		},
		{
			path: '/takeCoin',
			name: 'TakeCoin',
			component: resolve => require(['@/components/pages/TakeCoin.vue'], resolve),
		},
		{
			path: '/takeRecord',
			name: 'TakeRecord',
			component: resolve => require(['@/components/pages/TakeRecord.vue'], resolve),
		},
		{
			path: '/wallet',
			name: 'Wallet',
			component: resolve => require(['@/components/pages/Wallet.vue'], resolve),
		},
		{
			path: '/help',
			name: 'Help',
			component: resolve => require(['@/components/pages/Help.vue'], resolve),
		},
		{
			path: '/helpProfit',
			name: 'HelpProfit',
			component: resolve => require(['@/components/pages/help/HelpProfit.vue'], resolve),
		},
		{
			path: '/helpProfitDetails',
			name: 'HelpProfitDetails',
			component: resolve => require(['@/components/pages/help/HelpProfitDetails.vue'], resolve),
		},
		{
			path: '/deviceInfo',
			name: 'DeviceInfo',
			component: resolve => require(['@/components/pages/help/DeviceInfo.vue'], resolve),
		},
		{
			path: '/deviceInfoDetails',
			name: 'DeviceInfoDetails',
			component: resolve => require(['@/components/pages/help/DeviceInfoDetails.vue'], resolve),
		},
		{
			path: '/myWallet',
			name: 'MyWallet',
			component: resolve => require(['@/components/pages/help/MyWallet.vue'], resolve),
		},
		{
			path: '/myWalletDetails',
			name: 'MyWalletDetails',
			component: resolve => require(['@/components/pages/help/MyWalletDetails.vue'], resolve),
		},
		{
			path: '/hardDevice',
			name: 'HardDevice',
			component: resolve => require(['@/components/pages/help/HardDevice.vue'], resolve),
		},
		{
			path: '/hardDeviceDetails',
			name: 'HardDeviceDetails',
			component: resolve => require(['@/components/pages/help/HardDeviceDetails.vue'], resolve),
		},
		{
			path: '/introduce',
			name: 'Introduce',
			component: resolve => require(['@/components/pages/help/Introduce.vue'], resolve),
		},
		{
			path: '/introduceDetails',
				name: 'IntroduceDetails',
			component: resolve => require(['@/components/pages/help/IntroduceDetails.vue'], resolve),
		},
		{
			path: '/netHard',
			name: 'NetHard',
			component: resolve => require(['@/components/pages/help/NetHard.vue'], resolve),
		},
		{
			path: '/netHardDetails',
			name: 'NetHardDetails',
			component: resolve => require(['@/components/pages/help/NetHardDetails.vue'], resolve),
		},
		{
			path: '/helpDisk',
			name: 'HelpDisk',
			component: resolve => require(['@/components/pages/help/HelpDisk.vue'], resolve),
		},
		{
			path: '/helpDiskDetails',
			name: 'HelpDiskDetails',
			component: resolve => require(['@/components/pages/help/HelpDiskDetails.vue'], resolve),
		},
		{
			path: '/bindRelate',
			name: 'BindRelate',
			component: resolve => require(['@/components/pages/help/BindRelate.vue'], resolve),
		},
		{
			path: '/bindRelateDetails',
			name: 'BindRelateDetails',
			component: resolve => require(['@/components/pages/help/BindRelateDetails.vue'], resolve),
		},
		{
			path: '/login',
			name: 'Login',
			component: resolve => require(['@/components/common/Login.vue'], resolve),
			meta: {
				requireAuth: false
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: resolve => require(['@/components/common/Register.vue'], resolve),
			meta: {
				requireAuth: false
			}
		},
		{
			path: '/modifyPass',
			name: 'ModifyPass',
			component: resolve => require(['@/components/common/ModifyPass.vue'], resolve),
			meta: {
				requireAuth: false
			}
		},
		{
      path: '/modifyInfo',
      name: 'ModifyInfo',
      component: resolve => require(['@/components/common/ModifyInfo.vue'], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/bindExchange',
      name: 'bindExchange',
      component: resolve => require(['@/components/pages/BindIframe.vue'], resolve),
      meta: {
        requireAuth: false
      }
    }
  ]
})
