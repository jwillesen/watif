import React from 'react'
import { string, element, func, arrayOf } from 'prop-types'
import Watext from '../watext'
import VerbBar from '../verb-bar'
import { verbShape } from '../../property-shapes'
import './style.css'

export default class InteractiveDescription extends React.Component {
  static propTypes = {
    emptyText: string,
    watext: element,
    verbs: arrayOf(verbShape),
    onItemClick: func,
  }

  static defaultProps = {
    emptyText: 'No text',
  }

  render () {
    return <div styleName="root">
      <div styleName="watext">
        <Watext {...this.props} />
      </div>
      <div styleName="verb-bar">
        <VerbBar verbs={this.props.verbs}/>
      </div>
    </div>
  }
}
