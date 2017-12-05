import React from 'react';
import { TextField, Toolbar, ToolbarGroup, Card, CardMedia, IconButton, Table, TableHeader, TableHeaderColumn, TableRow, TableBody, TableRowColumn } from 'material-ui';
import { connect } from 'react-redux';

import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import Paging from '../../components/Paging';
import ConfirmDialog from '../../components/ConfirmDialog'

import ListIcon from 'material-ui/svg-icons/action/list';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import EditIcon from 'material-ui/svg-icons/image/edit';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey100 } from 'material-ui/styles/colors';

import { list as usersList, insert, remove, update } from '../../actions/user';

class ListOfUsers extends React.Component {
	constructor(){
		super();
		this.state = {
			search: ''
		}
	}

	componentDidMount() {
		this.updatePaging(this.props.users.paging.page, this.props.users.paging.size);
	}

	updatePaging = (page, size) => {
		this.props.usersList(page, size);
	}

	handleAddUserDialog = (newUser) => {
		this.props.insert(newUser);
	}

	handleEditUserDialog = (newUser) => {
		this.confirm.show('Edit User','Are you sure you want to edit a User?', (result) => {
			if (result) {
				this.props.update(newUser);
			}
		})
	}

	handleRemove = (id) => {
		this.confirm.show('Delete User','Are you sure you want to delete a User?', (result) => {
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
	
	render() {
		let	tableBody = this.props.users.rows.map((item, index) => <TableRow key={ index }>
			<TableRowColumn>
				{ item.username }
			</TableRowColumn>
			<TableRowColumn>
				{ item.roles.map(key =>{ return key + ' ' }) }
			</TableRowColumn>
			<TableRowColumn style={{textAlign: 'right', width: '150px',}}>
			<IconButton onClick={() => this.EditUserDialog.show(item)}>
					<EditIcon/>
				</IconButton>
				<IconButton onClick={() => this.handleRemove(item._id)}>
					<RemoveIcon/>
				</IconButton>
				<IconButton onClick={() => this.props.history.push('/user-orders/'+item._id)}>
					<ListIcon/>
				</IconButton>
		</TableRowColumn>
		</TableRow>);

		return(
			<div>
				<Card style={{margin: '10px', padding: '20px'}}>
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
												(this.props.usersList(this.props.users.paging.page, this.props.users.paging.size, this.state.search))
											}
										}}
									/>
									<IconButton onClick={() => this.props.usersList(this.props.users.paging.page, this.props.users.paging.size, this.state.search)} >
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
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Role</TableHeaderColumn>
								<TableHeaderColumn style={{textAlign: 'right', width: '150px',}}>
									<IconButton style={{float: 'right',}} onClick={() => this.AddUserDialog.show()} >
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
					<Paging pageSizes={[5, 10, 50, 100]} paging={this.props.users.paging} onNewPaging={(page, size) => this.updatePaging(page, size, this.state.search)} />
					<div style={{clear: 'both'}}></div>
				</Card>
				<AddUserDialog ref={i => this.AddUserDialog = i} onResult={this.handleAddUserDialog}/>
				<EditUserDialog ref={i => this.EditUserDialog = i} onResult={this.handleEditUserDialog}/>
				<ConfirmDialog ref={i => this.confirm = i} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	users: state.user.data
})

const mapDispatchToProps = {
	usersList,
	insert,
	remove,
	update
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfUsers);