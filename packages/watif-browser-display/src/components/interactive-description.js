import React from 'react'
import { string, element, func, arrayOf } from 'prop-types'
import Watext from './watext'
import VerbBar from './verb-bar'
import { verbShape } from '../property-shapes'
import './interactive-description.css'

export default class InteractiveDescription extends React.Component {
  static propTypes = {
    title: string,
    emptyText: string,
    watext: element,
    verbs: arrayOf(verbShape),
    onItemClick: func, // (item-id)
    onVerbClick: func, // (item-id, verb-id)
  }

  static defaultProps = {
    emptyText: 'No text',
  }

  watext () {
    if (this.props.watext) {
      return <div styleName="watext">
        <Watext watext={this.props.watext} onItemClick={this.props.onItemClick} />
      </div>
    } else {
      return <div styleName="no-text">
        {this.props.emptyText}
      </div>
    }
  }

  render () {
    return <div styleName="row">
      <div styleName="column main">
        <h2 styleName="heading">{this.props.title}</h2>
        <div styleName="content">
          {this.watext()}
        </div>
      </div>
      <div styleName="column auxiliary">
        <h2 styleName="heading">Verbs</h2>
        <div styleName="content verbs">
          <VerbBar verbs={this.props.verbs} onVerbClick={this.props.onVerbClick} />
        </div>
      </div>
    </div>
  }
}
