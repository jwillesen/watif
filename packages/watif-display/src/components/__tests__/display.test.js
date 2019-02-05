import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Display from '../display'

it.skip('calls calls executeVerb with examine verb on item click', () => {
  const executeVerb = jest.fn()
  const {getByText} = render(<Display storyState={{}} executeVerb={executeVerb} />)
  fireEvent.click(getByText('some item'))
  expect(executeVerb).toHaveBeenCalledWith({
    id: 'examine',
    subject: 'some-item-id',
    target: null,
  })
})
