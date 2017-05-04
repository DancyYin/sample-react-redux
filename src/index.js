import React from "react";
import ReactDom from "react-dom";
import {Provider} from 'react-redux';
import {configureStore} from "./reducers/ReducerFactory";
import { Router, Route, hashHistory } from 'react-router'
import Main from "./components/main";
import NavBar from "./components/NavBar/navbar";
import Footer from "./components/Footer/footer";

import messages from './i18n/messages.js'
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n';

const store =  configureStore();

syncTranslationWithStore(store);
store.dispatch(loadTranslations(messages));


const app = document.getElementById('app');

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}/>
            <Route path="/navbar" component={NavBar}/>
            <Route path="/footer" component={Footer}/>
        </Router>
    </Provider>,
    app);

export default store;


