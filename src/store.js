import { createStore, combineReducers } from 'redux';
import filtersReducer from './reducers/filters';
import dataReducer from './reducers/data';

const store = createStore(
  combineReducers({
    filters: filtersReducer,
    data: dataReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
