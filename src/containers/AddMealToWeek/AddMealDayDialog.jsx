import React from 'react';
import { Dialog, RaisedButton, Table, Toolbar, ToolbarGroup, TableHeader, TableRowColumn, TableHeaderColumn, TableRow, IconButton, TableBody, TextField } from 'material-ui';
import moment from 'moment';

import Paging from '../../components/Paging';

import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey100 } from 'material-ui/styles/colors';

class AddMealDayDialog extends React.Component {
	constructor(){
		super();
		this.state = this.getInitState();
	}

	getInitState = () => ({
		open: false,
		result: {
			_id: '',
			date: '',
			meals: []
		},
		search: ''
	})

	show = (day) => {
		this.setState({open:true, result: {date: moment(day.date).format('YYYY-MM-DD'), _id: day._id, meals: day.meals}})
	}

	updatePaging = (page, size, search) => {
		this.props.onPaging(page, size, search);
	}

	hide = () => {
		this.setState(this.getInitState());
	}

	handleSearchChange = (e) => {
		let value = e.currentTarget.value;
		let newState = Object.assign({}, this.state);
		newState.search = value;
		this.setState(newState);
	}

	handleSelect = (rows) => {
		let result = Object.assign({}, this.state.result);
		let meal = this.props.meal.rows[rows[0]];
		result.meals.push(meal);
		result.meals = result.meals.map(item => item._id);
		this.props.onResult(result);
		this.hide();
	}

	render(){
		const actions = [
			<RaisedButton
				label="Cancle"
				onClick={this.hide}
				style={{marginRight: '10px'}}
			/>
		]  

		let	tableBody = this.props.meal.rows.map((item, index) => <TableRow key={ index }> 
			<TableRowColumn style={{paddingRight:'5px'}}>
				{ item.name }
			</TableRowColumn>
			<TableRowColumn style={{paddingLeft:'5px', paddingRight:'5px'}}>
				{ item.description }
			</TableRowColumn>
			<TableRowColumn style={{paddingLeft:'5px', textAlign: 'right',}}>
				{ item.price + ' CZK'}
			</TableRowColumn>
		</TableRow>);

		return(
			<div>
				<Dialog
					title={"Add Meal for " + moment(this.state.result.date).format('DD.MM.YYYY')}
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<div>
						<Toolbar>
							<ToolbarGroup firstChild={true}>
							</ToolbarGroup>
							<ToolbarGroup>
								<TextField 
									hintText="Search"
									onChange={this.handleSearchChange}
									value={this.state.search}
									id="search"
									onKeyPress={event => {
										if (event.key === "Enter") {
											(this.updatePaging(this.props.meal.paging.page, this.props.meal.paging.size,this.state.search))
										}
									}}
								/>
								<IconButton onClick={() => this.updatePaging(this.props.meal.paging.page, this.props.meal.paging.size,this.state.search)} >
									<SearchIcon />
								</IconButton>
							</ToolbarGroup>
						</Toolbar>
					</div>
					<Table
						style={{ marginTop: '10px'}}
						onRowSelection={(e) => this.handleSelect(e)}
						multiSelectable={false}
					>
						<TableHeader
							style={{ backgroundColor: grey100, }}
							displaySelectAll={false}
							adjustForCheckbox={false}
							enableSelectAll={false}
						>
						<TableRow >
							<TableHeaderColumn style={{paddingRight:'5px'}}>Name</TableHeaderColumn>
							<TableHeaderColumn style={{paddingLeft:'5px', paddingRight:'5px'}}>Description</TableHeaderColumn>
							<TableHeaderColumn style={{paddingLeft:'5px', paddingRight:'5px'}}>Price</TableHeaderColumn>
						</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false} >
							{ tableBody }
						</TableBody>
					</Table>
					<Paging pageSizes={[5, 10, 50, 100]} paging={this.props.meal.paging} onNewPaging={(page, size) => this.updatePaging(page, size)} />
				</Dialog>
			</div>
		)
	}
}

export default AddMealDayDialog;