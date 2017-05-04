/**
 * Created by yinda on 2017/3/20.
 */

import {LOCALE_CHANGE} from '../constants/ActionTypes';
import {setLocale} from 'react-redux-i18n';
import {setCookie} from '../utils/MessagesUtil.js';
import {GNB_LOCALE_COOKIE, COOKIE_DOMAIN} from '../conf/appconfigs';

export function changeLocale(locale){
    return (dispatch) => {
        dispatch(changeCountry(locale));
        dispatch(setLocale(locale.locale));
        setGNBLocaleCookie(locale);
    }
}

function changeCountry(locale) {
    return {type:LOCALE_CHANGE, locale}
}

function setGNBLocaleCookie(locale){
    setCookie(GNB_LOCALE_COOKIE, locale.locale, {path: '/', expires :14, domain: COOKIE_DOMAIN});
}
