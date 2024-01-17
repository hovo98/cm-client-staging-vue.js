import axios from 'axios'
import store from '../store'
import Vue from 'vue'

let isRefreshing = false
let refreshSubscribers = []
let token = ''
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

if(urlParams.get('id') === null){
	if(localStorage.getItem('auth') !== null){
		const obj = JSON.parse(localStorage.getItem('auth'))
		token = `Bearer ${ obj.access_token }`
	}
} else {
	localStorage.removeItem('auth')
}


const onRefreshed = ( authToken ) => {
  refreshSubscribers.map(callback => callback(authToken))
}

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback)
}

const instance = axios.create({
	baseURL: process.env.VUE_APP_BACKEND_URL,
	headers: {
		Authorization: token,
	},
})

instance.interceptors.request.use(async config => {
	if(localStorage.getItem('auth') !== null){
		const authObject = JSON.parse(localStorage.getItem('auth'))
		token = `Bearer ${ authObject.access_token }`
		config.headers = {
			'Authorization': token,
		}
	}
	return config
})

instance.interceptors.response.use(response => {
	return response
}, async function (error) {
  const config = error.config
  const status = error?.response?.status
	const originalRequest = config

	if (status === 401) {
		if (!isRefreshing) {
			isRefreshing = true
			localStorage.setItem('authRefreshToken', JSON.stringify(true))
			store.dispatch('refreshToken').then(authToken => {
				localStorage.removeItem('authRefreshToken')
				isRefreshing = false
				onRefreshed(authToken)
				refreshSubscribers = []
			})
			.catch(() => {
				localStorage.removeItem('auth')
        localStorage.removeItem('tempToken')
        Vue.$cookies.remove("payments_feature_modal")
				window.location.href = '/login'
			})
		}

		return new Promise(resolve => {
			subscribeTokenRefresh(authToken => {
				originalRequest.headers.Authorization = `Bearer ${authToken}`
				resolve(axios(originalRequest))
			})
		})
	}
	return Promise.reject(error)
})

export default instance