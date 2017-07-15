import React from 'react'
import Item from './item'

export default class Inventory extends Item {
  constructor (...args) {
    super(...args)
    this.setState({location: 'player'})
  }

  description () {
    return <text>This is what you have.</text>
  }
}
