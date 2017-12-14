import React from 'react';

const Table = ({ tableData, tableDataTotal }) => {

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>continentName</th>
            <th>countryName</th>
            <th>areaInSqKm</th>
            <th>population</th>
          </tr>
          {tableData.map(data => (
            <tr key={`${data.continentName}-${data.areaInSqKm}-${data.population}`}>
              <th>{data.continentName}</th>
              <th>{data.countryName}</th>
              <th>{data.areaInSqKm}</th>
              <th>{data.population}</th>
            </tr>
          ))}
          <tr>
            <th />
            <th>TOTAL</th>
            <th>{tableDataTotal.areaInSqKm}</th>
            <th>{tableDataTotal.population}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;