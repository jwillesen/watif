import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {Tabs, TabPanel} from '../tabs'

function basicTabs(tabProps) {
  return (
    <Tabs label="some tabs" activeTab="first" {...tabProps}>
      <TabPanel id="first" label="first tab" a11yLabel="first tab a11y">
        <span>First</span>
      </TabPanel>
      <TabPanel id="second" label="second tab" a11yLabel="second tab a11y">
        <span>Second</span>
      </TabPanel>
      <TabPanel id="third" label="third tab" a11yLabel="third tab a11y">
        <span>Third</span>
      </TabPanel>
      <TabPanel id="fourth" label="fourth tab" a11yLabel="fourth tab a11y">
        <span>Fourth</span>
      </TabPanel>
    </Tabs>
  )
}

it('renders one selected tab', () => {
  const {queryAllByRole, container} = render(basicTabs())
  expect(queryAllByRole('tab')).toHaveLength(4)
  expect(container.querySelectorAll('button[aria-selected=true]')).toHaveLength(1)
  expect(container.querySelectorAll('button[tabIndex="0"]')).toHaveLength(1)
  expect(container.querySelectorAll('button[aria-selected=false]')).toHaveLength(3)
  expect(container.querySelectorAll('button[tabIndex="-1"]')).toHaveLength(3)
})

it('manages hidden', () => {
  const {container} = render(basicTabs({activeTab: 'third'}))
  expect(container.querySelectorAll('div[role="tabpanel"]')).toHaveLength(4)
  expect(container.querySelectorAll('div[hidden]')).toHaveLength(3)
})

it('changes the selected tab on click', () => {
  const onTabRequest = jest.fn()
  const {getByText} = render(basicTabs({onTabRequest}))
  const secondButton = getByText('second tab')
  fireEvent.click(secondButton)
  expect(onTabRequest).toHaveBeenCalledWith('second')
})

it('changes the selected tab on right arrow', () => {
  const onTabRequest = jest.fn()
  const {container} = render(basicTabs({onTabRequest, activeTab: 'second'}))
  const selectedButton = container.querySelector('button[tabIndex="0"]')
  fireEvent.keyDown(selectedButton, {key: 'ArrowRight'})
  expect(onTabRequest).toHaveBeenCalledWith('third')
})

it('wraps around to first tab on right arrow', () => {
  const onTabRequest = jest.fn()
  const {container} = render(basicTabs({onTabRequest, activeTab: 'fourth'}))
  const selectedButton = container.querySelector('button[tabIndex="0"]')
  fireEvent.keyDown(selectedButton, {key: 'ArrowRight'})
  expect(onTabRequest).toHaveBeenCalledWith('first')
})

it('changes the selected tab on left arrow', () => {
  const onTabRequest = jest.fn()
  const {container} = render(basicTabs({onTabRequest, activeTab: 'second'}))
  const selectedButton = container.querySelector('button[tabIndex="0"]')
  fireEvent.keyDown(selectedButton, {key: 'ArrowLeft'})
  expect(onTabRequest).toHaveBeenCalledWith('first')
})

it('wraps around to last tab on left arrow', () => {
  const onTabRequest = jest.fn()
  const {container} = render(basicTabs({onTabRequest, activeTab: 'first'}))
  const selectedButton = container.querySelector('button[tabIndex="0"]')
  fireEvent.keyDown(selectedButton, {key: 'ArrowLeft'})
  expect(onTabRequest).toHaveBeenCalledWith('fourth')
})

it('activates the first tab on home', () => {
  const onTabRequest = jest.fn()
  const {container} = render(basicTabs({onTabRequest, activeTab: 'third'}))
  const selectedButton = container.querySelector('button[tabIndex="0"]')
  fireEvent.keyDown(selectedButton, {key: 'Home'})
  expect(onTabRequest).toHaveBeenCalledWith('first')
})

it('activates the last tab on end', () => {
  const onTabRequest = jest.fn()
  const {container} = render(basicTabs({onTabRequest, activeTab: 'second'}))
  const selectedButton = container.querySelector('button[tabIndex="0"]')
  fireEvent.keyDown(selectedButton, {key: 'End'})
  expect(onTabRequest).toHaveBeenCalledWith('fourth')
})

it('manages focus when it is updated with new props', () => {
  const {getByText, rerender} = render(basicTabs())
  expect(document.activeElement).toBe(document.body)
  rerender(basicTabs({activeTab: 'second'}))
  expect(document.activeElement).toBe(getByText('second tab'))
})
