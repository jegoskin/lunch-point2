const getInitState = () => ({
	data: []
});

export const types = {
	orderList: 'ORDER_LIST',
}

const order = (state = getInitState(), action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case types.orderList: {
			newState.data = action.payload;
			break;
		}
		default:
			break;
	}
	return newState;
}

export default order;