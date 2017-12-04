import api from '../api/api';
const types = require('../reducers/app').types;

export const login = ({ username, password }) => (dispatch) => {
	dispatch({
		type: types.login
	})
	api.login(username, password)
		.then(data => {
			dispatch({
				type: types.login_success,
				payload: data
			})
		})
		.catch(err => console.log(err))
}

export const logout = () => (dispatch) => {
	dispatch({
		type: types.logout
	})
	api.logout()
		.then(data => {
			dispatch({
				type: types.logout,
				payload: data
			})
		})
		.catch(err => console.log(err))
}