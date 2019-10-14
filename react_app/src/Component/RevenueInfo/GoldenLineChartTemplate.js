/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
const CanvasJS = require("../../../lib/canvasjs.min.js");

class LineObject {
  constructor(name) {
    this.name = name;
    this.objectA = {
      type: "spline",
      name: this.name,
      showInLegend: true,
      dataPoints: []
    };
  }

  setDataPoint(data) {
    this.objectA.dataPoints.push(data);
  }

  replaceDataPoint(data) {
    this.objectA.dataPoints = data;
  }

  getDataPoint() {
    return this.objectA.dataPoints;
  }

  getName() {
    return this.name;
  }

  getObject() {
    return this.objectA;
  }
}

class GoldenLineChartTemplate extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    styleParam: PropTypes.instanceOf(Object).isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    const { title, url, type } = this.props;
    // console.log(url);
    this.state = {
      url: url,
      contrainerName: `chartcontainer_${type}`,
      chartData: {
        animationEnabled: true,
        exportEnabled: false,
        title: {
          text: title
        },
        axisY: {
          title: "Amount"
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries
        },
        data: []
      }
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
    this.fetch = this.fetch.bind(this);
    this.setFuturesToChart = this.setFuturesToChart.bind(this);
    this.inserEmptyObject = this.inserEmptyObject.bind(this);
    this.fetchingToSetChart = this.fetchingToSetChart.bind(this);
    this.setChartData = this.setChartData.bind(this);
  }

  componentDidMount() {
    const { type, url } = this.props;
    this.fetchingToSetChart(url, type);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { type, url } = this.props;
    if (this.props == null) return true;
    // console.log(url);
    // console.log(nextProps.url);
    if (url == nextProps.url) return false;
    // console.log(nextProps.url);
    this.fetchingToSetChart(nextProps.url, type);
    return true;
  }

  fetchingToSetChart(url, type) {
    this.fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.setFuturesToChart(res, type);
      return Promise.resolve(res);
    });
  }

  setFuturesToChart(res, keyValue) {
    let chartObject = [];
    let objectArr = [];
    let tempData = {};
    let dataArr = "";
    let tempName = "";
    let tempObject = {};
    let templength = 0;
    let value = 0;
    const { title } = this.props;
    if (res.data.Responses !== undefined || res.data.Responses !== null) {
      // console.log(res.data.Responses.Stock_futures_TW);
      if (res.data.Responses.Stock_futures_TW !== undefined) {
        dataArr = res.data.Responses.Stock_futures_TW;
      }

      if (res.data.Responses.Stock_PC_options !== undefined) {
        dataArr = res.data.Responses.Stock_PC_options;
      }

      for (var i = 0; i < dataArr.length; i++) {
        if (keyValue === "pc_data") {
          for (var j = 0; j < 2; j++) {
            if (j === 0) {
              name = `Call Open Interest`;
              if (objectArr.length === 0) {
                objectArr.push(new LineObject(name));
              } else {
                if (objectArr.some(item => item.name === name)) {
                } else {
                  objectArr.push(new LineObject(name));
                }
              }
              value = dataArr[i].data.CallOpenInterest;
              tempName = `Call Open Interest`;
            } else if (j === 1) {
              name = `Put Open Interest`;
              if (objectArr.length === 0) {
                objectArr.push(new LineObject(name));
              } else {
                if (objectArr.some(item => item.name === name)) {
                } else {
                  objectArr.push(new LineObject(name));
                }
              }
              value = dataArr[i].data.PutOpenInterest;
              tempName = `Put Open Interest`;
            }
            tempData = {
              label: dataArr[i].date,
              y: value
            };
            // console.log(tempData);
            let index = objectArr.findIndex(item =>
              item.name.includes(tempName)
            );
            objectArr[index].setDataPoint(tempData);
          }
        } else if (keyValue === "pc_ratio") {
          name = "PutCall Ratio";
          if (objectArr.length === 0) {
            objectArr.push(new LineObject(name));
          } else {
            if (objectArr.some(item => item.name === name)) {
            } else {
              objectArr.push(new LineObject(name));
            }
          }
          value = parseInt(dataArr[i].data.PCRatio);
          tempName = "PutCall Ratio";
          tempData = {
            label: dataArr[i].date,
            y: value
          };
          // console.log(tempData);
          let index = objectArr.findIndex(item => item.name.includes(tempName));
          objectArr[index].setDataPoint(tempData);
        } else {
          for (var j = 1; j < 3; j++) {
            name = `${dataArr[i].data[j].name} ${dataArr[i].data[j].type}`;
            if (objectArr.length === 0) {
              objectArr.push(new LineObject(name));
            } else {
              if (objectArr.some(item => item.name === name)) {
              } else {
                objectArr.push(new LineObject(name));
              }
            }

            if (keyValue === "toi") {
              value = parseInt(dataArr[i].data[j].toi);
              // chartTitle = 'Futures TW (大額交易人未沖銷部位)';
            } else if (keyValue === "buy_f10n") {
              value = parseInt(
                dataArr[i].data[j].buy_f10n.split("  ")[0].replace(",", "")
              );
              // chartTitle = 'Futures TW (買方十大交易人合計)';
            }
            tempName = dataArr[i].data[j].type;
            tempData = {
              label: dataArr[i].date,
              y: value
            };
            // console.log(tempData);
            let index = objectArr.findIndex(item =>
              item.name.includes(tempName)
            );
            objectArr[index].setDataPoint(tempData);
          }
        }
      }

      // Put the empty item to that have less datapoints array.
      // Get the most long object
      for (var i = 0; i < objectArr.length; i++) {
        if (objectArr[i].getDataPoint().length > templength) {
          tempObject = objectArr[i].getDataPoint();
          templength = objectArr[i].getDataPoint().length;
        }
      }

      for (var i = 0; i < objectArr.length; i++) {
        objectArr[i].replaceDataPoint(
          this.inserEmptyObject(tempObject, objectArr[i].getDataPoint())
        );
      }

      for (var i = 0; i < objectArr.length; i++) {
        chartObject.push(objectArr[i].getObject());
      }

      this.setState({
        chartData: {
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: title
          },
          axisY: {
            title: "Amount"
          },
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            itemclick: this.toggleDataSeries
          },
          data: chartObject
        }
      });
      this.setChartData();
    }
  }

  inserEmptyObject = (tempArr, objectArr) => {
    let indexArr = [],
      resultArr = [],
      index = 0;
    for (var i = 0; i < objectArr.length; i++) {
      for (var j = 0; j < tempArr.length; j++) {
        if (objectArr[i].label === tempArr[j].label) {
          indexArr.push(j);
        }
      }
    }

    for (var i = 0; i < tempArr.length; i++) {
      if (indexArr.includes(i)) {
        resultArr.push(objectArr[index]);
        index = index + 1;
      } else {
        resultArr.push({});
      }
    }

    return resultArr;
  };

  fetch = (url, options) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "text/json"
    };

    return fetch(url, {
      headers,
      ...options
    })
      .then(this.checkStatus)
      .then(response => response.json());
  };

  setChartData = () => {
    const { chartData, contrainerName } = this.state;
    let classX = document.getElementsByClassName(contrainerName);
    // console.log(classX);
    this.chart = new CanvasJS.Chart(classX[0], chartData);
    this.chart.render();
  };

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
  }

  render() {
    const { contrainerName } = this.state;
    const { url, styleParam } = this.props;
    // console.log(url);
    const style = {
      paddingTop: "20px",
      height: "300px",
      width: "100%"
    };

    return (
      <div className="_open_interest_linechart">
        <div id="chartContainer" className={cx(contrainerName)} style={style} />
      </div>
    );
  }
}

export default GoldenLineChartTemplate;
