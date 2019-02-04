import React from 'react'

export function initialize(universe) {
  universe.addLogEntry(
    <text>
      Now that you're here, you're not sure whether it was a good idea to house sit for a week, but
      here you are, standing in front of the house.
    </text>
  )

  universe.setStateOf('player', {location: 'front-porch'})
}
