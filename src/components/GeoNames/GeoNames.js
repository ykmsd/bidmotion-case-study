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
    };

    this.handleGoClick = this.handleGoClick.bind(this);
  }
  async handleGoClick() {
    const geoData = await getData();
    this.setState({
      geoData,
    });
    this.sortData(geoData);
    
  }
  sortData = (geoData) => {
    const continentsList = sortContinentNames(geoData);
    this.setState({
      continentsList,
    });
    calculateDataForPie(geoData);
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
        />
        <Results />
      </div>
    );
  }
}

export default GeoNames;
