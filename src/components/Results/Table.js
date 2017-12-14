import React from 'react';

const Table = ({ metric, tableData, tableDataTotal }) => { 
  let firstColumn, table, total;
  if (metric === 'ALL') {
    firstColumn = (
      <tr>
        <th>continentName</th>
        <th>countryName</th>
        <th>areaInSqKm</th>
        <th>population</th>
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
      <tr>
        <th />
        <th>TOTAL</th>
        <th>{tableDataTotal.areaInSqKm}</th>
        <th>{tableDataTotal.population}</th>
      </tr>
    );
  } else if (metric === 'areaInSqKm') {
    firstColumn = (
      <tr>
        <th>continentName</th>
        <th>countryName</th>
        <th>areaInSqKm</th>
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
      <tr>
        <th />
        <th>TOTAL</th>
        <th>{tableDataTotal.areaInSqKm}</th>
      </tr>
    );
  } else {
    firstColumn = (
      <tr>
        <th>continentName</th>
        <th>countryName</th>
        <th>population</th>
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
      <tr>
        <th />
        <th>TOTAL</th>
        <th>{tableDataTotal.population}</th>
      </tr>
    );
  }
  return (
    <div>
      <table>
        <tbody>
          { firstColumn }
          { table }
          { total }
        </tbody>
      </table>
    </div>
  );
};

export default Table;