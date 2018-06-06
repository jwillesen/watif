import React from 'react'
import {shallow, mount} from 'enzyme'

import { Tabs, TabPanel } from '../tabs'

function basicTabs () {
  return <Tabs label="some tabs">
    <TabPanel id="first" label="first tab" a11yLabel="first tab a11y">First</TabPanel>
    <TabPanel id="second" label="second tab" a11yLabel="second tab a11y">Second</TabPanel>
    <TabPanel id="third" label="third tab" a11yLabel="third tab a11y">Third</TabPanel>
    <TabPanel id="fourth" label="fourth tab" a11yLabel="fourth tab a11y">Fourth</TabPanel>
  </Tabs>
}

it('renders the things', () => {
  const wrapper = mount(basicTabs())
  expect(wrapper).toMatchSnapshot()
})

it('renders one selected tab', () => {
  const wrapper = shallow(basicTabs())
  expect(wrapper.find('button[role="tab"]')).toHaveLength(4)
  expect(wrapper.find('button[aria-selected=true]')).toHaveLength(1)
  expect(wrapper.find('button.selected').text()).toBe('first tab')
  expect(wrapper.find('button[aria-selected=false]')).toHaveLength(3)
})

it('manages tab index', () => {
  const wrapper = shallow(basicTabs())
  expect(wrapper.find('button[tabIndex=0]')).toHaveLength(1)
  expect(wrapper.find('button[tabIndex=-1]')).toHaveLength(3)
})

it('manages hidden', () => {
  const wrapper = shallow(basicTabs())
  expect(wrapper.find('div[hidden=false]')).toHaveLength(1)
  expect(wrapper.find('div[hidden=true]')).toHaveLength(3)
})

it('changes the selected tab on click', () => {
  const wrapper = shallow(basicTabs())
  wrapper.find('button[aria-selected=false]').first().simulate('click')
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.text()).toEqual('second tab')
  expect(selectedButton.props().tabIndex).toBe(0)
  expect(wrapper.find('button[tabIndex=-1]')).toHaveLength(3)
})

it('changes the selected tab on right arrow', () => {
  const wrapper = mount(basicTabs())
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowRight'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.text()).toBe('second tab')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('wraps around to first tab on right arrow', () => {
  const wrapper = mount(basicTabs())
  wrapper.find('button').last().simulate('click')
  expect(wrapper.find('button.selected').text()).toBe('fourth tab')
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowRight'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.text()).toBe('first tab')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('changes the selected tab on left arrow', () => {
  const wrapper = mount(basicTabs())
  wrapper.find('button').last().simulate('click')
  expect(wrapper.find('button.selected').text()).toBe('fourth tab')
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowLeft'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.text()).toBe('third tab')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('wraps around to the last tab on left arrow', () => {
  const wrapper = mount(basicTabs())
  wrapper.find('button.selected').simulate('keyDown', {key: 'ArrowLeft'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.text()).toBe('fourth tab')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('activates the first tab on the home', () => {
  const wrapper = mount(basicTabs())
  wrapper.find('button').last().simulate('click')
  wrapper.find('button.selected').simulate('keyDown', {key: 'Home'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.text()).toBe('first tab')
  expect(document.activeElement).toBe(selectedButton.instance())
})

it('activates the first tab on the end', () => {
  const wrapper = mount(basicTabs())
  wrapper.find('button').last().simulate('click')
  wrapper.find('button.selected').simulate('keyDown', {key: 'End'})
  const selectedButton = wrapper.find('button.selected')
  expect(selectedButton.text()).toBe('fourth tab')
  expect(document.activeElement).toBe(selectedButton.instance())
})
