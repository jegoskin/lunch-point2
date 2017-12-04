import api from '../api/api';
import moment from 'moment';
const types = require('../reducers/day').types;

export const dayList = ( days ) => (dispatch) => {
	let startDate = days[0];
	let endDate = days[days.length-1];
	api.dayList(startDate, endDate)
		.then(data => {
			let _days = {};
			days.forEach(item => {
				_days[item] = {}
			});
			data.forEach(item => {
				_days[moment(item.date).format('YYYY-MM-DD')] = item
			});
			dispatch({
				type: types.data,
				payload: _days,
			})
		})
		.catch(err => console.log(err))
}

export const insert = ( item, callback ) => (dispatch) => {
	api.insert('day', item)
		.then(data => {
			callback();
		})
		.catch(err => console.log(err))
}

export const update = ( item, callback ) => (dispatch) => {
	api.update('day', item)
		.then(data => {
			callback();
		})
		.catch(err => console.log(err))
}

export const remove = ( item, callback ) => (dispatch) => {
	api.delete('day', item)
		.then(data => {
			callback();
		})
		.catch(err => console.log(err))
}