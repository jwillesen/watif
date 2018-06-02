import React from 'react'
import {shallow, mount} from 'enzyme'

import Tabs from '../tabs'

it('renders one selected tab', () => {
  const wrapper = shallow(<Tabs />)
  expect(wrapper.find('button[role="tab"]')).toHaveLength(4)
  expect(wrapper.find('button[aria-selected=true]')).toHaveLength(1)
  expect(wrapper.find('button[aria-selected=true]').key()).toBe('events')
  expect(wrapper.find('button[aria-selected=false]')).toHaveLength(3)
})

it('manages tab index', () => {
  const wrapper = shallow(<Tabs />)
  expect(wrapper.find('button[tabIndex=0]')).toHaveLength(1)
  expect(wrapper.find('button[tabIndex=-1]')).toHaveLength(3)
})

it('changes the selected tab on click', () => {
  const wrapper = shallow(<Tabs />)
  wrapper.find('button[aria-selected=false]').first().simulate('click')
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.key()).toEqual('look')
  expect(selectedButton.props().tabIndex).toBe(0)
  expect(wrapper.find('button[tabIndex=-1]')).toHaveLength(3)
})

it('changes the selected tab on right arrow', () => {
  const wrapper = mount(<Tabs />)
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowRight'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.key()).toBe('look')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('wraps around to first tab on right arrow', () => {
  const wrapper = mount(<Tabs />)
  wrapper.find('button').last().simulate('click')
  expect(wrapper.find('button.selected').key()).toBe('inventory')
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowRight'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.key()).toBe('events')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('changes the selected tab on left arrow', () => {
  const wrapper = mount(<Tabs />)
  wrapper.find('button').last().simulate('click')
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowLeft'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.key()).toBe('examine')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('wraps around to the last tab on left arrow', () => {
  const wrapper = mount(<Tabs />)
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowLeft'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.key()).toBe('inventory')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('activates the first tab on the home', () => {
  const wrapper = mount(<Tabs />)
  wrapper.find('button').last().simulate('click')
  wrapper.find('button.selected').simulate('keyDown', {key: 'Home'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.key()).toBe('events')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('activates the first tab on the end', () => {
  const wrapper = mount(<Tabs />)
  wrapper.find('button').last().simulate('click')
  wrapper.find('button.selected').simulate('keyDown', {key: 'End'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.key()).toBe('inventory')
  expect(document.activeElement).toBe(selectedButton.instance())
})
