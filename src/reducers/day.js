const getInitState = () => ({
	data: []
});

export const types = {
	data: 'DAY_LIST',
}

const day = (state = getInitState(), action) => {
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

export default day;