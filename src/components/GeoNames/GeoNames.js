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
  sortTableData,
} from '../../utils/api';
import '../../styles/style.css';

class GeoNames extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
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
      tableSort: {
        continentName: 'desc',
        countryName: 'desc',
        areaInSqKm: 'desc',
        population: 'desc',
      },
    };

    this.handleGoClick = this.handleGoClick.bind(this);
  }
  async handleGoClick() {
    const geoDataAll = await getData();
    const continentsList = sortContinentNames(geoDataAll);
    this.setState({
      disabled: false,
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
    if (continent !== 'ALL') {
      const currentGeoData = filterGeoDataByContinent(this.state.geoDataAll, continent);
      this.sortData(currentGeoData, this.state.metric, this.state.chartMax);
      this.setState({
        continent,
        currentGeoData,
      });
    }
    else {
      this.sortData(this.state.geoDataAll, 'ALL', this.state.chartMax);
    }
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
  handleTableClick = (columnName) => {
    const tableData = sortTableData(this.state.tableData, columnName, this.state.tableSort[columnName]);
    this.setState(prevState => ({
      tableData,
      tableSort: {
        ...prevState.tableSort,
        [columnName]: !prevState.tableSort[columnName],
      },
    }));
  }
  render() {
    return (
      <div>
        <Header handleGoClick={this.handleGoClick} />
        <Filters
          disabled={this.state.disabled}
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
              metric={this.state.metric}
              tableData={this.state.tableData}
              tableDataTotal={this.state.tableDataTotal}
              handleTableClick={this.handleTableClick}
            />
          </div>
          
      }
      </div>
    );
  }
}

export default GeoNames;
