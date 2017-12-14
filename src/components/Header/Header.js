import React, { Component } from 'react';
import { getData } from '../../utils/api';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      geoData: null,
      continentNames: [],
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
    const continentNames = [];
    geoData.map(data => (
      continentNames.includes(data.continent) === false && continentNames.push(data.continent)
    ));
    this.setState({
      continentNames,
    });
  }
  render() {
    console.log(this.state.continentNames);
    return (
      <div>
        <h1>Hydrane Frontend Dev CS</h1>
        <button label="Go" onClick={this.handleGoClick}>Go</button>
      </div>
    );
  }
}

export default Header;
