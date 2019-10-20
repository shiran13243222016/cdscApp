import Vue from 'vue'
import {AlertPlugin, LoadingPlugin, ToastPlugin} from 'vux'
import router from '../router'
import axios from 'axios'
import qs from 'qs'
import P from 'bluebird'
import _ from 'lodash'
import {BASE_URL} from '../config'

Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

// let router = null
// const initRoute = (val) =>{
// 	router = val
// }
const getRequest = (url,data) => {
    let urlData = url;
    urlData += _.isEmpty(data) ? '' : `?${queryParameters(data)}`;
    return request({url: urlData,method:'GET'});
};

const request = (options) => {
    options.headers = options.headers || {};
    options.baseURL =  BASE_URL;
    options.headers['Authorization'] = localStorage.getItem("token") || "";
    options.timeout = options.timeout || 5000;
    let isOk = true;
    Vue.$vux.loading.show({
        text: 'Loading'
    })
    return axios(options).then((response) => {
        if (response.status > 400) {
            isOk = false;
        }
        if(response.data.code == 200) {
            if(response.headers.authorization) {
                localStorage.setItem("token", response.headers.authorization)
            }
        }else if(response.data.code == 201 || response.data.code == 202) {
            Vue.$vux.toast.show({
                type: 'warn',
                text: response.data.message
            })
            router.push('/login')
        }else {
            Vue.$vux.toast.show({
                type: 'warn',
                text: response.data.message
            })
        }
        return response;
    }).then((res)=>{
        return isOk ? P.resolve(res) : P.reject(res);
    }).catch((error) => {
		if(error.response && error.response.data.code == 401 && router){
			localStorage.setItem("token","")
			router.push({ path: '/login' })
		}
        return P.reject(_.isString(error) ? new Error(error) : error);
    })
      .finally(() => {
          Vue.$vux.loading.hide()
      });
};

const postRequest  = (url, options={}) => {
    return request( {
		url:url,
        data: qs.stringify(options.body),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: options.method || 'POST',
    });
};

const queryParameters = data => Object.keys(data)
    .map(key => [key, data[key]].map(encodeURIComponent).join('='))
    .join('&');

const query = (params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    return {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
        filter: JSON.stringify(params.filter),
    };
};

export {
    getRequest,
    postRequest
};
