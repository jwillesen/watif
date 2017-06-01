import React from 'react'
import {Item} from 'watif-story'

export class FrontDoor extends Item {
  description () {
    return <text>
      It's a door.
    </text>
  }

  verb_knock () {
    // Note that you can just return text here and it will be added to the log
    return <text>
      You bang the knocker several times against the door. You can almost feel it echoing
      through the house. No one comes to answer; probably no one is home.
    </text>
  }

  verb_open () {
    if (this.getState().locked) {
      return <text>You can't open the door because it's locked.</text>
    }
    return <text>You go inside the house and win the game!</text>
  }
}
