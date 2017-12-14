/* global expect, it, describe */

import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header component', () => {
  const component = shallow(<Header />);

  it('Should render successfully"', () => {  
    expect(component.exists()).toEqual(true);
  });

  it('Should display a title "Hydrane Frontend Dev CS”"', () => {
    expect(component.find('h1').length).toEqual(1);
    expect(component.find('h1').text()).toEqual('Hydrane Frontend Dev CS');
  });
});
