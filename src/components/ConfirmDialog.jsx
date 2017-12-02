import React from 'react';
import { Dialog, RaisedButton } from 'material-ui';

class ConfirmDialog extends React.Component {
	constructor(){
		super();
		this.state = this.getInitState();
	};

	getInitState = () => ({
		open: false,
		title: '',
		message: '',
	});

	sendResult = (result) => {
		this.state.onResult(result);
		this.hide();
	};

	show = (title, message, callback) => {
		this.setState({
			open: true,
			title: title,
			message: message,
			onResult: callback,
		});
	};

	hide = () => {
		this.setState(this.getInitState());
	};

	render(){
		const actions = [
			<RaisedButton 
				label={"No"}
				onClick={() => this.sendResult(false)}
			/>,
			<RaisedButton
				label={"Yes"}
				primary={true}
				onClick={() => this.sendResult(true)}
			/>
		]
		return(
			<div>
				<Dialog
					title={this.state.title}
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					{this.state.message}
				</Dialog>
			</div>
		)
	}
}

export default ConfirmDialog;