import React from 'react';
import ReactDOM from 'react-dom';
import GeoNames from './components/GeoNames/GeoNames';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <GeoNames />,
  document.getElementById('root'));
registerServiceWorker();
