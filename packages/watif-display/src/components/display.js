import React from 'react'
import { func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faEye, faBox, faHandHoldingBox } from '@fortawesome/pro-regular-svg-icons'
import { Tabs, TabPanel } from './tabs'
import InteractiveDescription from './interactive-description'
import Watext from './watext'
import {storyShape} from '../property-shapes'
import './display.css'

export default class Display extends React.Component {
  static propTypes = {
    storyState: storyShape.isRequired,
    executeVerb: func, // ({ id: verb-id, subject: item-id, target: (item-id | null) })
  }

  constructor (...args) {
    super(...args)
    this.state = {
      activeTab: 'events',
    }
  }

  handleTabRequest = (tabPanelId) => {
    this.setState({activeTab: tabPanelId})
  }

  handleItemClick = (itemId) => {
    if (this.props.executeVerb) {
      this.props.executeVerb({
        id: 'examine',
        subject: itemId,
        target: null,
      })
    }
    this.setState({activeTab: 'examine'})
  }

  handleCurrentItemVerbClick = (verb) => {
    if (!this.props.executeVerb) return
    this.props.executeVerb({
      id: verb.id,
      subject: this.props.storyState.universe.currentItemId,
    })
    this.setState({activeTab: 'events'})
  }

  handleCurrentRoomVerbClick = (verb) => {
    if (!this.props.executeVerb) return
    this.props.executeVerb({
      id: verb.id,
      subject: this.props.storyState.universe.currentRoomId,
    })
    this.setState({activeTab: 'events'})
  }

  icon (fa) {
    return <FontAwesomeIcon icon={fa} size="lg" />
  }

  render () {
    return <div styleName='root'>
      <Tabs label="Story Content" activeTab={this.state.activeTab} onTabRequest={this.handleTabRequest}>
        <TabPanel id="events" label={this.icon(faBook)} a11yLabel="events">
          <Watext watext={this.props.storyState.universe.log} />
        </TabPanel>
        <TabPanel id="look" label={this.icon(faEye)} a11yLabel="look around">
          <InteractiveDescription
            title="Look Around"
            emptyText="No Current Room"
            watext={this.props.storyState.currentRoomDescription}
            verbs={this.props.storyState.currentRoomVerbs}
            onItemClick={this.handleItemClick}
            onVerbClick={this.handleCurrentRoomVerbClick}
          />
        </TabPanel>
        <TabPanel id="examine" label={this.icon(faBox)} a11yLabel="examine">
          <InteractiveDescription
            title="Examine"
            emptyText="No Current Item"
            watext={this.props.storyState.currentItemDescription}
            verbs={this.props.storyState.currentItemVerbs}
            onItemClick={this.handleItemClick}
            onVerbClick={this.handleCurrentItemVerbClick}
          />
        </TabPanel>
        <TabPanel id="inventory" label={this.icon(faHandHoldingBox)} a11yLabel="inventory">
          <span>Inventory</span>
        </TabPanel>
      </Tabs>
    </div>
  }
}
