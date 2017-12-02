import React from 'react';
import { MenuItem, SelectField, Dialog, RaisedButton, Table, TableHeader, TableRowColumn,  TableHeaderColumn, TableRow, IconButton, TableBody } from 'material-ui';
import moment from 'moment';

import AddMealDialog from './AddMealDialog';

import AddIcon from 'material-ui/svg-icons/content/add-circle';

import NextIcon from 'material-ui/svg-icons/image/navigate-next';
import PrevIcon from 'material-ui/svg-icons/image/navigate-before';
import { grey100, blue400, blue300 } from 'material-ui/styles/colors';

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
		}
	})
	
	show = (day) => {
		this.setState({open:true, result: {date: moment(day.date).format('YYYY-MM-DD'), _id: day._id, meals: day.meals}})
	}

	handleSizeChange = (event, index, size) => {
		this.props.onPaging(0,size)
	}

	handlePageChange = (page) => {
		this.props.onPaging(this.props.meal.paging.page + page,this.props.meal.paging.size);
	}

	hide = () => {
		this.setState(this.getInitState());
	}

	handleSelect = (rows) => {
		let result = Object.assign({}, this.state.result);
		let meal = this.props.meal.rows[rows[0]];
		result.meals.push(meal);
		result.meals = result.meals.map(item => item._id);
		this.props.onResult(result);
		this.hide();
	}

	handleAddMealDialog = (newMeal) => {
		this.props.insert(newMeal);
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
							<TableHeaderColumn  style={{paddingLeft:'5px', paddingRight:'5px'}}>
								<IconButton style={{float: 'right',}} onClick={() => this.AddMealDialog.show()} >
									<AddIcon />
								</IconButton>
							</TableHeaderColumn>
						</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false} >
							{ tableBody }
						</TableBody>
					</Table>
					<div style={{ float:'right', marginTop: '20px', }}>
						<IconButton style={{ marginTop: '0px', float:'right',}}  onClick={() => this.handlePageChange(1)} disabled={(this.props.meal.paging.page + 1) * this.props.meal.paging.size >= this.props.meal.paging.total? true : false}>
							<NextIcon color={blue400} hoverColor={blue300} />
						</IconButton>
						<span style={{ float:'right', marginTop: '15px' }} >{ (this.props.meal.paging.page+1) + " / " + Math.ceil(this.props.meal.paging.total / this.props.meal.paging.size) }</span>
						<IconButton style={{ marginTop: '0px', float:'right',}} onClick={() => this.handlePageChange(-1)} disabled={this.props.meal.paging.page === 0? true : false}>
							<PrevIcon color={blue400} hoverColor={blue300} />
						</IconButton>
					</div>
					<SelectField style={{ marginLeft: '20px', width: '150px', float: 'right', }} floatingLabelText="Per page" value={this.props.meal.paging.size} onChange={this.handleSizeChange}>
						<MenuItem value="5" primaryText="5" label="5" />
						<MenuItem value="10" primaryText="10" label="10" />
						<MenuItem value="15" primaryText="15" label="15" />
					</SelectField>
				<AddMealDialog ref={i => this.AddMealDialog = i} onResult={this.handleAddMealDialog}/>
				</Dialog>
			</div>
		)
	}
}

export default AddMealDayDialog;