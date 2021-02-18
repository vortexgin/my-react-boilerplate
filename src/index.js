import React from 'react';
import ReactDOM from 'react-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles/variables.scss';
import './components/styles/sizing.scss';
import './components/styles/spacing.scss';
import './components/styles/fonts.scss';
import './components/styles/custom.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-popup/style.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import 'react-table/react-table.css';

import {ENV} from './config/app';
import App from "./App";
import * as serviceWorker from './serviceWorker';

library.add(fab);

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (ENV === 'prod') {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
