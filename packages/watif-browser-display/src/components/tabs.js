import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faEye, faBox, faHandHoldingBox } from '@fortawesome/pro-regular-svg-icons'

import './tabs.css'

export default class Tabs extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      activeTabLabel: 'Events',
    }
  }

  selectEvents = () => this.setState({activeTabLabel: 'Events'})
  selectLook = () => this.setState({activeTabLabel: 'Look Around'})
  selectExamine = () => this.setState({activeTabLabel: 'Examine'})
  selectInventory = () => this.setState({activeTabLabel: 'Inventory'})

  renderTab (label, icon, onClick) {
    const styles = ['tab']
    if (label === this.state.activeTabLabel) styles.push('selected')

    return <button
      styleName={styles.join(' ')}
      role="tab"
      aria-label={label}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </button>
  }

  render () {
    return <div
      styleName="tabs"
      role="tablist"
      aria-label="Events, Look Around, Examine, and Inventory"
    >
      {this.renderTab('Events', faBook, this.selectEvents)}
      {this.renderTab('Look Around', faEye, this.selectLook)}
      {this.renderTab('Examine', faBox, this.selectExamine)}
      {this.renderTab('Inventory', faHandHoldingBox, this.selectInventory)}
    </div>
  }
}
