import React from 'react';
import PropTypes from 'prop-types';

const metricValues = ['ALL', 'areaInSqKm', 'population'];
const chartMaxValues = [5, 10, 15, 20];

const Filters = ({ disabled, continentsList, continent, metric, chartMax, handleMetricChange, handleMaxChange, handleContinentChange }) => {
  return (
    <div className="filters">
      <select name="continent-names" value={continent} onChange={e => handleContinentChange(e.target.value)} disabled={disabled}>
        {continentsList !== [] &&
          continentsList.map(value => (
            <option value={value} key={`continent-${value}`}>
              {value}
            </option>
          ))}
      </select>
      <select name="metric" value={metric} onChange={e => handleMetricChange(e.target.value)} disabled={disabled}>
        {metricValues.map(value => (
          <option value={value} key={`metric-${value}`}>
            {value}
          </option>
        ))}
      </select>
      <select name="chart-max" value={chartMax} onChange={e => handleMaxChange(parseInt((e.target.value), 10))} disabled={disabled}>
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
  disabled: PropTypes.bool.isRequired,
  continentsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  continent: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
  chartMax: PropTypes.number.isRequired,
  handleContinentChange: PropTypes.func.isRequired,
  handleMetricChange: PropTypes.func.isRequired,
  handleMaxChange: PropTypes.func.isRequired,
};


export default Filters;
