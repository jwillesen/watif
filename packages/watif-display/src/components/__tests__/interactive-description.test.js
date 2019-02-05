import React from 'react'
import {render} from 'react-testing-library'
import InteractiveDescription from '../interactive-description'

it('renders properly', () => {
  const {getByText} = render(
    <InteractiveDescription
      emptyText="nothing here"
      watext={<text>description here</text>}
      verbs={[]}
      onItemClick={jest.fn()}
      onVerbClick={jest.fn()}
    />
  )
  getByText('description here')
})
