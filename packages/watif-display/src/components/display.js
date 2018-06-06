import React from 'react'
import { func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faEye, faBox, faHandHoldingBox } from '@fortawesome/pro-regular-svg-icons'
import { Tabs, TabPanel } from './tabs'
import InventoryTree from './inventory-tree'
import StoryContent from './story-content'
import {storyShape} from '../property-shapes'
import './display.css'

export default class Display extends React.Component {
  static propTypes = {
    storyState: storyShape.isRequired,
    executeVerb: func, // ({ id: verb-id, subject: item-id, target: (item-id | null) })
  }

  handleItemClick = (itemId) => {
    if (this.props.executeVerb) {
      this.props.executeVerb({
        id: 'examine',
        subject: itemId,
        target: null,
      })
    }
  }

  icon (fa) {
    return <FontAwesomeIcon icon={fa} size="lg" />
  }

  render () {
    return <div styleName='root'>
      <Tabs label="Story Content">
        <TabPanel id="events" label={this.icon(faBook)} a11yLabel="events">
          <span>Events</span>
        </TabPanel>
        <TabPanel id="look" label={this.icon(faEye)} a11yLabel="look around">
          <span>Look Around</span>
        </TabPanel>
        <TabPanel id="examine" label={this.icon(faBox)} a11yLabel="examine">
          <span>Examine</span>
        </TabPanel>
        <TabPanel id="inventory" label={this.icon(faHandHoldingBox)} a11yLabel="inventory">
          <span>Inventory</span>
        </TabPanel>
      </Tabs>
    </div>
  }
  // <div styleName="inventory-tree"><InventoryTree /></div>
  // <div styleName="story-content">
  //   <StoryContent
  //     storyState={this.props.storyState}
  //     onItemClick={this.handleItemClick}
  //     executeVerb={this.props.executeVerb}
  //   />
  // </div>

}
