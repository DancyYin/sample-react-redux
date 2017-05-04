/**
 * Created by dancy on 2017/3/20.
 */
let appconfigs = {
    gnb: {
        hpcSid: "HPC_EPC2",
        actualLocale: "en_CA",
        defaultHelpLink: "###",
        userAuthenticated: false,
        hpcDomain: ".hpconnectedtest.com",
        hpcGnbContextCookie: "hpc_gnb",
        gnbLocaleCookie: "gnb_locale",
        gnbPreferenceCookie: "gnb_preference_cookie",
        copyRight: "&copy;Copyright 2016 HP Development Company,&nbsp;L.P"
    },
    epc2: {

    }
};

export const COOKIE_DOMAIN = appconfigs.gnb.hpcDomain;
export const GNB_LOCALE_COOKIE = appconfigs.gnb.gnbLocaleCookie;
export const GNB_USER_AUTHENTICATED = appconfigs.gnb.userAuthenticated;
export const COPYRIGH_TEXT = appconfigs.gnb.copyRight;

