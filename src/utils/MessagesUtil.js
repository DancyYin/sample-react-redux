/**
 * Created by yinda on 2017/3/8.
 */

import messages from '../i18n/messages.js';
import locales from '../i18n/locales.js';
import {langOfLocaleMap} from '../i18n/langs.js';
import  {GNB_LOCALE_COOKIE} from '../conf/appconfigs';

const I18N = require('react-redux-i18n').I18n;
const defaultLocaleCode = "en_US";

export function escape2Html(str) {
    let arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}


export function msg(key)
{
    const translation_key = key.replace(new RegExp('[.]', 'g'), '_');
    let translation_value = I18N.t(translation_key);

    if(translation_value.toLowerCase().replace(new RegExp('[ ]', 'g'), '_') == translation_key)
    {
        translation_value = messages.default[translation_key];
    }

    if(translation_value){
        return escape2Html(translation_value);
    }

    return key;
}

export function htmlMsg(key){
    return html(msg(key));
}

export function html(value){
    return {__html: value};
}

export function getCurrentLocale(){
    let locale = getCookie(GNB_LOCALE_COOKIE);
    let browserLang = navigator.language;
    if(locale == '')
    {
        locale = browserLang;
    }
    if(locale.length == 2){
        locale = langOfLocaleMap[locale];
    }

    return validateLocale(locale.replace('-', '_'));
}

export function validateLocale(locale){
    let regx = new  RegExp('^([a-zA-Z]{2})+([_]{1})+([a-zA-Z]{2})+$');
    if(regx.test(locale)){
        return locale;
    }

    return defaultLocaleCode;
}

export function getCurrentLocaleObject()
{
    return getLocaleObject(getCurrentLocale());
}

export function getLocaleObject(locale)
{
    for(let i in locales.locales){
        let loc = locales.locales[i];
        if(loc.locale == locale){
            return loc;
        }
    }
    return getLocaleObject(defaultLocaleCode);
}

export function getCookie(c_name){
    if(document.cookie.length>0){
        let c_start=document.cookie.indexOf(c_name + "=");
        if(c_start!=-1){
            c_start=c_start + c_name.length+1;
           let c_end=document.cookie.indexOf(";",c_start);
            if(c_end==-1){c_end=document.cookie.length;}
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}


export function setCookie(c_name,value,option){
    let expires = option.expires,
        path = option.path,
        domain = option.domain;
    if(value==null)expires=-1;
    let exdate = new Date();
    exdate.setDate(exdate.getDate()+expires);
    document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString()+";path="+path+";domain="+domain;
}
