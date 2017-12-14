import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ metric, tableData, tableDataTotal, handleTableClick }) => { 
  let firstColumn, table, total;
  if (metric === 'ALL') {
    firstColumn = (
      <tr className="table__first-column">
        <th onClick={() => handleTableClick('continentName')}>continentName</th>
        <th onClick={() => handleTableClick('countryName')}>countryName</th>
        <th onClick={() => handleTableClick('areaInSqKm')}>areaInSqKm</th>
        <th onClick={() => handleTableClick('population')}>population</th>
      </tr>
    );
    table = tableData.map(data => (
      <tr key={`${data.continentName}-${data.areaInSqKm}-${data.population}`}>
        <th>{data.continentName}</th>
        <th>{data.countryName}</th>
        <th>{data.areaInSqKm}</th>
        <th>{data.population}</th>
      </tr>
    ));
    total = (
      <tr className="table__last-column">
        <th />
        <th>TOTAL</th>
        <th>{tableDataTotal.areaInSqKm}</th>
        <th>{tableDataTotal.population}</th>
      </tr>
    );
  } else if (metric === 'areaInSqKm') {
    firstColumn = (
      <tr className="table__first-column">
        <th onClick={() => handleTableClick('continentName')}>continentName</th>
        <th onClick={() => handleTableClick('countryName')}>countryName</th>
        <th onClick={() => handleTableClick('areaInSqKm')}>areaInSqKm</th>
      </tr>
    );
    table = tableData.map(data => (
      <tr key={`${data.continentName}-${data.areaInSqKm}-${data.population}`}>
        <th>{data.continentName}</th>
        <th>{data.countryName}</th>
        <th>{data.areaInSqKm}</th>
      </tr>
    ));
    total = (
      <tr className="table__last-column">
        <th />
        <th>TOTAL</th>
        <th>{tableDataTotal.areaInSqKm}</th>
      </tr>
    );
  } else {
    firstColumn = (
      <tr className="table__first-column">
        <th onClick={() => handleTableClick('continentName')}>continentName</th>
        <th onClick={() => handleTableClick('countryName')}>countryName</th>
        <th onClick={() => handleTableClick('population')}>population</th>
      </tr>
    );
    table = tableData.map(data => (
      <tr key={`${data.continentName}-${data.areaInSqKm}-${data.population}`}>
        <th>{data.continentName}</th>
        <th>{data.countryName}</th>
        <th>{data.population}</th>
      </tr>
    ));
    total = (
      <tr className="table__last-column">
        <th />
        <th>TOTAL</th>
        <th>{tableDataTotal.population}</th>
      </tr>
    );
  }
  return (
    <div className="table">
      <table>
        <tbody className="table__data">
          { firstColumn }
          { table }
          { total }
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  metric: PropTypes.string.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableDataTotal: PropTypes.objectOf(PropTypes.number).isRequired,
  handleTableClick: PropTypes.func.isRequired,
};

export default Table;
