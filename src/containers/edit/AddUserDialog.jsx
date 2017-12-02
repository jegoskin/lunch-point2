import React from 'react';
import { Dialog, RaisedButton, TextField, Checkbox } from 'material-ui';

class AddUser extends React.Component {
	constructor(){
		super();
		this.state = this.getInitState();
	}

	getInitState = () => ({
		open: false,
		result: {
			username: '',
			roles: [],
			password: '',
		},
		isUser: false,
		isAdmin: false
	})

	show = () => {
		this.setState({open:true})
	}

	sendResult = () => {
		let result = Object.assign({}, this.state.result);
		if (this.state.isAdmin){result.roles.push('Admin')}
		if (this.state.isUser){result.roles.push('User')}
		this.props.onResult(result);
		this.hide();
	}

	hide = () => {
		this.setState(this.getInitState());
	}

	handleChange = (e) => {
		let value = e.currentTarget.value;
		let id = e.currentTarget.id;
		let newState = Object.assign({}, this.state);
		newState.result[id] = value;
		this.setState(newState);
	}

	checkInputs = () => {
		return (
			this.validateUsername() || 
			this.validatePassword()
		 )? true : false;
	}

	validateUsername = () => {
		let name = this.state.result.username;
		if (name !== "")
			return null
		else
			return 'Required field!'
	}

	validatePassword = () => {
		let description = this.state.result.password;
		if (description !== "")
			return null
		else
			return 'Required field!'
	}

	handleCheckAdmin = (isChecked) => {
		let newState = Object.assign({}, this.state);
		newState.isAdmin = isChecked;
		this.setState(newState);
	}

	handleCheckUser = (isChecked) => {
		let newState = Object.assign({}, this.state);
		newState.isUser = isChecked ;
		this.setState(newState);
	}

	render(){
		const actions = [
			<RaisedButton
				label="Cancle"
				onClick={this.hide}
				style={{marginRight: '10px'}}
			/>,
			<RaisedButton
				primary={true}
				label="Add"
				onClick={this.sendResult}
				disabled={this.checkInputs()}
			/>,
		]
		return(
			<div>
				<Dialog
					title="Add new User"
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<TextField 
						floatingLabelText="Username"
						onChange={this.handleChange}
						value={this.state.result.username}
						id="username"
						fullWidth
						errorText={this.validateUsername()}
					/>
					<Checkbox
						label='User'
						style={{marginTop: '25px', width: '120px',}}
						id="isUser"
						labelPosition="left"
						checked={this.state.isUser}
						onCheck={(e, isChecked) => this.handleCheckUser(isChecked)}
					/>
					<Checkbox
						label='Admin'
						style={{marginTop: '25px', width: '120px',}}
						id="isAdmin"
						labelPosition="left"
						checked={this.state.isAdmin}
						onCheck={(e, isChecked) => this.handleCheckAdmin(isChecked)}
					/>
					<TextField 
						floatingLabelText="Password"
						onChange={this.handleChange}
						value={this.state.result.password}
						id="password"
						type="password"
						fullWidth
						errorText={this.validatePassword()}
					/>
				</Dialog>
			</div>
		)
	}

}
export default AddUser