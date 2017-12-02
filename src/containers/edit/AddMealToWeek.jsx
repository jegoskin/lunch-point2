import React from 'react';
import { Card, CardMedia, IconButton, Table, TableHeader, TableHeaderColumn, TableRow,TableBody, TableRowColumn } from 'material-ui';
import moment from 'moment';
import { connect } from 'react-redux';

import AddMealDayDialog from './AddMealDayDialog';
import ConfirmDialog from '../../components/ConfirmDialog';

import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import AddBox from 'material-ui/svg-icons/content/add-box';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { blue100, grey100 } from 'material-ui/styles/colors';

import { dayList,	insert, update, remove } from '../../actions/day';
import { list as getMealList  } from '../../actions/meal';

class AddMealToWeek extends React.Component {
	constructor(){
		super();
		this.state = this.getInitState();
	}

	getInitState = () => ({
		open: false,
		result: {
			year: moment().year(),
			week: moment().week(),
		}
	})

	componentDidMount() {
		this.updatePaging(this.props.meal.paging.page, this.props.meal.paging.size);
		this.weekDays();
	}
	updatePaging = (page, size) => {
		this.props.getMealList(page, size);
	}
	weekDays = () => {
		let days = [];

		for (let i = 0; i < 5; i++){
			days.push(moment().year(this.state.result.year).week(this.state.result.week).day(i+1).format('YYYY-MM-DD'));
		}

		this.props.dayList(days);
	}

	handleNextWeek = () => {
		let newState = Object.assign({}, this.state);
		let d = moment().year(newState.result.year);
		newState.result.week++;
		
		if ( newState.result.week > d.weeksInYear() ) {
			newState.result.year++;
			newState.result.week = 1;
		}
		this.setState(newState);
		this.weekDays();
	}
	handlePrevWeek = () => {
		let newState = Object.assign({}, this.state);
		let d = moment().year(newState.result.year);
		newState.result.week--;

		if ( newState.result.week === 0 ) {
			newState.result.year--;
			newState.result.week = d.weeksInYear();
		}
		this.setState(newState);
		this.weekDays();
	}

	handleAddMealDayDialog = (newMealDay) => {
		this.props.update(newMealDay, () => this.weekDays());
	}

	handleDeleteDayMeal = (day, index) => {
		this.confirm.show('Delete Meal','Are you sure you want to delete a Meal?', (result) => {
			if (result) {
				let newDay = Object.assign({}, day);
				newDay.meals.splice(index, 1);
				this.props.update(newDay, () => this.weekDays());
			}
		})
	}

	handleDeleteDay = (id) => {
		this.confirm.show('Delete Day','Are you sure you want to delete a Day?', (result) => {
			if (result) {
				this.props.remove(id, () => this.weekDays());
			}
		})
	}

	render(){
		let table = Object.keys(this.props.days).map((key, index) => <Table style = {{ marginTop: '10px'}} key = { index }>
			<TableHeader
				style={{ backgroundColor: grey100, }}
				displaySelectAll={false}
				adjustForCheckbox={false}
				enableSelectAll={false}
				>
			<TableRow>
				<TableHeaderColumn style={{fontSize: '20px',}}>
					<strong> { moment(key).format('dddd') } </strong>
					{ moment(key).format('DD.MM.YYYY') }
				</TableHeaderColumn>
				<TableHeaderColumn></TableHeaderColumn>
				<TableHeaderColumn style={{textAlign: 'right', overflow: 'visible' }}>
				{ this.props.days[key]._id && <IconButton title="Day Delete" onClick = {() => this.handleDeleteDay(this.props.days[key]._id)} style={{padding: '0', width: '30px', height: '30px',}}><DeleteIcon/></IconButton>}
				</TableHeaderColumn>
			</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false} >
				{	
					this.props.days[key].meals && this.props.days[key].meals.map((item, index)  => 
						<TableRow key={index}>
							<TableRowColumn>
								{ item.name }
							</TableRowColumn>
							<TableRowColumn>
								{ item.description }
							</TableRowColumn>
							<TableRowColumn style={{width: '70px', textAlign: 'right', paddingRight: '0px',}}>
								{ item.price + ' CZK' }
							</TableRowColumn>
							<TableRowColumn style={{textAlign: 'right', width: '30px', }}>
								<IconButton title="Meal Remove" onClick = {() => this.handleDeleteDayMeal(this.props.days[key], index)}  style={{padding: '0', width: '30px', height: '30px',}}>
									<RemoveIcon/>
								</IconButton>
							</TableRowColumn>
						</TableRow>
					)
				}
				<TableRow >
					<TableRowColumn style={{textAlign: this.props.days[key]._id? 'left' : 'center'}}>
						{ this.props.days[key]._id && <IconButton title="Add Meal" onClick = {() => this.addMealDayDialog.show(this.props.days[key])} style={{padding: '0', width: '30px', height: '30px',}}><AddIcon/></IconButton>}
						{ !this.props.days[key]._id && <IconButton title="Add Day" onClick = {() => this.props.insert({ date: key }, () => this.weekDays() )} style={{padding: '0', width: '30px', height: '30px',}}><AddBox/></IconButton>}
					</TableRowColumn>
				</TableRow>
			</TableBody>
			</Table>
	);

		return(
			<div>
				<Card style={{marginTop: '10px', padding: '20px',}}>
					<CardMedia>
						<div style={{backgroundColor: blue100, height: '48px', padding: '0px', }}>
							<IconButton title="Previous Week" style={{float: 'left', width: '42px', height: '42px', }} onClick={ () => this.handlePrevWeek() } ><LeftIcon style={{ width: '42px', height: '42px', }} /></IconButton>
							<div style={{float: 'left', marginTop: '15px', }}><strong>Week { this.state.result.week }</strong>/ { this.state.result.year } </div>
							<IconButton title="Next Week" style={{float: 'right',}} onClick={ () => this.handleNextWeek() }><RightIcon /></IconButton>
						</div>
						<div style={{clear: 'both', width: '100%',}}>
							{ table }
						</div>
					</CardMedia>
				</Card>
				<AddMealDayDialog ref={i => this.addMealDayDialog = i} meal={this.props.meal} onResult={this.handleAddMealDayDialog} onPaging={(page,size) => this.updatePaging(page,size)} />
				<ConfirmDialog ref={i => this.confirm = i} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	meal: state.meal.data,
	days: state.day.data
})

const mapDispatchToProps = {
	getMealList,
	dayList,
	insert,
	update,
	remove,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMealToWeek);

