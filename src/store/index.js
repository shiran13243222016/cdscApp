import Vue from 'vue'
import Vuex,{Store} from 'vuex'
import _ from 'lodash'
import cf from '../lib/corFile'

Vue.use(Vuex);
const initState = {
  version: '',
	connected: false,
	deviceDetails: [],
	userInfo: {},
	miners:{},
  miner: {},
	found:{},
	incomes: [],
	header: {},
	gateway:{
		diskInfo:{},
		sysInfo:{},
		eSwarm:{}
	}
};
const mutations = {
	updateState(state,data){
		_.mapKeys(data, (value, key) =>{
      		state[key] = value
		});
	},
	updateAttr(state,{data,domin}){
		let dominData = _.clone(state[domin]);
		_.mapKeys(data, (value, key) =>{
			if(_.isPlainObject(value)){
				dominData[key] = _.extend(dominData[key],value)
			}
			else{
				dominData[key] = value
			}
		});
		state[domin] = dominData;
	}
};
const actions = {
	upBalance({commit}, {suuid,balance}){
		let updata = {};
		updata[suuid] = {balance:balance};
		commit('updateAttr', {data: updata,domin: "miners"})
	},
	upMiner({commit}, miners){
		commit('updateAttr', {data: miners,domin: "miners"})
	}
};
let store = new Store({
	state: _.clone( initState ),
	mutations,
	actions
});
export default store ;





