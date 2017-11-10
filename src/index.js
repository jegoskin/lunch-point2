import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Root from './containers/root/Root';
import reducer from './reducers'

const middleware = applyMiddleware(thunk, createLogger());

const store = createStore(reducer, middleware);

ReactDOM.render(
	<Provider store={store}>
		<Root />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
