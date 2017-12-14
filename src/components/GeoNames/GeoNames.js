import React, { Component } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';
import { getData, sortContinentNames, calculateDataForPie } from '../../utils/api';

class GeoNames extends Component {
  constructor() {
    super();

    this.state = {
      continent: 'ALL',
      metric: 'ALL',
      chartMax: 5,
      geoData: null,
      continentsList: [],
      pieAreaInSqKm: null,
      piePopulation: null,
    };

    this.handleGoClick = this.handleGoClick.bind(this);
  }
  async handleGoClick() {
    const geoData = await getData();
    const continentsList = sortContinentNames(geoData);
    this.setState({
      continent: 'ALL',
      metric: 'ALL',
      chartMax: 5,
      geoData,
      continentsList,
    });
    this.sortData(geoData, 'ALL', 5);
  }
  sortData = (geoData, filter, max) => {
    if (filter === 'ALL') {
      const pieAreaInSqKm = calculateDataForPie(geoData, 'areaInSqKm', max);
      const piePopulation = calculateDataForPie(geoData, 'population', max);
      
      this.setState({
        pieAreaInSqKm,
        piePopulation,
      });
    }
  }
  handleMetricChange = (value) => {
    this.setState({
      metric: value,
    });
  }
  handleMaxChange = (value) => {
    this.sortData(this.state.geoData, this.state.metric, value);
    this.setState({
      chartMax: value,
    });
  }
  render() {
    return (
      <div>
        <Header handleGoClick={this.handleGoClick} />
        <Filters
          continentsList={this.state.continentsList}
          continent={this.state.continent}
          metric={this.state.metric}
          chartMax={this.state.chartMax}
          handleMetricChange={this.handleMetricChange}
          handleMaxChange={this.handleMaxChange}
        />
        {this.state.pieAreaInSqKm &&
          <Results
            metric={this.state.metric}
            pieAreaInSqKm={this.state.pieAreaInSqKm}
            piePopulation={this.state.piePopulation}
          />
      }
        
      </div>
    );
  }
}

export default GeoNames;
