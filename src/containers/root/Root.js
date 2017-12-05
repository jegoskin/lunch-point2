import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppBar, Drawer, MenuItem, IconButton, IconMenu } from 'material-ui';

import Login from './Login';
import WeekList from '../WeekList/WeekList';
import ListOfMeal from '../ListOfMeal/ListOfMeal';
import AddMealToWeek from '../AddMealToWeek/AddMealToWeek';
import UserOrders from '../UserOrders/UserOrders';
import ListOfUsers from '../ListOfUsers/ListOfUsers';
import { login, logout } from '../../actions/app';

import { grey50 } from 'material-ui/styles/colors';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuBarIcon from 'material-ui/svg-icons/navigation/more-vert';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

import './Root.css';

function isInRole(roles, role) {
  if(roles.findIndex(item => item === role) > -1)
    return true;
  else
    return false;
}

export class NavBarMain extends React.Component {
  constructor() {
    super();
    this.state = this.getInitState();
  }

  getInitState = () => ({
    drawerToggle: false,
    logIn: false
  })

  handleDrawerClick = (item) => {
    let newState = Object.assign({}, this.state);
      if (item) {
        newState.drawerToggle = false;
        this.props.history.push(item);
      } else if (this.state.drawerToggle === false) {
        newState.drawerToggle = true;
      } else {
        newState.drawerToggle = false;
      }
    this.setState(newState);
  }

  render(){
    return(
      <div>
      <AppBar
        onTitleTouchTap={() => this.handleDrawerClick('/')}
        title="Lunch Point"
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MenuBarIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Logout" onClick={() => this.props.logout()} leftIcon={<ExitIcon />} />
          </IconMenu>
        }
        iconElementLeft={ <IconButton onClick={() => this.handleDrawerClick()}><Menu color={grey50} style={{width: '30px', height: '30px', marginTop: '8px',}} /></IconButton> }
      />
      <Drawer
        width={300}
        docked={false}
        open={this.state.drawerToggle}
        onRequestChange={() => this.handleDrawerClick()}
        >
        <AppBar
          style={{width: '295px !important',}}
          onTitleTouchTap={() => this.handleDrawerClick('/')}
          title="Lunch Point"
          iconElementLeft={ <IconButton onClick={() => this.handleDrawerClick()}><Menu color={grey50} style={{width: '30px', height: '30px', marginTop: '8px',}} /></IconButton> }
        />
        { isInRole(this.props.loginRoles.data.roles, "Admin") && <MenuItem onClick={() => this.handleDrawerClick('/meal')} primaryText="List Of Meal"/> }
        { isInRole(this.props.loginRoles.data.roles, "Admin") && <MenuItem onClick={() => this.handleDrawerClick('/users')} primaryText="List Of Users"/> }
        { isInRole(this.props.loginRoles.data.roles, "Admin") && <MenuItem onClick={() => this.handleDrawerClick('/meal-to-week')} primaryText="Add Meal To Week"/> }
        { isInRole(this.props.loginRoles.data.roles, "User") && <MenuItem onClick={() => this.handleDrawerClick('/')} primaryText="Week menu"/> }
        { isInRole(this.props.loginRoles.data.roles, "User") && <MenuItem onClick={() => this.handleDrawerClick('/user-orders/' + this.props.loginRoles.data._id)} primaryText="User Orders"/> }
      </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginRoles: state.layout.login
})

const mapDispatchToProps = {
  logout,
  login
}

const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarMain));

class Root extends React.Component {
  render() {
    const main = (
      <Router>
        <div>
        <NavBar/>
            { <Route exact path='/meal' component={isInRole(this.props.login.data.roles, "Admin")? ListOfMeal : (() => (<Redirect to='/' />))} /> }
            { <Route exact path='/users' component={isInRole(this.props.login.data.roles, "Admin")? ListOfUsers : (() => (<Redirect to='/' />))} /> }
            { <Route exact path='/meal-to-week' component={isInRole(this.props.login.data.roles, "Admin")? AddMealToWeek : (() => (<Redirect to='/' />))} /> }
            { <Route exact path='/' component={isInRole(this.props.login.data.roles, "User")? WeekList : (() => (<Redirect to='/meal' />))} /> }
            { <Route exact path='/user-orders/:id' component={UserOrders} /> }
        </div>
      </Router>
    )
  return (
    <div>
      { this.props.login.data.username !== ""? main : <Login /> }
    </div>
  );
  }
}

const root_mapStateToProps = (state) => ({
  login: state.layout.login
})

const root_mapDispatchToProps = {
}

export default connect(root_mapStateToProps, root_mapDispatchToProps)(Root);