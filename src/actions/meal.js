import api from '../reducers/api';
const types = require('../reducers/meal').types;

export const list = ( page, size, search ) => (dispatch) => {
	api.list('meal', page, size, search)
		.then(data => {
			dispatch({
				type: types.data,
				payload: data,
			})
		})
		.catch(err => console.log(err))
}

export const insert = ( item ) => (dispatch) => {
	api.insert('meal', item)
		.then(data => {
			dispatch(list());
		})
		.catch(err => console.log(err))
}

export const update = ( item ) => (dispatch) => {
	api.update('meal', item)
		.then(data => {
			dispatch(list());
		})
		.catch(err => console.log(err))
}

export const remove = ( item ) => (dispatch) => {
	api.delete('meal', item)
		.then(data => {
			dispatch(list());
		})
		.catch(err => console.log(err))
}