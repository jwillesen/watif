import React from 'react'
import Display from '../index'
import {shallow} from 'enzyme'

it('renders', () => {
  const wrapper = shallow(<Display />)
  expect(wrapper).toMatchSnapshot()
})
