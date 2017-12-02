import { combineReducers } from 'redux';
import layout from './app';
import meal from './meal';
import day from './day';
import order from './order';
import user from './user';

const app = combineReducers({
	layout,
	meal,
	day,
	order,
	user
})

export default app;