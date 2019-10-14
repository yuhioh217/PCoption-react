/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './NewsTemplate.css';

class NewsTemplate extends Component {
  static propTypes = {

    url: PropTypes.string.isRequired,
  };

  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      articles: []
    };
  }

  // Lifecycle method
  componentWillMount() {
    const { url } = this.props;
    this.getArticles(url);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ url: `${nextProps.url}`, });
      // this.getArticles(nextProps.url);
    }
  }

  getArticles(url) {
    // Make HTTP reques with Axios
    axios
      .get(`${url}`)
      .then(res => {
        const articles = res.data.articles;
        // Set state with result
        console.log(articles);
        this.setState({ articles: articles });
      })
      .catch(error => {
        // console.log(error);
      });
  }

  formatDate(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var month = time.getMonth() + 1;
    var composedTime = day + '/' + month + '/' + year + ' | ' + hour + ':' + (minute < 10 ? '0' + minute : minute);
    return composedTime;
  }

  render() {
    return (
      <div className="cardsContainer">
        {this.state.articles.map((news, i) => {
          return (
            <div className="card" key={i}>
              <div className="content">
                <h3>
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    <div className="news_title">
                      {news.title}
                    </div>
                  </a>
                </h3>
                {
                  news.source.name === "Yahoo.com" ? null : (
                    <div className="news_contnet">
                      {news.description}
                    </div>
                  )
                }
                <div className="author">
                  <p>{this.formatDate(news.publishedAt)}</p>
                </div>
              </div>
              {
                /*
                <div className="image">
                  <img src={news.urlToImage} alt="" />
                </div>
                */
              }
            </div>
          );
        })}
      </div>
    );
  }
}

export default NewsTemplate;
