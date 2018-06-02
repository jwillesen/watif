import React from 'react'
import {func} from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faEye, faBox, faHandHoldingBox } from '@fortawesome/pro-regular-svg-icons'

import './tabs.css'

export default class Tabs extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      activeTab: 'events',
    }
  }

  static propTypes = {
    onChangeTab: func,
  }

  selectTab (id) {
    this.setState({activeTab: id})
  }

  onKey = (event) => {
    const activeIndex = this.tabs.findIndex(t => t.id === this.state.activeTab)
    let newIndex
    if (event.key === 'ArrowRight') {
      newIndex = activeIndex + 1
      if (newIndex >= this.tabs.length) newIndex = 0
    } else if (event.key === 'ArrowLeft') {
      let newIndex = activeIndex - 1
      if (newIndex < 0) newIndex = this.tabs.length - 1
      const newTab = this.tabs[newIndex]
      this.setState({activeTab: this.tabs[newIndex].id}, () => this.buttons[newTab.id].focus())
    } else if (event.key === 'Home') {
      newIndex = 0
    } else if (event.key === 'End') {
      newIndex = this.tabs.length - 1
    }

    if (newIndex !== undefined) {
      const newTab = this.tabs[newIndex]
      this.setState({activeTab: this.tabs[newIndex].id}, () => this.buttons[newTab.id].focus())
    }
  }

  tabs = [
    { id: 'events', label: 'Events', icon: faBook, select: () => this.selectTab('events') },
    { id: 'look', label: 'Look Around', icon: faEye, select: () => this.selectTab('look') },
    { id: 'examine', label: 'Examine', icon: faBox, select: () => this.selectTab('examine') },
    { id: 'inventory', label: 'Inventory', icon: faHandHoldingBox, select: () => this.selectTab('inventory') },
  ]
  buttons = {}

  renderTab (tab) {
    const styles = ['tab']
    let tabIndex = -1
    if (tab.id === this.state.activeTab) {
      styles.push('selected')
      tabIndex = 0
    }

    return <button
      key={tab.id}
      ref={elt => this.buttons[tab.id] = elt}
      tabIndex={tabIndex}
      styleName={styles.join(' ')}
      role="tab"
      aria-label={tab.label}
      aria-selected={tabIndex === 0}

      onClick={tab.select}
      onKeyDown={this.onKey}
    >
      <FontAwesomeIcon icon={tab.icon} size="lg" />
    </button>
  }

  render () {
    return <div
      styleName="tabs"
      role="tablist"
      aria-label="Events, Look Around, Examine, and Inventory"
    >
      {this.tabs.map((tab) => this.renderTab(tab))}
    </div>
  }
}
