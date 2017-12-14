/* global expect, it, describe, jest */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';

describe('Header component', () => {
  let component;
  const clickMock = jest.fn();

  beforeEach(() => {
    component = shallow(<Header />)
  });

  it('Should render successfully"', () => {  
    expect(component.exists()).toEqual(true);
  });

  it('Should display a title "Hydrane Frontend Dev CS”"', () => {
    expect(component.find('h1').length).toEqual(1);
    expect(component.find('h1').text()).toEqual('Hydrane Frontend Dev CS');
  });

  it('Should display a button "Go"', () => {
    expect(component.find('button').length).toEqual(1);
    expect(component.find('button').text()).toEqual('Go');
  });

  // it('Should call the getData function when clicked', () => {
  //   component = mount(<Header getData={clickMock} />);
  //   expect(clickMock.mock.calls.length).toEqual(0);
  //   component.find('button').simulate('click');
  //   expect(clickMock.mock.calls.length).toEqual(1);
  // });
});
