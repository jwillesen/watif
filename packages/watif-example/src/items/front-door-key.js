import React from 'react'
import {Item} from 'watif-story'

export class FrontDoorKey extends Item {
  description () {
    return <text>It's a key</text>
  }

  verb_unlock = {
    compound: true,
    connector: 'the',
    enabled: () => this.location() === 'inventory',
    action: (verb) => {
      if (verb.object === 'front-door') {
        this.setStateOf('front-door', {locked: false})
        return <text>The door lock clicks over.</text>
      }
      return <text>You can't unlock that with this key.</text>
    },
  }
}
