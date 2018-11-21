import Home from './view/home';
import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';

import '../css/main.css'
import '../css/bootstrap.css'
import '../css/charts.css'
import '../css/nexthome.css'



const Main = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<Main/>, document.getElementById('root'));

module.hot.accept();
