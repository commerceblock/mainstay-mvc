import React from 'react';
import ReactDOM from 'react-dom';
import Root from './view/Root';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/stylesheets/styles.scss';
import './helpers/api-service';

ReactDOM.render(<Root />, document.getElementById('root'));

module.hot.accept();
