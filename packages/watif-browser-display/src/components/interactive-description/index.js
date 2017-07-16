import React from 'react'
import Watext from '../watext'
import VerbBar from '../verb-bar'

export default class InteractiveDescription extends React.Component {
  render () {
    return <div className="watif-interactive-description">
      <Watext />
      <VerbBar />
    </div>
  }
}
