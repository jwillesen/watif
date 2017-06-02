import React from 'react'
import changeCase from 'change-case'

export default class Item {
  id () {
    return changeCase.param(this.constructor.name)
  }
  getLocationOf (itemId) {
    return 'front-door'
  }

  description () {
    return <text>Item `{this.id()}` has no description</text>
  }
}
