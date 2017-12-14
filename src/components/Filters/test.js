/* global expect, it, describe, jest */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Filters from './Filters';

describe('Filters', () => {
  let component = shallow(<Filters />);
  const metricChangeMock = jest.fn();
  const chartChangeMock = jest.fn();

  it('Should render successfully', () => {
    expect(component.exists()).toEqual(true);
  });

  it('Should have three select fileds', () => {
    expect(component.find('select').length).toEqual(3);
  });

  describe('continent names', () => {
    it('Should have a select field for continent names', () => {
      expect(component.find('select [name="continent-names"]').length).toEqual(1);
    });
  });  
  
  describe('metric', () => {
    it('Should have a select field for metric', () => {
      expect(component.find('select [name="metric"]').length).toEqual(1);
    });

    it('Should have three values', () => {
      expect(component.find('select [name="metric"] option').length).toEqual(3);
    });

    it('Should call handleMetricChange function when value is changed', () => {
      component = mount(<Filters handleMetricChange={metricChangeMock} />);

      expect(metricChangeMock.mock.calls.length).toEqual(0);
      component.find('select [name="metric"]').simulate('change', { target: { value: 'areaInSqKm'}});
      expect(metricChangeMock.mock.calls.length).toEqual(1);
    });
  });
    
  describe('chart max', () => {
    it('Should have a select field for chart max results', () => {
      expect(component.find('select [name="chart-max"]').length).toEqual(1);
    });

    it('Should have four values', () => {
      expect(component.find('select [name="chart-max"] option').length).toEqual(4);
    });

    it('Should call handleChartMaxChange function when value is changed', () => {
      component = mount(<Filters handleMetricChange={chartChangeMock} />);
      
      expect(chartChangeMock.mock.calls.length).toEqual(0);
      component.find('select [name="chart-max"]').simulate('change', { target: { value: 10 }});
      expect(chartChangeMock.mock.calls.length).toEqual(1);
    });
  });
});

