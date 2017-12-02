import React from 'react';
import { Dialog, RaisedButton, TextField } from 'material-ui';

class EditMealDialog extends React.Component {
	constructor(){
		super();
		this.state = this.getInitState();
	}

	getInitState = () => ({
		open: false,
		result: {
			_id: '',
			name: '',
			description: '',
			price: '',
		}
	})

	show = (result) => {
		this.setState({
			open: true,
			result: {
				_id: result._id,
				name: result.name,
				description: result.description,
				price: result.price,
			}
		});
	}

	sendResult = () => {
		let result = Object.assign({}, this.state.result);
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
			this.validateName() || 
			this.validateDescription() || 
			this.validatePrice() )? true : false;
	}

	validateName = () => {
		let name = this.state.result.name;
		if (name !== "")
			return null
		else 
			return 'Required field!'
	}

	validateDescription = () => {
		let description = this.state.result.description;
		if (description !== "")
			return null
		else 
			return 'Required field!'
	}

	validatePrice = () => {
		let price = this.state.result.price;
		if (price !== "")
			return null
		else 
			return 'Required field!'
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
				label="Update"
				onClick={this.sendResult}
				disabled={this.checkInputs()}
			/>,
		]
		return(
			<div>
				<Dialog
					title="Edit Meal"
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<TextField 
						floatingLabelText="Name"
						onChange={this.handleChange}
						value={this.state.result.name}
						id="name"
						fullWidth
						errorText={this.validateName()}
					/>
					<TextField 
						floatingLabelText="Description"
						onChange={this.handleChange}
						value={this.state.result.description}
						id="description"
						fullWidth
						errorText={this.validateDescription()}
					/>
					<TextField 
						floatingLabelText="Price"
						onChange={this.handleChange}
						value={this.state.result.price}
						id="price"
						type="number" 
						min="1" 
						fullWidth
						errorText={this.validatePrice()}
					/>
				</Dialog>
			</div>
		)
	}

}
export default EditMealDialog