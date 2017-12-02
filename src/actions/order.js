import api from '../reducers/api';
const types = require('../reducers/order').types;

export const orderList = ( days, user_id ) => (dispatch) => {
	let startDate = days[0];
	let endDate = days[days.length-1];

	api.orderList(startDate, endDate, user_id)
		.then(data => {
			dispatch({
				type: types.orderList,
				payload: data,
			})
		})
		.catch(err => console.log(err))
}

export const order = ( {user_id, date, meal_id}, callback ) => (dispatch) => {
	api.order(user_id, date, meal_id)
		.then(data => {
			callback();
		})
		.catch(err => console.log(err))
}

export const unorder = ( {user_id, date, meal_id}, callback ) => (dispatch) => {
	api.unorder(user_id, date, meal_id)
		.then(data => {
			callback();
		})
		.catch(err => console.log(err))
}