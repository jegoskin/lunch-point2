import api from '../reducers/api';
const types = require('../reducers/user').types;

export const list = ( page, size, search ) => (dispatch) => {
	api.list('user', page, size, search)
		.then(data => {
			dispatch({
				type: types.data,
				payload: data,
			})
		})
		.catch(err => console.log(err))
}

export const insert = ( item ) => (dispatch) => {
	api.insert('user', item)
		.then(data => {
			dispatch(list());
		})
		.catch(err => console.log(err))
}

export const update = ( item ) => (dispatch) => {
	api.update('user', item)
		.then(data => {
			dispatch(list());
		})
		.catch(err => console.log(err))
}

export const remove = ( item ) => (dispatch) => {
	api.delete('user', item)
		.then(data => {
			dispatch(list());
		})
		.catch(err => console.log(err))
}