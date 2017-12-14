import React, { Component } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import { getData } from '../../utils/api';

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
    this.sortContinentNames(geoData);
  }
  sortContinentNames = (geoData) => {
    const continentsList = ['ALL'];
    geoData.map(data => (
      continentsList.includes(data.continent) === false && continentsList.push(data.continent)
    ));
    this.setState({
      continentsList,
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
        />
      </div>
    );
  }
}

export default GeoNames;
