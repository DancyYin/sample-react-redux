import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as Actions from "../../actions/LocaleAction"
import locales from '../../i18n/locales.js';
import {descriptonOfLangMap} from '../../i18n/langs.js';
import {GNB_USER_AUTHENTICATED} from '../../conf/appconfigs.js';
import {Link, IndexLink} from "react-router";
// compiles the SCSS style sheet
import navbar from "./navbar.scss";

import {Navbar, Nav, NavItem, Label, Button, Overlay, Popover, NavDropdown, MenuItem} from 'react-bootstrap'

import {getCurrentLocaleObject} from '../../utils/MessagesUtil.js';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...locales};
    }

    componentWillMount() {
        this.props.changeLocale(getCurrentLocaleObject());
    }

    handleSelect = (selectedKey) => {
        this.props.changeLocale(selectedKey);

    };

   

    render() {

        let {localeReducer, changeLocale} = this.props;

        let insideFlagClass = "countryFlag insideFlag flag_" + localeReducer.country.toLowerCase();
        let countryOfLocaleMap = [];
        let flags = [];
        this.state.locales.forEach((locale, index) =>{
            if(locale.country == localeReducer.country){
                countryOfLocaleMap.push(locale);
            }

            let flagClass = " countryFlag flag_" + locale.country.toLowerCase();
            flags.push(<MenuItem key={index} className={navbar.flaglist} eventKey={locale}>
                            <span className={flagClass}></span>
                            <span>{locale.description}</span>
                        </MenuItem>);
        });

        let hasMultipleLangs = countryOfLocaleMap.length>1? true : false;
        let langToggles = [];
        let langSelector;
        if(hasMultipleLangs){
            countryOfLocaleMap.forEach((loc, index) => {
                langToggles.push(<MenuItem key={index} className={navbar.togglelist} eventKey={loc}>
                    <span>{descriptonOfLangMap[loc.language]}</span>
                </MenuItem>)
            });

            langSelector = <NavDropdown eventKey={4} className={navbar.barlink} title={descriptonOfLangMap[localeReducer.language]} id="nav-language-dropdown">
                {langToggles}
            </NavDropdown>;
        }




        if (GNB_USER_AUTHENTICATED) {
            return (
               <div> 
                <Navbar inverse collapseOnSelect className={navbar.nav}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <h1>
                                <img className={navbar.hpLogo} src="https://www.hpconnected.com/public/images/hplogo.png" alt="HP connected"/>
                                Connected
                            </h1>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight className={navbar.topbar} onSelect={this.handleSelect}>
                            {langSelector}
                            <NavDropdown eventKey={5} className={navbar.barlink} title="Setings" id="nav-settings-dropdown">
                                <MenuItem key={.0} className={navbar.togglelist} eventKey={[]}>My Account</MenuItem>
                                <MenuItem key={.1} className={navbar.togglelist} eventKey={[]}>Notifications</MenuItem>
                                <MenuItem key={.2} className={navbar.togglelist} eventKey={[]}>Printing</MenuItem>
                                <MenuItem key={.3} className={navbar.togglelist} eventKey={[]}>Shipping</MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={6} className={navbar.barlink} >Help</NavItem>
                        </Nav>
                        <Label className={"countryFlag insideFlag flag_" + localeReducer.country.toLowerCase()}> </Label>
                        <Navbar.Link pullRight className={navbar.toplink} href="#">Sign Out</Navbar.Link>
                        <Navbar.Text pullRight className={navbar.useremail}>eprint100@test.com</Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                
                <ul className={navbar.headernav}>
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><Link to="/myprinters">MyPrinters</Link></li>
                    <li><Link to="/mobileprinting">Mobile Printing</Link></li>
                </ul>
               
              </div>
            );

        }
        else{
            return (
                <Navbar inverse collapseOnSelect className={navbar.nav}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <h1>
                                <img className={navbar.hpLogo} src="https://www.hpconnected.com/public/images/hplogo.png" alt="HP connected"/>
                                Connected
                            </h1>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Link pullRight className={navbar.toplink} href="https://webauth-test1.hpconnectedtest.com/oauth/ui/login?client_id=1127bd7a6e76102d92b012313rsewpw16&response_type=code&state=c14a7553-45c2-460a-acdb-acaa92286ba4&redirect_uri=https://hpc-test1.hpconnectedtest.com/webauth&theme=RWD&overlay=false&forceLogin=false&country_changeable=true">Sign In</Navbar.Link>
                        <Nav pullRight className={navbar.topbar} onSelect={this.handleSelect}>
                            <NavDropdown eventKey={3} className={navbar.barlink} title={localeReducer.description} id="nav-country-dropdown">
                                {flags}
                            </NavDropdown>
                        </Nav>
                        <Label className={"countryFlag outsideFlag flag_" + localeReducer.country.toLowerCase()}> </Label>
                        <Navbar.Link pullRight className={navbar.toplink} href="#">Help</Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            );
        }

    }
}


export default connect
(
    state => state,
    dispatch => bindActionCreators(Actions, dispatch)
)(NavBar)
