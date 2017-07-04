import React from 'react'
import {Item} from 'watif-core'

export class FrontDoorKey extends Item {
  description () {
    return <text>It's a key</text>
  }

  verbUnlock = {
    compound: true,
    connector: 'the',
    enabled: () => this.getLocation() === 'inventory',
    action: (target) => {
      if (target === 'front-door') {
        this.setStateOf('front-door', {locked: false})
        return <text>The door lock clicks over.</text>
      }
      return <text>You can't unlock that with this key.</text>
    },
  }
}
