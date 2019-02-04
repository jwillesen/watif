import React from 'react'
import {arrayOf, oneOfType, element, string, func} from 'prop-types'

import './tabs.css'

export class Tabs extends React.Component {
  buttonElts = {}

  static propTypes = {
    label: string.isRequired,
    children: oneOfType([arrayOf(element), element]), // TabPanel elements
    activeTab: string,
    onTabRequest: func, // (TabPanel.props.id of requested tab)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTab !== this.props.activeTab) {
      const elt = this.buttonElts[this.props.activeTab]
      if (elt) elt.focus()
    }
  }

  tabButtonId(panel) {
    return `tab-button-${panel.props.id}`
  }

  tabPanelId(panel) {
    return `tab-panel-${panel.props.id}`
  }

  onKey = event => {
    const panels = React.Children.toArray(this.props.children)
    const activeIndex = panels.findIndex(panel => panel.props.id === this.props.activeTab)
    let newIndex
    if (event.key === 'ArrowRight') {
      newIndex = activeIndex + 1
      if (newIndex >= panels.length) newIndex = 0
    } else if (event.key === 'ArrowLeft') {
      newIndex = activeIndex - 1
      if (newIndex < 0) newIndex = panels.length - 1
    } else if (event.key === 'Home') {
      newIndex = 0
    } else if (event.key === 'End') {
      newIndex = panels.length - 1
    }

    if (newIndex !== undefined) {
      const newPanel = panels[newIndex]
      this.props.onTabRequest(newPanel.props.id)
    }
  }

  renderButton(panel) {
    const styles = ['tab-button']
    let tabIndex = -1
    if (panel.props.id === this.props.activeTab) {
      styles.push('selected')
      tabIndex = 0
    }

    return (
      <button
        type="button"
        key={panel.props.id}
        ref={elt => (this.buttonElts[panel.props.id] = elt)}
        styleName={styles.join(' ')}
        id={this.tabButtonId(panel)}
        role="tab"
        tabIndex={tabIndex}
        aria-label={panel.props.a11yLabel}
        aria-selected={tabIndex === 0}
        aria-controls={this.tabPanelId(panel)}
        onClick={() => this.props.onTabRequest(panel.props.id)}
        onKeyDown={this.onKey}
      >
        {panel.props.label}
      </button>
    )
  }

  renderPanel(panel) {
    const hidden = this.props.activeTab !== panel.props.id
    return (
      <div
        key={panel.props.id}
        styleName="tab-panel"
        id={this.tabPanelId(panel)}
        role="tabpanel"
        aria-labelledby={this.tabButtonId(panel)}
        tabIndex={0}
        hidden={hidden}
      >
        {panel.props.children}
      </div>
    )
  }

  render() {
    return (
      <div styleName="tab-container">
        <div styleName="tab-bar" role="tablist" aria-label={this.props.label}>
          {React.Children.map(this.props.children, panel => this.renderButton(panel))}
        </div>
        <div styleName="tab-panels">
          {React.Children.map(this.props.children, panel => this.renderPanel(panel))}
        </div>
      </div>
    )
  }
}

// This is just an interface component for documentation
/* eslint-disable react/no-multi-comp, react/no-unused-prop-types */
export class TabPanel extends React.Component {
  static propTypes = {
    children: oneOfType([arrayOf(element), element, string]),
    id: string,
    label: oneOfType([element, string]),
    a11yLabel: string,
  }

  render() {
    return this.props.children
  }
}
