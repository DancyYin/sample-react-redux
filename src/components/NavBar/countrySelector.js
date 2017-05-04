/**
 * Created by dancy on 2017/1/9.
 */
import React from 'react'
import {Grid, Row, Col, Image} from 'react-bootstrap'

import locales from '../../i18n/locales.js';

import './countrySelector.scss'
const root = '/api';

class CountrySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = locales;
    }

    render() {
        let {onChangeLocale, onFlagShow} = this.props;
        let localCols = [];
        let localRows = [];
        let localLength = this.state.locales.length;
        this.state.locales.forEach((local, index) => {
                localCols.push(local);
                if ((index + 1) % 2 !== 0 && (index + 1) !== localLength) {
                    return;
                }
                localRows.push(<LocalRow key={index} localCols={localCols}  onChangeLocale={onChangeLocale} onFlagShow={onFlagShow}/>);
                localCols = [];
        });

        return (
            <Grid className='flagSelector'>
                {localRows}
            </Grid>
        )
    }
}

class LocalRow extends React.Component {
    render() {
        const {onChangeLocale, onFlagShow} = this.props;
        let localCols = this.props.localCols.map((locale,index) =>
        {
            let country = locale.locale.split("_")[1].toLowerCase();
            let flagClass = "countryFlag flag_"+ country;
            return (<Col key={index} xs={12} sm={6}  className='flagSelectorCol' onClick={() => {onChangeLocale(locale);onFlagShow()}}>
                        <span className={flagClass}/>
                        <span>{locale.description}</span>
                    </Col>);
        }
    );

        return (
            <Row className="show-grid">
                {localCols}
            </Row>
        )
    }
}

export default CountrySelector;
