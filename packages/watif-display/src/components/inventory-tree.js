import React from 'react'
import './inventory-tree.css'

export default class InventoryTree extends React.Component {
  render () {
    return <div styleName="root">
      <h2 styleName="header">Inventory</h2>
      <div styleName="content">This is the inventory tree!</div>
    </div>
  }
}
