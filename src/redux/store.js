import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as browserHistory from "history";
import {connectRouter} from 'connected-react-router'
import reducers from '../redux/reducers';
import thunk from 'redux-thunk';

const history = browserHistory.createBrowserHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history)
    }),
    applyMiddleware(thunk)
);

export {store, history};
