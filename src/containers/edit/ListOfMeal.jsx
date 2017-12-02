import React from 'react';
import { Card, CardMedia, IconButton, TextField, Table, TableHeader, TableHeaderColumn, TableRow, TableBody, TableRowColumn, Toolbar, ToolbarGroup } from 'material-ui';
import { connect } from 'react-redux';

import AddMealDialog from './AddMealDialog';
import EditMealDialog from './EditMealDialog';
import Paging from '../../components/Paging';
import ConfirmDialog from '../../components/ConfirmDialog'

import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import EditIcon from 'material-ui/svg-icons/image/edit';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey100 } from 'material-ui/styles/colors';

import { list as getList, insert, remove, update } from '../../actions/meal';

class WeekEdit extends React.Component {
	constructor(){
		super();
		this.state = {
			search: ''
		}
	}
	componentDidMount() {
		this.updatePaging(this.props.meal.paging.page, this.props.meal.paging.size);
	}
	updatePaging = (page, size) => {
		this.props.getList(page, size);
	}
	handleAddMealDialog = (newMeal) => {
		this.props.insert(newMeal);
	}
	handleEditMealDialog = (newMeal) => {
		this.confirm.show('Edit Meal','Are you sure you want to edit a Meal?', (result) => {
			if (result) {
				this.props.update(newMeal);
			}
		})
	}
	handleRemove = (id) => {
		this.confirm.show('Delete Meal','Are you sure you want to delete a Meal?', (result) => {
			if (result) {
				this.props.remove(id);
			}
		})
	}
	handleSearchChange = (e) => {
		let value = e.currentTarget.value;
		let newState = Object.assign({}, this.state);
		newState.search = value;
		this.setState(newState);
	}
	render(){
	let	tableBody = this.props.meal.rows.map((item, index) => <TableRow key={ index }>
			<TableRowColumn style={{paddingRight:'5px'}}>
				{ item.name }
			</TableRowColumn>
			<TableRowColumn style={{paddingLeft:'5px', paddingRight:'5px'}}>
				{ item.description }
			</TableRowColumn>
			<TableRowColumn style={{paddingLeft:'5px', paddingRight:'5px'}}>
			{ item.price + ' CZK' }
			</TableRowColumn>
			<TableRowColumn style={{paddingLeft:'5px', paddingRight:'5px', textAlign: 'right', width: '100px',}}>
				<IconButton onClick={() => this.EditMealDialog.show(item)}>
					<EditIcon/>
				</IconButton>
				<IconButton onClick={() => this.handleRemove(item._id)}>
					<RemoveIcon/>
				</IconButton>
			</TableRowColumn>
		</TableRow>);

		return(
			<div>
				<Card style={{marginTop: '10px', padding: '20px'}}>
					<CardMedia>
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
												(this.props.getList(this.props.meal.paging.page, this.props.meal.paging.size,this.state.search))
											}
										}}
									/>
									<IconButton onClick={() => this.props.getList(this.props.meal.paging.page, this.props.meal.paging.size,this.state.search)} >
										<SearchIcon />
									</IconButton>
								</ToolbarGroup>
							</Toolbar>
						</div>
						<div>
						<Table style={{ marginTop: '10px',}}>
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
								<TableHeaderColumn  style={{paddingLeft:'5px', paddingRight:'5px', width: '100px'}}>
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
						</div>
					</CardMedia>
					<Paging pageSizes={[5, 10, 50, 100]} paging={this.props.meal.paging} onNewPaging={(page, size) => this.updatePaging(page, size)} />
					<div style={{clear: 'both'}}></div>
			</Card>
				<AddMealDialog ref={i => this.AddMealDialog = i} onResult={this.handleAddMealDialog}/>
				<EditMealDialog ref={i => this.EditMealDialog = i} onResult={this.handleEditMealDialog}/>
				<ConfirmDialog ref={i => this.confirm = i} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	meal: state.meal.data,
})

const mapDispatchToProps = {
	getList,
	insert,
	remove,
	update,
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekEdit);

