import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import { i18nReducer } from 'react-redux-i18n';
import {localeReducer} from './localeReducer';

const reducers = combineReducers({
    localeReducer,
    i18n: i18nReducer
});


export const configureStore = (initialState = {}) => {

  // thunk adds the dispatcher to the actions calls.
  return applyMiddleware(thunk)  //<--- add "metricsMiddleware" after thunk
  (createStore)
  (reducers, initialState,
    // allows us to use Chrome dev tools to debug
    window.devToolsExtension && window.devToolsExtension()
  );
};
