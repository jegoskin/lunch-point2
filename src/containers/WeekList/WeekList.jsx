import React from 'react';
import { Card, CardMedia, IconButton, Table, TableHeader, TableHeaderColumn, TableRow, TableBody, TableRowColumn } from 'material-ui';
import moment from 'moment';
import { connect } from 'react-redux';

import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import { blue100, grey100 } from 'material-ui/styles/colors';

import { dayList } from '../../actions/day';
import { order, unorder, orderList } from '../../actions/order';

class WeekList extends React.Component {
	constructor(){
		super();
		this.state = this.getInitState();
	}

	getInitState = () => ({
		open: false,
		result: {
			year: moment().year(),
			week: moment().week()
		}
	})

	componentDidMount() {
		this.weekDays();
	}

	weekDays = () => {
		let days = [];
		for (let i = 0; i < 5; i++){
			days.push(moment().year(this.state.result.year).week(this.state.result.week).day(i+1).format('YYYY-MM-DD'));
		}
		this.props.dayList(days);
		this.props.orderList(days,this.props.login.data._id);
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

	handleMealOrder = (mealId, date) => {
		this.props.order({user_id: this.props.login.data._id, date, meal_id: mealId}, () => this.weekDays());
	}

	handleMealUnorder = (mealId, date) => {
		this.props.unorder({user_id: this.props.login.data._id,	date,	meal_id: mealId}, () => this.weekDays());
	}

	render() {
		let table = Object.keys(this.props.days).map((key, index) => {
			let body = this.props.days[key].meals && this.props.days[key].meals.map((meal, index) => {
				let order = this.props.orders.filter(order => moment(order.date).format('YYYY-MM-DD') === key).find(order => order.meal._id === meal._id);
				return (
					<TableRow key={index}>
						<TableRowColumn style={{textAlign: 'right', overflow: 'visible', width: '75px', padding: '0'}}>
							<IconButton title="Add Meal" onClick = {() => this.handleMealOrder(meal._id, key)} style={{padding: '0', width: '30px',  height: '30px',}}><AddIcon/></IconButton>
							{ order? <IconButton title="Remove Meal" onClick = {() => this.handleMealUnorder(meal._id, key)} style={{padding: '0', width: '30px',  height: '30px',}}><RemoveIcon/></IconButton> : null }
						</TableRowColumn>
						<TableRowColumn style={{width: '10px', paddingRight: '0px',}}>
							{ order? order.amount : 0 }
						</TableRowColumn>
						<TableRowColumn>
							{ meal.name }
						</TableRowColumn>
						<TableRowColumn>
							{ meal.description }
						</TableRowColumn>
						<TableRowColumn style={{width: '70px', textAlign: 'right',}}>
							{ meal.price + ' CZK'}
						</TableRowColumn>
					</TableRow>)
			})
			return (
				<Table style = {{ marginTop: '10px'}} key = { index }>
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
						<TableHeaderColumn></TableHeaderColumn>
					</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} >
						{ body }
					</TableBody>
				</Table>
			)
		})
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
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	days: state.day.data,
	login: state.layout.login,
	orders: state.order.data
})

const mapDispatchToProps = {
	dayList,
	orderList,
	order,
	unorder
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList);