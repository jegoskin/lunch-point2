import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { log, asyncLog } from '../../actions/log';

class Root extends Component {
  constructor() {
    super();
    this.state = this.getInitState();
  }
  getInitState = () => ({})
  componentDidMount() {
    this.props.log('Root mount');
    this.props.asyncLog('Async root mount');
  }
  render() {
    return (
      <Router>
        <div>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
            </ul>
          </div>
          <Route exact path='/' component={() => <h1>Home</h1>}/>
          <Route exact path='/about' component={() => <h1>About</h1>}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  logs: state.logs
})

const mapDispatchToProps = {
  log: log,
  asyncLog: asyncLog
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
