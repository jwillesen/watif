import React from 'react'
import Watext from '../watext'
import VerbBar from '../verb-bar'
import './style.css'

export default class InteractiveDescription extends React.Component {
  render () {
    return <div styleName="root">
      <div styleName="watext"><Watext /></div>
      <div styleName="verb-bar"><VerbBar /></div>
    </div>
  }
}
