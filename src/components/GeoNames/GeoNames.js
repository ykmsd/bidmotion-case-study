import React, { Component } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import Pie from '../Results/Pie';
import Table from '../Results/Table';
import {
  getData,
  sortContinentNames,
  calculateDataForPie,
  filterGeoDataByContinent,
  calculateDataForTable,
  calculateTableTotalValue,
} from '../../utils/api';

class GeoNames extends Component {
  constructor() {
    super();

    this.state = {
      continent: 'ALL',
      metric: 'ALL',
      chartMax: 5,
      geoDataAll: null,
      currentGeoData: null,
      continentsList: [],
      pieAreaInSqKm: null,
      piePopulation: null,
      tableData: null,
      tableDataTotal: [],
    };

    this.handleGoClick = this.handleGoClick.bind(this);
  }
  async handleGoClick() {
    const geoDataAll = await getData();
    const continentsList = sortContinentNames(geoDataAll);
    this.setState({
      currentGeoData: geoDataAll,
      geoDataAll,
      continentsList,
    });
    this.sortData(geoDataAll, 'ALL', 5);
  }
  sortData = (geoData, filter, max) => {
    const pieAreaInSqKm = calculateDataForPie(geoData, 'areaInSqKm', max);
    const piePopulation = calculateDataForPie(geoData, 'population', max);
    const tableData = calculateDataForTable(geoData);
    const tableDataTotal = calculateTableTotalValue(geoData);

    this.setState({
      pieAreaInSqKm,
      piePopulation,
      tableData,
      tableDataTotal,
    });
  }
  handleContinentChange = (continent) => {
    const currentGeoData = filterGeoDataByContinent(this.state.geoDataAll, continent);
    this.sortData(currentGeoData, this.state.metric, this.state.chartMax);
    this.setState({
      continent,
      currentGeoData,
    });
  } 
  handleMetricChange = (metric) => {
    this.setState({
      metric,
    });
  }
  handleMaxChange = (chartMax) => {
    this.sortData(this.state.currentGeoData, this.state.metric, chartMax);
    this.setState({
      chartMax,
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
          handleContinentChange={this.handleContinentChange}
          handleMetricChange={this.handleMetricChange}
          handleMaxChange={this.handleMaxChange}
        />
        {this.state.pieAreaInSqKm &&
          <div>
            <Pie
              metric={this.state.metric}
              pieAreaInSqKm={this.state.pieAreaInSqKm}
              piePopulation={this.state.piePopulation}
            />
            <Table
              tableData={this.state.tableData}
              tableDataTotal={this.state.tableDataTotal}
            />
          </div>
          
      }
      </div>
    );
  }
}

export default GeoNames;
