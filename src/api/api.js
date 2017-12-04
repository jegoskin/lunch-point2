import axios from 'axios';
const url = 'http://int-php-web:9999/';

class Api {
	login(username, password) {
		return new Promise ((resolve, reject) => {
			axios.post(url + 'auth', { username, password })
			.then(response => resolve({ data: response.data }))
			.catch(err => alert(err.message))
		})
	}
	logout() {
		return new Promise ((resolve, reject) => {})
	}
	dayList(startDate, endDate) {
		return new Promise((resolve, reject) => {
			axios.get(url + `day?from=${startDate}&to=${endDate}`)
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	list(collection, page = 0, size = 5, search) {
		return new Promise((resolve, reject) => {
			axios.get(url + `${collection}?page=${page}&size=${size}${search && '&search=' + search}`)
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	get(collection, id) {
		return Promise((resolve, reject) => {
			axios.get(url + `${this.endpoint}${collection}/${id}`)
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	insert(collection, object) {
		return new Promise((resolve, reject) => {
			axios.put(url + `${collection}`, {data: object})
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	update(collection, object) {
		return new Promise((resolve, reject) => {
			axios.post(url + `${collection}`, {data: object})
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	delete(collection, id) {
		return new Promise((resolve, reject) => {
			axios.delete(url + `${collection}/${id}`)
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	order(user_id, date, meal_id) {
	console.log({user_id, date, meal_id});
		return new Promise((resolve, reject) => {
			axios.post(url + 'order', { user_id, date, meal_id })
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	unorder(user_id, date, meal_id) {
		return new Promise((resolve, reject) => {
			axios.post(url + 'unorder', {user_id, date, meal_id})
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
	orderList(from, to, user_id) {
		return new Promise((resolve, reject) => {
			axios.get(url + `orders?user=${user_id}&from=${from}&to=${to}`)
			.then(response => resolve(response.data))
			.catch(err => alert(err.message))
		})
	}
}

const api = new Api();

export default api;