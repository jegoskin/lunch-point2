const logs = (state = [], action) => {
	let newState = state.slice(0);
	switch (action.type) {
		case '@@redux/INIT':
			break;
		case 'LOG': {
			newState.push(action.payload);
			console.log(action.payload)
		}
	}
	return newState;
}
export default logs;