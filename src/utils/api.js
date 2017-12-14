import alasql from 'alasql';

export async function getData() {
  const url = 'http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane';
  const res = await fetch(url).then(data => data.json());
  const requiredData = 
    res.geonames.map(geo => (
      {
        continentName: geo.continentName,
        countryName: geo.countryName,
        areaInSqKm: parseInt(geo.areaInSqKm, 10),
        population: parseInt(geo.population, 10),
      }
    ));
  return requiredData;
}

export function sortContinentNames(geoData) {
  const continentsList = ['ALL'];
  geoData.map(data => (
    continentsList.includes(data.continentName) === false && continentsList.push(data.continentName)
  ));
  return continentsList.sort();
}

function calcurateOther(data, metric) {
  const otherData = data.reduce((sum, val) => { return sum + val[metric]; }, 0);
  return [{
    countryName: 'Other',
    [metric]: otherData,
  }];
}

function formatForDisplay(data, metric, max) {
  const showData = data.slice(0, max);
  const otherData = calcurateOther(data.slice(max), metric);
  return [
    ...showData,
    ...otherData,
  ];
}

export function filterGeoDataByContinent(geoData, continent) {
  return geoData.filter(data => data.continentName === continent);
}

export function calculateDataForPie(geoData, metric, max) {
  const sumData = alasql(`SELECT countryName, SUM(${metric}) AS ${metric} FROM ? GROUP BY countryName ORDER BY ${metric} DESC`, [geoData]);
  return formatForDisplay(sumData, metric, max);
}

export function calculateDataForTable(geoData) {
  function compare(a, b) {
    const continentNameA = a.continentName.toUpperCase();
    const continentNameB = b.continentName.toUpperCase();
    
    if (continentNameA > continentNameB) {
      return 1;
    } else if (continentNameA < continentNameB) {
      return -1;
    }
    return 0;
  }

  return geoData.sort(compare);
}

export function calculateTableTotalValue(data) {
  const areaInSqKmTotal = data.reduce((sum, val) => { return sum + val.areaInSqKm; }, 0);
  const populationTotal = data.reduce((sum, val) => {return sum + val.population}, 0);

  return {
    areaInSqKm: areaInSqKmTotal,
    population: populationTotal,
  };
}

export function sortTableData(data, columnName, sort) {
  function compare(a, b) {
    const A = a[columnName];
    const B = b[columnName];

    let first;
    let second;
    if (sort === 'desc') {
      first = 1;
      second = -1;
    } else {
      first = -1;
      second = 1;
    }

    if (A > B) {
      return first;
    } else if (A < B) {
      return second;
    }
    return 0; 
  }

  return data.sort(compare);
}
