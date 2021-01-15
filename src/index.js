import React from 'react';
import App from './App'
import 'antd/dist/antd.css'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from './store/reducer'
import reportWebVitals from './reportWebVitals';
const middleware = [reduxThunk]

const store = createStore(reducer,{},applyMiddleware(...middleware))
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
