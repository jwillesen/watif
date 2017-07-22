import React from 'react'
import {shallow} from 'enzyme'
import InteractiveDescription from '../index'

it('renders properly', () => {
  const wrapper = shallow(<InteractiveDescription
    emptyText="nothing here"
    watext={<text>description here</text>}
    verbs={[]}
    onItemClick={jest.fn()}
    onVerbClick={jest.fn()}
  />)
  expect(wrapper).toMatchSnapshot()
})
