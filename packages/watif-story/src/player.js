import React from 'react'
import Item from './item'

export default class Player extends Item {
  description () {
    return <text>This is you.</text>
  }
}
