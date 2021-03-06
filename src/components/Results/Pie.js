import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';
import PropTypes from 'prop-types';

class Pie extends Component {
  constructor(props) {
    super(props);

    const configBase = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',

          },
        },
      },
    };
    this.state = {
      pieAreaInSqKmConfig: {
        ...configBase,
        title: {
          text: 'areaInSqKm',
        },
        series: [{
          name: 'areaInSqKm',
          colorByPoint: true,
          data: this.props.pieAreaInSqKm.map(data => ({
            name: data.countryName,
            y: data.areaInSqKm,
          })),
        }],
      },
      piePopulationConfig: {
        ...configBase,
        title: {
          text: 'population',
        },
        series: [{
          name: 'population',
          colorByPoint: true,
          data: this.props.piePopulation.map(data => ({
            name: data.countryName,
            y: data.population,
          })),
        }],
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({
      pieAreaInSqKmConfig: {
        ...prevState.pieAreaInSqKmConfig,
        series: [{
          ...prevState.pieAreaInSqKmConfig.series,
          data: nextProps.pieAreaInSqKm.map(data => ({
            name: data.countryName,
            y: data.areaInSqKm,
          })),
        }],
      },
      piePopulationConfig: {
        ...prevState.piePopulationConfig,
        series: [{
          ...prevState.piePopulationConfig.series,
          data: nextProps.piePopulation.map(data => ({
            name: data.countryName,
            y: data.population,
          })),
        }],
      },
    }));
  }
  render() {
    const { metric } = this.props;
    let pieChart;
    if (metric === 'ALL') {
      pieChart = (
        <div className="pie__charts">
          <ReactHighCharts config={this.state.pieAreaInSqKmConfig} />
          <ReactHighCharts config={this.state.piePopulationConfig} />
        </div>
      );
    } else if (metric === 'areaInSqKm') {
      pieChart = (
        <ReactHighCharts config={this.state.pieAreaInSqKmConfig} />
      );
    } else {
      pieChart = (
        <ReactHighCharts config={this.state.piePopulationConfig} />
      );
    }
    return (
      <div className="pie">
        { pieChart }
      </div>
    );
  }
}

Pie.propTypes = {
  pieAreaInSqKm: PropTypes.arrayOf(PropTypes.object).isRequired,
  piePopulation: PropTypes.arrayOf(PropTypes.object).isRequired,
  metric: PropTypes.string.isRequired,
};

export default Pie;
