import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducers from './reducers';

console.clear();

ReactDOM.render(
	<Provider store={ createStore(reducers, composeWithDevTools(applyMiddleware(thunk))) }>
		<App />
	</Provider>,
	document.querySelector('#root')
)