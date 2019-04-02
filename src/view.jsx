import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/stylesheets/styles.scss';
import Root from './view/Root';

ReactDOM.render(<Root />, document.getElementById('root'));

module.hot.accept();