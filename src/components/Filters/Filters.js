import React, { Component } from 'react';

const metricValues = ['ALL', 'areaInSqKm', 'population'];
const chartMaxValues = [5, 10, 15, 20];

class Filters extends Component {
  constructor() {
    super();

    this.state = {
      metricValue: 'ALL',
      chartMaxValue: 5,
    };
  }
  handleMetricChange = (e) => {
    this.setState({
      metricValue: e.target.value,
    });
  };
  handleChartMaxChange = (e) => {
    this.setState({
      chartMaxValue: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <select name="continent-names"></select>
        <select name="metric" onChange={this.handleMetricChange} value={this.state.metricValue}>
          {metricValues.map(value => (
            <option value={value} key={`metric-${value}`}>
              {value}
            </option>
          ))}
        </select>
        <select name="chart-max" onChange={this.handleChartMaxChange} value={this.state.chartMaxValue}>
          {chartMaxValues.map(value => (
            <option value={value} key={`metric-${value}`}>
            {value}
          </option> 
          ))}
        </select>
      </div>
    );
  }
};

export default Filters;
