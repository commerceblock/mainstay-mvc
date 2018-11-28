import Home from './view/home';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/stylesheets/styles.scss'

const Main = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<Main/>, document.getElementById('root'));

module.hot.accept();
