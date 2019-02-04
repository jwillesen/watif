import React from 'react'
import {shape, func} from 'prop-types'

import {Display} from '@watif/display'
import './app.css'

export default class App extends React.Component {
  static propTypes = {
    adapter: shape({
      loadStory: func,
      executeVerb: func,
    }),
  }

  constructor(...args) {
    super(...args)
    this.state = {
      loading: true,
      storyState: null,
    }
    this.fetchStory()
  }

  fetchStory() {
    fetch('story.js')
      .catch(err => this.fetchError(err))
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        return this.fetchResponseError(response)
      })
      .then(storyCode => {
        return this.props.adapter.loadStory(storyCode, storyState => {
          this.setState({loading: false, storyState})
        })
      })
      .catch(err => this.fetchError(err))
  }

  fetchResponseError(response) {
    console.error(response) // eslint-disable-line no-console
    throw new Error(`Error: ${response.status} (${response.statusText})`)
  }

  fetchError(err) {
    console.error('failed to load story.js', err) // eslint-disable-line no-console
    this.setState({loading: false, error: err.message})
  }

  executeVerb = verbInvocation => {
    this.props.adapter.executeVerb(verbInvocation, this.newStoryState)
  }

  newStoryState = storyState => {
    if (storyState.error) this.setState({error: storyState.error})
    this.setState({storyState})
  }

  render() {
    if (this.state.loading) return <p>loading...</p>
    if (this.state.error) return <p>error: {this.state.error}</p>
    return (
      <div styleName="root">
        <div styleName="story">
          <Display
            title="Watif Tutorial"
            storyState={this.state.storyState}
            executeVerb={this.executeVerb}
          />
        </div>
      </div>
    )
  }
}
