import React from 'react'
import {Item} from 'watif-story'

export class IntroductoryNote extends Item {
  description () {
    return <text>a single sheet of paper, folded in half</text>
  }

  verb_take = {
    enabled: () => this.location() !== 'inventory',
    action: () => {
      this.setLocation('inventory')
      return <text>
        As you peel the tape off the front door, it also lifts off some of the stain, leaving a
        small patch of the lighter wood visible underneath. You hope the owners won't notice.
      </text>
    },
  }

  verb_read = {
    enabled: () => this.location() === 'inventory',
    action: () => {
      this.setState({hasBeenRead: true})
      return <text>
        The note says: "Thank you for watching the house for us while we're away.
        You can find the key in the usual place. Please remember to feed the fish."

        Oh, that's right! There's a hide-a-key around here somewhere...
      </text>
    },
  }
}
