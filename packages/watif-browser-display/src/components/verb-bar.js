import React from 'react'
import {arrayOf, func} from 'prop-types'
import {verbShape} from '../property-shapes'

import './verb-bar.css'

export default class VerbBar extends React.Component {
  static propTypes = {
    verbs: arrayOf(verbShape),
    onVerbClick: func,
  }

  renderVerbs () {
    if (!this.props.verbs) return
    return this.props.verbs.map(verb => {
      return <button
        key={verb.id}
        onClick={() => this.props.onVerbClick(verb)}
      >
        {verb.id}
      </button>
    })
  }

  render () {
    return <div styleName="content">{this.renderVerbs()}</div>
  }
}
