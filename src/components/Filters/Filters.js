import React from 'react';
import PropTypes from 'prop-types';

const metricValues = ['ALL', 'areaInSqKm', 'population'];
const chartMaxValues = [5, 10, 15, 20];

const Filters = ({ continentsList, continent, metric, chartMax }) => {
  return (
    <div>
      <select name="continent-names" value={continentsList}>
        {continentsList !== [] &&
          continentsList.map(value => (
            <option value={value} key={`continent-${value}`}>
              {value}
            </option>
          ))}
      </select>
      <select name="metric" value={metric}>
        {metricValues.map(value => (
          <option value={value} key={`metric-${value}`}>
            {value}
          </option>
        ))}
      </select>
      <select name="chart-max" value={chartMax}>
        {chartMaxValues.map(value => (
          <option value={value} key={`metric-${value}`}>
          {value}
        </option> 
        ))}
      </select>
    </div>
  );
};

Filters.propTypes = {
  continentsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  continent: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
  chartMax: PropTypes.number.isRequired,
};


export default Filters;
