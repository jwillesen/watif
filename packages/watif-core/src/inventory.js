import React from 'react'
import Item from './item'

export default class Inventory extends Item {
  description () {
    return <text>This is what you have.</text>
  }

  initialState () {
    return {location: 'player'}
  }
}
