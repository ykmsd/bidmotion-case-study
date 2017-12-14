import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ handleGoClick }) => (
  <div className="header">
    <h1>Hydrane Frontend Dev CS</h1>
    <button label="Go" onClick={handleGoClick}>Go</button>
  </div>
);

Header.propTypes = {
  handleGoClick: PropTypes.func.isRequired,
};

export default Header;
