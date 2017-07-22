import React from 'react'
import './style.css'

export default class Alert extends React.Component {
  render () {
    return <div styleName="root">Alert! {this.props.children}</div> // eslint-disable-line react/prop-types
  }
}
