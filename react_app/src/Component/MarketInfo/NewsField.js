import React, { Component } from 'react';
import NewsTemplate from './NewsTemplate';

class NewsField extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <>
        <NewsTemplate url="https://newsapi.org/v2/everything?domains=cnyes.com&apiKey=62fdf99499164625bd2e3be1804ae85c" />
        <NewsTemplate url="https://newsapi.org/v2/top-headlines?country=tw&category=business&apiKey=5c0a2e4f5a4844c095ff2d333845d3ea" />
      </>
    );
  }
}

export default NewsField;
