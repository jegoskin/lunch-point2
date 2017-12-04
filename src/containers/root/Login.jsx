import React from 'react';
import { connect } from 'react-redux';

import { login } from '../../actions/app'

import { Paper, TextField, RaisedButton } from 'material-ui';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
	}

	handleChange = (e, newValue) => {
		let id = e.target.id;
		this.setState(Object.assign({}, this.state, { [id]: newValue }))
	}

	handleKeyPress = (e) => {
		let id = e.target.id;
		if (e.key === 'Enter') {
			if (id === 'username')
				this.pass.focus();
			else
				this.submit();
		}
	}

	submit = () => {
		let credential = Object.assign({}, this.state);
		this.props.login(credential);
	}

	render(){
		return(
			<div style={{ width: '500px', margin: '10% auto', }}>
				<Paper zDepth={2} style={{padding: '32px'}}>
					<TextField
						id='username'
						hintText='Password Field'
						floatingLabelText='Username'
						fullWidth
						value={this.state.username}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
					/>
					<TextField
						id='password'
						ref={i => this.pass = i}
						hintText='Password Field'
						floatingLabelText='Password'
						type='password'
						fullWidth
						value={this.state.password}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
					/>
					<RaisedButton style={{float: 'right'}} label='Login' primary={true} onClick={this.submit}/>
					<div style={{clear: 'both'}}/>
				</Paper>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
	login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);