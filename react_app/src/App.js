import React, { Component } from 'react';
import withPara from './Component/wHOC/withPara';
import PageController from './Component/PageController/PageController';
import Header from './Component/Header/js/header';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div id="main">
        {
          this.props != null ? (
            <Header {...this.props} />
          ) : null
        }
        <PageController {...this.props} />
      </div>
    );
  }
}

export default App;
