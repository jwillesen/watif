import React from 'react'
import TitleBar from '../title-bar'
import ContentArea from '../content-area'
import './style.css'

export default class Display extends React.Component {
  render () {
    return <div styleName='root'>
      <TitleBar />
      <ContentArea />
    </div>
  }
}
