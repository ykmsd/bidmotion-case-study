import React, { Component } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';
import { getData, sortContinentNames, calculateDataForPie } from '../../utils/api';

class GeoNames extends Component {
  constructor() {
    super();

    this.state = {
      continent: null,
      metric: null,
      chartMax: null,
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
  render() {
    console.log(this.state.pieAreaInSqKm, this.state.piePopulation);
    return (
      <div>
        <Header handleGoClick={this.handleGoClick} />
        <Filters
          continentsList={this.state.continentsList}
          continent={this.state.continent}
          metric={this.state.metric}
          chartMax={this.state.chartMax}
        />
        {this.state.pieAreaInSqKm &&
          <Results
            pieAreaInSqKm={this.state.pieAreaInSqKm}
            piePopulation={this.state.piePopulation}
          />
      }
        
      </div>
    );
  }
}

export default GeoNames;
