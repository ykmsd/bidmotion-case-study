import React from 'react';
import ReactHighCharts from 'react-highcharts';

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
      y: 73399692,
    },
    {
      name: 'AS',
      y: 9984670,
    }],
  }],
};

const Results = () => {
  return (
    <div>
      <ReactHighCharts config={config} />
      
    </div>
  );
};

export default Results;
