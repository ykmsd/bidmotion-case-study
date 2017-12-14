import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header component', () => {
  it('Should render successfully', () => {
    const component = shallow(<Header />);
    expect(component.exists()).toEqual(true);
  });
});