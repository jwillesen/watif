import React from 'react'
import TitleBar from './title-bar'
import {Display} from 'watif-browser-display'
import {object} from 'prop-types'
import './app.css'

export default class App extends React.Component {
  static propTypes = {
    adapter: object,
  }

  constructor (...args) {
    super(...args)
    this.state = {
      loading: true,
      storyState: null,
    }
    this.fetchStory()
  }

  fetchStory () {
    fetch('story.js').catch((err) => this.fetchError(err)).then((response) => {
      if (response.ok) {
        return response.text()
      } else {
        this.fetchResponseError(response)
      }
    }).then((storyCode) => {
      this.props.adapter.loadStory(storyCode, (storyState) => {
        console.log(storyState)
        this.setState({loading: false, storyState})
      })
    }).catch((err) => this.fetchError(err))
  }

  fetchResponseError (response) {
    console.error(response) // eslint-disable-line no-console
    throw new Error(`Error: ${response.status} (${response.statusText})`)
  }

  fetchError (err) {
    console.error('failed to load story.js', err) // eslint-disable-line no-console
    this.setState({loading: false, error: err.message})
  }

  executeVerb = (verbInvokation) => {
    console.log('executeVerb', verbInvokation)
    this.props.adapter.executeVerb(verbInvokation, this.newStoryState)
  }

  newStoryState = (storyState) => {
    if (storyState.error) this.setState({error: storyState.error})
    this.setState({storyState})
  }

  render () {
    if (this.state.loading) return <p>loading...</p>
    if (this.state.error) return <p>error: {this.state.error}</p>
    return <div styleName="root">
      <TitleBar />
      <div styleName="story">
        <Display storyState={this.state.storyState} executeVerb={this.executeVerb} />
      </div>
    </div>
  }
}
