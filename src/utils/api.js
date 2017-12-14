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

export function calculateDataForPie(geoData, metric) {
  const areaInSqKm = alasql('SELECT countryName, SUM(areaInSqKm) AS areaInSqKm FROM ? GROUP BY countryName ORDER BY areaInSqKm DESC', [geoData]);
  console.log(areaInSqKm);
}

const config = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  series: [{
    name: 'areaInSqKm',
    colorByPoint: true,
    data: [{
      name: 'EU',
      y: 80.22,
    },
    {
      name: 'AS',
      y: 19.88,
    }],
  }],
};