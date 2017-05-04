#Sample of React-Redux

##I18N
#####1.	Why choose react-redux-i18n
* This module has the reducer which is very easy to inject and use.
````javascript
//index.js
import messages from './i18n/messages.js'
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n';

const store =  configureStore();
syncTranslationWithStore(store);
store.dispatch(loadTranslations(messages));

//reducers/ReducerFactory.js
import { i18nReducer } from 'react-redux-i18n';

const reducers = combineReducers({
    signInReducer,
    localeReducer,
    i18n: i18nReducer
});

//actions/action.js
import {setLocale} from 'react-redux-i18n';

export function changeLocale(locale){
    return (dispatch) => {
        dispatch(changeCountry(locale));
        dispatch(setLocale(locale.locale));
        setGNBLocaleCookie(locale);
    }
}

//utils/MessagesUtil.js
var I18N = require('react-redux-i18n').I18n;

export function msg(key)
{
    const translation_key = key.replace(new RegExp('[.]', 'g'), '_');
    var translation_value = I18N.t(translation_key);

    if(translation_value.toLowerCase().replace(new RegExp('[ ]', 'g'), '_') == translation_key)
    {
        translation_value = messages.default[translation_key];
    }

    if(translation_value){
        return escape2Html(translation_value);
    }

    return key;
}
````
* The usage will be similar with what we’re having today if we use it and simply ‘package’ it (Refer to *MessagesUtil.msg()* for detail).
````javascript
//components/Footer/footer.js
import {msg} from "../../utils/MessagesUtil.js";

<a href={msg('url.footer.hp.com')} title={msg('msg.footer.hp')} target="_self" tabIndex="0">{msg('msg.footer.hp')}</a>
````

#####2.	How to apply i18n for components
* Preparation: install dependencies
 ````
  {"react-redux-i18n": "^1.8.0", "translatr": "^0.1.10"}
 ````
* Load translation objects messages in entry file "**_index.js_**" to make sure the locale react application could be localized.
* Import "**_../utils/MessagesUtil.js_**" in the components which need to be localized.
* Call **_{msg('i18n.key')}_** in HTML tags and component definition.

#####3.	Messages Object
* **Name rule**: Link the key strings with underscores instead of dots. Because dot is one of sensitive characters of the *react-redux-i18n* module.
````javascript
//i18n/messages.js
const messages = {
    default:{
        'msg_footer_copyright': '&copy;Copyright 2016 HP Development Company,&nbsp;L.P'
    },
    en_US: {
        'msg_footer_hp': 'HP.com',
        'url_footer_hp_com': 'http://www.hp.com/country/us/en/uc/welcome.html',
        'msg_footer_privacy': 'Privacy Statement',
        'url_privacy_link': 'http://www8.hp.com/us/en/privacy/privacy.html',
        'msg_footer_epc_terms': 'HP Connected Terms of Use'
    }
 }
````

#####4.	Special Scenarios
* If the translation value has special characters.
* If the translation value has HTML tags.
 ````javascript
  //Refer to the example in footer.js for detailed resolution, key code snippets bellow:
  export class Footer extends React.Component {
      constructor(props) {
          super(props);
      }
      componentDidMount(){
          for(var ref in this.refs) {
              this.refs[ref].innerHTML = msg(ref);
          }
      }
  
      render(){
  
          return (
              <div>
                  <div className="footertext" ref="msg.footer.copyright"></div>
              </div>
  
          );
      }
  }
  
  export default connect
  (
      state=>state,
      dispatch => bindActionCreators(Actions,dispatch)
  )(Footer)
  
  ````
* Whether to load the translations for all languages or only for current language(locale)?
* How to handle the case when the translation could not be found(fetched) from current language set.

##Locale
#####1.	Locales Object
* Returned (via RESTful from backend) locales object.

 ````javascript
  {locales: [{locale: "en_US", country: "US", language: "en", description: "United States (English)"}, {locale: "zh_CN", country: "CN", language: "zh", description: "中国 (中文)"}]}
 ````

#####2. Langs Object
* Returned (via RESTful from backend) map of single language matched default locale.

 ````json
  {"en": "en_US", "fr": "fr_FR", "de": "de_DE", "zh": "zh_CN"}
 ````

#####3. Change Locale
* Reducer: **_localeReducer_**
* Action: **_changeLocale_**
* Get and Set correct locale for user pages when page first be accessed (component first be mounted):
  * Use *gnb_locale* cookie if it exists.
  * Use browser language if *gnb_locale* not exists.
  * Validate fetched locale code, if does not match with specified regular expression, use default locale code.
 ````javascript
   //utils/MessagesUtil.js
   export function getCurrentLocale(){
       let locale = getCookie("gnb_locale");
       let browserLang = navigator.language;
       if(locale == '')
       {
           locale = browserLang;
       }
       if(locale.length == 2){
           locale = langs[locale];
       }
   
       return validateLocale(locale.replace('-', '_'));
   }
   
   export function validateLocale(locale){
       let defaultLocale = "en_US";
       let regx = new  RegExp('^([a-zA-Z]{2})+([_]{1})+([a-zA-Z]{2})+$');
       if(regx.test(locale)){
           return locale;
       }
   
       return defaultLocale;
   }
 ````

##Concerns & Questions
For the long term react component development work, I think we need a Uniform Coding Specification.
* Shall we need to use Apostrophe **'** only or Double quotes **"** only or free to use both?
* When is better to use *connect*? When is not necessary to use *connect*? How to use *connect* efficiently?
* Only one *store* is created and initialized in index.js?
* Categories(folders):
  * **_actions_**: (the file) could be named/broken down by function
  * **_components_**: could be named/broken down by page, field and element; the styles(CSS) which is used for components could be extracted out and put together with component, not recommended to defined globally and overridable.
  * **_constants_**: could be named/broken down by usage type.
  * **_i18n_**: Data objects of i18n and locale related.
  * **_conf_**: Data objects of appconfigs.
* Static resources (fonts, images):
  * If we should use the fonts locally? If yes, how to compress the font files to smaller size? 
  * Images might be broken down to two categories:
    * Some are used for specified component(page/field/element) only: they’re better to put together with component.
    * Others (common icons) are used for public components like button, dialog and form elements: they might be better to put into a common folder for multiple components to use.
