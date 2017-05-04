import React from "react";
import NavBar from "./NavBar/navbar";
import Footer from "./Footer/footer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Carousel, Image} from "react-bootstrap"
import * as Actions from "../actions/LocaleAction";

// compiles the SCSS style sheet
require('!style!css!sass!./main.scss');

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {localeReducer, changeLocale} = this.props;

        return (
            <div>
                <NavBar currentLocale={localeReducer} onChangeLocale={changeLocale}/>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>

                            <div>
                                <Carousel>
                                    <Carousel.Item>
                                        <div className="homepagebackground"/>
                                        <Carousel.Caption>
                                            <h3>One Account, Many Services</h3>
                                            <p>HP Connected provides access to various HP services with a single account.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="pc_printer"/>
                                        <Carousel.Caption>
                                            <h3>Begin your journey - the HP Connected way</h3>
                                            <p>Use your mobile devices to print directly to your HP ePrint enabled printer.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                         <div className="sprout"/>
                                        <Carousel.Caption>
                                            <h3>Go from thought to expression in an instant</h3>
                                            <p>Create something beyond imagination with Sprout PC  and its app collection.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>

                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </div>
        );
    }
}


export default connect(
    /**
     * These are "reducers" from the combineReducers call in the reducers/index.js file.
     *
     * These are mapped to the this.props of the Myprinters object
     *
     * mapStateToProps
     */
    state => state,

    /**
     * These are actions functions that are mapped to the this.props object
     *
     * mapDispatchToProps
     */
    dispatch => bindActionCreators(Actions, dispatch)
)(Main)

