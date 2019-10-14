import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import cx from 'classnames';
import '../css';

class Header extends Component {
  state = {
    collapse: false,
  };

  onClick() {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse,
    });
  }


  render() {
    const { collapse, language } = this.state;

    const { langs } = this.props;

    const pointer = {
      cursor: 'pointer',
    };

    const w = window.matchMedia('(min-width: 993px)');

    let productDivider;
    if (w.matches) {
      productDivider = <div className="product_divider" />;
    } else {
      productDivider = null;
    }

    return (
      <div>
        <nav className="navbar navbar-dark navbar-expand-lg justify-content-between nav-body fixed-top">
          <div className="container-fluid dropdown-body">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse collapse mx-auto dual-nav order-1 order-md-1 nav-center">
              <ul className="navbar-nav nav">
                <li className={cx('nav-item', { active: window.location.pathname === '/tradingInfo' || window.location.pathname === '/' })} data-toggle="collapse" data-target=".navbar-collapse.show">
                  <div className="active-line">
                    <Link className="nav-link nav-center-text" to="/tradingInfo">
                      Trading Information
                    </Link>
                  </div>
                </li>
                <div className="custom-divider" />
                <li className={cx('nav-item', { active: window.location.pathname === '/revenueInfo' })} data-toggle="collapse" data-target=".navbar-collapse.show">
                  <div className="active-line">
                    <Link className="nav-link nav-center-text" to="/revenueInfo">
                      Futures Tracking
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
