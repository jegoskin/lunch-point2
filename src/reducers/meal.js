const getInitState = () => ({
	data: {
		paging: {
			size: 5,
			page: 0,
			total: 0
		},
		rows: []
	}
});

export const types = {
	data: 'MEAL_LIST',
}

const meal = (state = getInitState(), action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case types.data: {
			newState.data = action.payload;
			break;
		}
		default:
			break;
	}
	return newState;
}

export default meal;