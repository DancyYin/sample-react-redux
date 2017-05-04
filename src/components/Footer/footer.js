import React from "react";
import {Navbar,Nav, NavItem} from "react-bootstrap"
import {msg, html} from "../../utils/MessagesUtil.js";
import footer from "./footer.scss"
import {COPYRIGH_TEXT} from "../../conf/appconfigs.js"


export default class Footer extends React.Component {

    render(){
        return (
            <Navbar className={footer.bar} fixedBottom>
                <Nav>
                    <NavItem className={footer.links} href={msg('url.footer.hp.com')} title={msg('msg.footer.hp')} target="_self">{msg('msg.footer.hp')}</NavItem>
                    <NavItem className={footer.links} href={msg('url.privacy.link')} target="_self" title={msg('msg.footer.privacy')}>{msg('msg.footer.privacy')}</NavItem>
                    <NavItem className={footer.links} href="https://gnb.hpconnected.com/gnb/hpctou" title={msg('msg.footer.epc.terms')}>{msg('msg.footer.epc.terms')}</NavItem>
                    <NavItem className={footer.links} dangerouslySetInnerHTML={html(COPYRIGH_TEXT)}></NavItem>
                </Nav>
            </Navbar>
        );
    }
}
