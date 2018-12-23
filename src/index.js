import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
    <App />, 
    document.getElementById('root')
    
    );


serviceWorker.unregister();
