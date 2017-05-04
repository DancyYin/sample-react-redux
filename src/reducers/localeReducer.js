/**
 * Created by dancy on 2016/12/19.
 */
import * as ActionTypes from '../constants/ActionTypes';


const defaultLocale = {
    locale : "en_US",
    language: "en",
    country: "US",
    description : "United States (English)"
};


export function localeReducer(locale = defaultLocale, action){
    switch(action.type){
        case ActionTypes.LOCALE_CHANGE:
            return action.locale;
        default:
            return locale;
    }
}
