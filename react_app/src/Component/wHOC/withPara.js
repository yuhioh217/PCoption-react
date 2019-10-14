import React, { Component } from 'react';

export default function withPara(AuthComponent) {
  return class AuthWrapped extends Component {
    constructor(props) {
      super(props);
      // console.log(this.props);
      this.state = {
        user: null,
      };
    }

    render() {
      const { user } = this.state;

      const { history } = this.props;

      return (
        <AuthComponent history={history} />
      );
    }
  };
}
