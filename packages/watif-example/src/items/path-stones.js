import React from 'react'
import {Item} from 'watif-story'

export class PathStones extends Item {
  description () {
    return <text>
      A set of white stones about the size of a softball line each side of the brick path leading
      to the front door.
    </text>
  }

  verb_search = {
    enabled: () => this.getStateOf('introductory-note').hasBeenRead,
    action: () => {
      this.setLocationOf('front-door-key', 'inventory')
      return <text>
        Now which stone held that hide-a-key? It takes you a few tries, but eventually you find the
        plastic stone that contains the key to the front door. You open it and take the key
      </text>
    },
  }
}
