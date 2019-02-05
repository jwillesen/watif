import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Watext from '../watext'

it('creates a paragraph for a top level text', () => {
  const {getByText} = render(<Watext watext={<text>foo</text>} />)
  getByText('foo')
})

it('creates a paragraph for a top level pg', () => {
  const {getByText} = render(<Watext watext={<pg>foo</pg>} />)
  getByText('foo')
})

it('creates multiple paragraphs inside text', () => {
  const {getByText} = render(
    <Watext
      watext={
        <text>
          <pg>foo</pg>
          <pg>bar</pg>
        </text>
      }
    />
  )
  getByText('foo')
  getByText('bar')
})

it('creates multiple paragraphs inside pg', () => {
  const {getByText} = render(
    <Watext
      watext={
        <pg>
          <pg>foo</pg>
          <pg>bar</pg>
        </pg>
      }
    />
  )
  getByText('foo')
  getByText('bar')
})

it('creates paragraphs using paragraph tag as a divider', () => {
  const {getByText} = render(
    <Watext
      watext={
        <text>
          foo
          <pg />
          bar
        </text>
      }
    />
  )
  getByText('foo')
  getByText('bar')
})

it('creates item buttons', () => {
  const {getByText} = render(
    <Watext
      watext={
        <text>
          here is <item id="an-item">an item</item> for you
        </text>
      }
    />
  )
  const itemButton = getByText('an item')
  expect(itemButton.tagName).toBe('BUTTON')
})

it('alerts if the item has child elements', () => {
  const {getByText} = render(
    <Watext
      watext={
        <text>
          here is{' '}
          <item id="some-item">
            a special <pg>type of thing</pg>
          </item>{' '}
          for you
        </text>
      }
    />
  )
  getByText(/alert/i)
})

it('alerts if the item lacks an id', () => {
  const {getByText} = render(
    <Watext
      watext={
        <text>
          <item>an item</item>
        </text>
      }
    />
  )
  getByText(/alert/i)
})

it('alerts if it tag is not recognized', () => {
  const {getByText} = render(
    <Watext
      watext={
        <text>
          stuff <somethingbad>bad things</somethingbad> here
        </text>
      }
    />
  )
  getByText(/alert/i)
})

it('invokes the callback when an item is clicked', () => {
  const onClick = jest.fn()
  const {getByText} = render(
    <Watext
      watext={
        <text>
          here is <item id="an-item">an item</item> to click
        </text>
      }
      onItemClick={onClick}
    />
  )
  fireEvent.click(getByText('an item'))
  expect(onClick).toHaveBeenCalledWith('an-item')
})
