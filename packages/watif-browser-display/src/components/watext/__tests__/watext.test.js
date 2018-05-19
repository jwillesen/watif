import React from 'react'
import {shallow} from 'enzyme'
import Watext from '../index'
// import toJson from 'enzyme-to-json'

it('renders provided text if watext is missing', () => {
  const wrapper = shallow(<Watext emptyText="nothing here" />)
  expect(wrapper).toMatchSnapshot()
})

it('creates at least one paragraph for top level text', () => {
  const wrapper = shallow(<Watext watext={<text>foo</text>} />)
  expect(wrapper).toMatchSnapshot()
})

it('creates a paragraph for a top level paragraph tag', () => {
  const wrapper = shallow(<Watext watext={<pg>foo</pg>} />)
  expect(wrapper).toMatchSnapshot()
})

it('creates multiple paragraphs with top level text', () => {
  const wrapper = shallow(<Watext watext={
    <text>
      <pg>foo</pg>
      <pg>bar</pg>
    </text>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('creates multiple paragraphs with top level pg', () => {
  const wrapper = shallow(<Watext watext={
    <pg>
      <pg>foo</pg>
      <pg>bar</pg>
    </pg>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('creates and flattens multiple paragraphs when they are nested', () => {
  const wrapper = shallow(<Watext watext={
    <text>
      <pg>
        foo
        <pg>bar</pg>
        baz
      </pg>
    </text>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('creates paragraphs using paragraph tag as a divider', () => {
  const wrapper = shallow(<Watext watext={
    <text>foo<pg/>bar</text>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('creates item buttons', () => {
  const wrapper = shallow(<Watext watext={
    <text>here is <item id='an-item'>an item</item> for you</text>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('alerts if the item has child elements', () => {
  const wrapper = shallow(<Watext watext={
    <text>here is <item id='some-item'>a special <pg>type of thing</pg></item> for you</text>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('alerts if the item lacks an id', () => {
  const wrapper = shallow(<Watext watext={
    <text><item>an item</item></text>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('alerts if it tag is not recognized', () => {
  const wrapper = shallow(<Watext watext={
    <text>stuff <somethingbad>bad things</somethingbad> here</text>
  } />)
  expect(wrapper).toMatchSnapshot()
})

it('invokes the callback when an item is clicked', () => {
  const onClick = jest.fn()
  const wrapper = shallow(<Watext
    watext={
      <text>here is <item id="an-item">an item</item> to click</text>
    }
    onItemClick={onClick}
  />)
  wrapper.find('button').simulate('click')
  expect(onClick).toHaveBeenCalledWith('an-item')
})

// react already handles this type of thing
xit('alerts if it encounters a child it does not recognized', () => {
  const wrapper = shallow(<Watext watext={
    <text>something weird: {{some: 'object'}}</text>
  } />)
  expect(wrapper).toMatchSnapshot()
})
