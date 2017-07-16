import React from 'react'
import TitleBar from '../title-bar'
import ContentArea from '../content-area'

export default class Display extends React.Component {
  render () {
    return <div className='watif-display'>
      <TitleBar />
      <ContentArea />
    </div>
  }
}
