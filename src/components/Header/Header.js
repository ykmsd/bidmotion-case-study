import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ handleGoClick, disabled }) => (
  <div className="header">
    <h1>Hydrane Frontend Dev CS</h1>
    <button label="Go" onClick={handleGoClick} disabled={disabled}>Go</button>
  </div>
);

Header.propTypes = {
  handleGoClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Header;
