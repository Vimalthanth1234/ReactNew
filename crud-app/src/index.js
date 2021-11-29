import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios'

axios.interceptors.request.use(request=>{
  request.headers["app-id"]='61a0f799421bce24217c2ccc'
  return request
})
axios.interceptors.response.use(response=>response.data)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store} >
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
