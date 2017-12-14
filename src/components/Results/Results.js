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
      y: 80.22,
    },
    {
      name: 'AS',
      y: 19.88,
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
