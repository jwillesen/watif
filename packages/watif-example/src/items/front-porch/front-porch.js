import React from 'react'
import {Item} from 'watif-story'

export class FrontPorch extends Item {
  describeNote () {
    if (this.getLocationOf('introductory-note') === 'front-door') {
      return <text>
        A <item id="introductory-note">note</item> is taped to the door below the knocker.
      </text>
    }
  }

  description () {
    return <text>
      The <item id="front-door">front door</item> looks old and weathered, as if this house had been
      here for hundreds of years, even though it was built only last year. Below the peep hole hangs
      a large brass knocker.
      {this.describeNote()}
      <item id="path-stones">White stones</item> run along the brick path leading to the front door.
    </text>
  }
}