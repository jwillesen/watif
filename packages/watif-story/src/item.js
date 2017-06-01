import React from 'react'

export default class Item {
  getLocationOf (itemId) {
    return 'front-door'
  }

  description () {
    return <text>Item `{this.id()}` has no description</text>
  }
}
