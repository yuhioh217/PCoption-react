/* eslint-disable */
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import GoldenLineChartTemplate from './GoldenLineChartTemplate';
import 'react-datepicker/dist/react-datepicker.css';
import './css';
const CanvasJS = require('../../../lib/canvasjs.min.js');

class LineObject {
  constructor(name) {
    this.name = name;
    this._object = {
      type: 'spline',
      name: this.name,
      showInLegend: true,
      dataPoints: [],
    }
  }

  setDataPoint(data) {
    this._object.dataPoints.push(data);
  }

  replaceDataPoint(data) {
    this._object.dataPoints = data;
  }

  getDataPoint() {
    return this._object.dataPoints;
  }

  getName() {
    return this.name;
  }

  getObject() {
    return this._object;
  }
}


class OpenInterest extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    const url = 'https://wfgh212e0b.execute-api.us-west-2.amazonaws.com/prod/getfuturesdata?';
    const url2 = "https://wfgh212e0b.execute-api.us-west-2.amazonaws.com/prod/getputcalldata?";
    // console.log((new Date()).toLocaleDateString('zh-Hans-CN'));
    const localStartdateArr = (new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)).toLocaleDateString('zh-Hans-CN').split('/');
    const localEnddateArr = currentDate.toLocaleDateString('zh-Hans-CN').split('/');
    const date1 = `${localStartdateArr[0]}${localStartdateArr[1].length === 1 ? `0${localStartdateArr[1]}` : localStartdateArr[1]}${localStartdateArr[2].length === 1 ? `0${localStartdateArr[2]}` : localStartdateArr[2]}`;
    const date2 = `${localEnddateArr[0]}${localEnddateArr[1].length === 1 ? `0${localEnddateArr[1]}` : localEnddateArr[1]}${localEnddateArr[2].length === 1 ? `0${localEnddateArr[2]}` : localEnddateArr[2]}`;
    const fetchingURL = `${url}date1=${date1}&date2=${date2}`;
    const fetchingURL2 = `${url2}date1=${date1}&date2=${date2}`;

    this.state = {
      url: url,
      url2: url2,
      fetchingURL: fetchingURL,
      fetchingURL2: fetchingURL2,
      startDate: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      endDate: currentDate,
      chartData: {
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: 'Futures TW',
        },
        axisY:{
          title: 'Amount',
        },
        toolTip: {
          shared: true,
        },
        legend:{
          cursor:'pointer',
          itemclick: this.toggleDataSeries,
        },
        data: [],
      },
    };
    this.dataArr = [];
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  componentDidMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state == null)
      return true;
    if (this.state.fetchingURL == nextState.fetchingURL && this.state.startDate == nextState.startDate)
      return false;
    if (this.state.fetchingURL2 == nextState.fetchingURL2 && this.state.startDate == nextState.startDate)
      return false;
    return true;
  }

  handleChangeStart(date) {
    const { url, url2, endDate } = this.state;
    const localStartdateArr = date.toLocaleDateString('zh-Hans-CN').split('/');
    const localEnddateArr = endDate.toLocaleDateString('zh-Hans-CN').split('/');
    const date1 = `${localStartdateArr[0]}${localStartdateArr[1].length === 1 ? `0${localStartdateArr[1]}` : localStartdateArr[1]}${localStartdateArr[2].length === 1 ? `0${localStartdateArr[2]}` : localStartdateArr[2]}`;
    const date2 = `${localEnddateArr[0]}${localEnddateArr[1].length === 1 ? `0${localEnddateArr[1]}` : localEnddateArr[1]}${localEnddateArr[2].length === 1 ? `0${localEnddateArr[2]}` : localEnddateArr[2]}`;
    this.setState({
      startDate: date,
      fetchingURL: `${url}date1=${date1}&date2=${date2}`,
      fetchingURL2: `${url2}date1=${date1}&date2=${date2}`,
    });
  }

  handleChangeEnd(date) {
    const { url, url2, startDate } = this.state;
    const localStartdateArr = startDate.toLocaleDateString('zh-Hans-CN').split('/');
    const localEnddateArr = date.toLocaleDateString('zh-Hans-CN').split('/');
    const date1 = `${localStartdateArr[0]}${localStartdateArr[1].length === 1 ? `0${localStartdateArr[1]}` : localStartdateArr[1]}${localStartdateArr[2].length === 1 ? `0${localStartdateArr[2]}` : localStartdateArr[2]}`;
    const date2 = `${localEnddateArr[0]}${localEnddateArr[1].length === 1 ? `0${localEnddateArr[1]}` : localEnddateArr[1]}${localEnddateArr[2].length === 1 ? `0${localEnddateArr[2]}` : localEnddateArr[2]}`;
    this.setState({
      endDate: date,
      fetchingURL: `${url}date1=${date1}&date2=${date2}`,
      fetchingURL2: `${url2}date1=${date1}&date2=${date2}`,
    });
    // console.log(this.state.fetchingURL);
  }

  render() {
    const { startDate, endDate, fetchingURL, fetchingURL2 } = this.state;
    const styleFuturesTW = {
      height: '300px',
      width: '100%',
    };

    return (
      <div className='_open_interest_main'>
        <div className='_open_interest_datepicker'>
          <div>
            <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={this.handleChangeStart}
            />
            <span className='_open_interest_to'>
              to
            </span>
            <DatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              onChange={this.handleChangeEnd}
            />
          </div>
        </div>
        <div className='_open_interest_chartgroup'>
          <GoldenLineChartTemplate title="Futures TW - 全市場所有未沖銷部位" url={fetchingURL} type="toi" styleParam={styleFuturesTW} />
          <GoldenLineChartTemplate title="Futures TW - 前十大交易人(買方)" url={fetchingURL} type="buy_f10n" styleParam={styleFuturesTW} />
          <GoldenLineChartTemplate title="Options TW - Put Call Open Interest" url={fetchingURL2} type="pc_data" styleParam={styleFuturesTW} />
          <GoldenLineChartTemplate title="Options TW - Put Call Ratio" url={fetchingURL2} type="pc_ratio" styleParam={styleFuturesTW} />
        </div>
      </div>
    );
  }
}

export default OpenInterest;
