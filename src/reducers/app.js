const getInitState = () => ({
	login: {
		data: {
			username: '',
			roles: []
		},
	}
})

export const types = {
	login: 'APP_LOGIN',
	login_success: 'APP_LOGIN_SUCCESS',
	logout: 'APP_LOGOUT',
}	

const layout = (state = getInitState(), action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case types.login: {
			newState.login = {
				data: {
					username: '',
					roles: []
				},
			}
			break;
		}
		case types.login_success: {
			newState.login = action.payload	
			break;
		}
		case types.logout: {
			newState.login = {
				data: {
					username: '',
					roles: []
				},
			};
			break;
		}
		default:
			break;
	}
	return newState;
}

export default layout;