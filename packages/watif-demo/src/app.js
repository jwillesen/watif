import React from 'react'
import {Display} from 'watif-browser-display'
import {object} from 'prop-types'

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
      response.text().catch((err) => this.fetchError(err)).then((storyCode) => {
        this.props.adapter.loadStory(storyCode, (storyState) => {
          console.log(storyState)
          this.setState({loading: false, storyState})
        })
      })
    })
  }

  fetchError (err) {
    console.error('failed to load story.js', err) // eslint-disable-line no-console
    this.setState({loading: false, error: err})
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
    return <Display storyState={this.state.storyState} executeVerb={this.executeVerb} />
  }
}
