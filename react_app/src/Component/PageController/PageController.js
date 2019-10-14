/* eslint-disable */
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MarketInfoPage from "../MarketInfo/MarketInfoPage";
import OpenInterest from "../RevenueInfo/OpenInterest";
import "./css";

class PageController extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  componentDidUpdate() {}

  render() {
    return (
      <div id="main-content">
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={100} classNames="fade">
                <Switch location={location}>
                  <Route exact path="/" component={MarketInfoPage} />
                  <Route path="/tradingInfo" component={MarketInfoPage} />
                  {/*<Route path="/revenueInfo" component={OpenInterest} />*/}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    );
  }
}

export default PageController;
