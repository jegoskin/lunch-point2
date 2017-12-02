import React from 'react';
import { Card, CardMedia, IconButton, Table, TableHeader, TableHeaderColumn, TableRow, TableBody, TableRowColumn } from 'material-ui';
import moment from 'moment';
import { connect } from 'react-redux';

import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import { blue100, grey100 } from 'material-ui/styles/colors';

import { dayList } from '../../actions/day';
import { orderList } from '../../actions/order';

class UserOrders extends React.Component {
constructor(){
	super();
	this.state = this.getInitState();
}

getInitState = () => ({
	open: false,
	result: {
		year: moment().year(),
		month: moment().month(), 
	}
})

componentDidMount() {
	this.monthDays();
}

monthDays = () => {
	let days = [];
	let daysInMonth = moment([this.state.result.year, this.state.result.month]).daysInMonth();

	for (let i = 0; i < daysInMonth; i++){
		days.push(moment([this.state.result.year, this.state.result.month, i+1]).format('YYYY-MM-DD'));
	}

	this.props.orderList(days,this.props.match.params.id);
}

handleNextMonth = () => {
	let newState = Object.assign({}, this.state);
	newState.result.month++;
	
	if ( newState.result.month > 11 ) {

		newState.result.year++;
		newState.result.month = 0;
	}
	this.setState(newState);
	this.monthDays();
}
handlePrevMonth = () => {
	let newState = Object.assign({}, this.state);
	newState.result.month--;

	if ( newState.result.month === -1 ) {
		newState.result.year--;
		newState.result.month = 11;
	}
	this.setState(newState);
	this.monthDays();
}

totalPrice = (currentPrice) => {
	let newState = Object.assign({}, this.state.totalPrice);
	newState = newState + currentPrice;
	this.setState(newState);

	return currentPrice
}

render() {
	let table = this.props.orders.length === 0 ? 
	<TableRow>
		<TableRowColumn  colSpan={5} >
			Nothing Order in this Month!
		</TableRowColumn>
	</TableRow> 
	
	: (this.props.orders.map((item, index) => {
		return (
			<TableRow key={index}>
				<TableRowColumn style={{width: '75px'}}>
				{ moment(item.date).format('DD.MM.YYYY') }
				</TableRowColumn>
				<TableRowColumn>
					{ item.amount }
				</TableRowColumn>
				<TableRowColumn>
					{ item.meal.name }
				</TableRowColumn>
				<TableRowColumn>
					{ item.meal.description }
				</TableRowColumn>
				<TableRowColumn style={{width: '70px', textAlign: 'right',}}>
					{ item.meal.price + ' CZK'}
				</TableRowColumn>
			</TableRow>
		)}
	));

	return(
		<div>
			<Card style={{marginTop: '10px', padding: '20px',}}>
				<CardMedia>
					<div style={{backgroundColor: blue100, height: '48px', padding: '0px', }}>
						<IconButton tooltip="Previous Month" style={{float: 'left', width: '42px', height: '42px', }} onClick={ () => this.handlePrevMonth() } ><LeftIcon style={{ width: '42px', height: '42px', }} /></IconButton>
						<div style={{float: 'left', marginTop: '15px', }}><strong>Month { this.state.result.month + 1 }</strong>/ { this.state.result.year } </div>
						<IconButton tooltip="Next Month" style={{float: 'right',}} onClick={ () => this.handleNextMonth() }><RightIcon /></IconButton>
					</div>
					<div style={{clear: 'both', width: '100%',}}>
					<Table style = {{ marginTop: '10px'}}>
						<TableHeader
							style={{ backgroundColor: grey100, }}
							displaySelectAll={false}
							adjustForCheckbox={false}
							enableSelectAll={false}
							>
							<TableRow>
								<TableHeaderColumn style={{width: '75px'}}>Date</TableHeaderColumn>
								<TableHeaderColumn>Piece</TableHeaderColumn>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Description</TableHeaderColumn>
								<TableHeaderColumn style={{width: '70px'}}>Price</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false} >
							{ table }
							<TableRow>
								<TableRowColumn>
								</TableRowColumn>
								<TableRowColumn>
								</TableRowColumn>
								<TableRowColumn>
								</TableRowColumn>
								<TableRowColumn>
									<strong>
									{ this.props.orders.length !== 0 && 'Total price:' }
									</strong>
								</TableRowColumn>
								<TableRowColumn style={{width: '70px', textAlign: 'right',}}>
									<strong>
										{ this.props.orders.length !== 0 && this.props.orders.reduce((accumulator, item) => accumulator + item.meal.price*item.amount, 0) + ' CZK' }
									</strong>
								</TableRowColumn>
							</TableRow>
						</TableBody>
					</Table>
					</div>
				</CardMedia>
			</Card>
		</div>
	)
}
}

const mapStateToProps = (state) => ({
	orders: state.order.data,
	days: state.day.data
})

const mapDispatchToProps = {
	dayList,
	orderList
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);