import React from 'react'
import {string, number, func, element, oneOfType, arrayOf} from 'prop-types'
import changeCase from 'change-case'
import Alert from './alert'
import './watext.css'

export default class Watext extends React.Component {
  static propTypes = {
    watext: oneOfType([string, number, element, arrayOf[element]]),
    onItemClick: func, // (itemId)
  }

  static defaultProps = {
    emptyText: 'No Text',
  }

  watextToReact (watexts) {
    if (!Array.isArray(watexts)) watexts = [watexts]
    return watexts.map((watextElt, watextIndex) => {
      const traversal = this.traverseElement(watextElt)
      const paragraphs = this.constructParagraphs(traversal)
      return paragraphs.map((pg, index) => <div key={`${watextIndex},${index}`} styleName="paragraph">{pg}</div>)
    })
  }

  traverseElement (elt, traversal = []) {
    traversal.push(elt) // element / primitive entry
    if (React.isValidElement(elt)) {
      React.Children.forEach(elt.props.children, (child) => {
        this.traverseElement(child, traversal)
      })
      traversal.push(elt) // element exit
    }
    return traversal
  }

  constructParagraphs (traversal) {
    const paragraphs = []
    const paragraphUnderConstruction = []
    const iter = this.makeIterator(traversal)
    let {value: elt, done} = iter.next()
    while (!done) {
      if (elt == null) {
        // do nothing
      } else if (typeof elt === 'string' || typeof elt === 'number') {
        paragraphUnderConstruction.push(elt)
      } else if (React.isValidElement(elt)) {
        this.handleWatextElement(elt, iter, paragraphs, paragraphUnderConstruction)
      } else {
        this.rotate(paragraphs, paragraphUnderConstruction)
        paragraphs.push(<Alert variant="error">unrecognized type of react element: {elt}</Alert>)
      }
      ({value: elt, done} = iter.next())
    }
    this.rotate(paragraphs, paragraphUnderConstruction)
    return paragraphs
  }

  handleWatextElement (elt, iter, paragraphs, paragraphUnderConstruction) {
    const constructionMethodName = changeCase.camel(`construct-${elt.type}`)
    if (this[constructionMethodName]) {
      this[constructionMethodName](elt, iter, paragraphs, paragraphUnderConstruction)
    } else {
      this.rotate(paragraphs, paragraphUnderConstruction)
      paragraphs.push(<Alert variant="error">unrecognized watext element: {elt.type}</Alert>)
      // need to call next because otherwise it will think we're already at the closing tag
      const {value: currentElt, done} = iter.next()
      this.iterateToClosingTag(elt, iter, currentElt, done)
    }
  }

  constructText (elt, iter, paragraphs, paragraphUnderConstruction) {
    // do nothing: text elements are just handy containers and have no effect on paragraph layout.
    // Just let next iterations handle its children normally.
  }

  constructPg (elt, iter, paragraphs, paragraphUnderConstruction) {
    // both enter and exit tags start new paragraphs
    this.rotate(paragraphs, paragraphUnderConstruction)
  }

  constructItem (elt, iter, paragraphs, paragraphUnderConstruction) {
    let done = false
    let currentElt = null
    while (!done && !React.isValidElement(currentElt)) {
      ({value: currentElt, done} = iter.next())
    }

    if (elt.props.id == null) {
      this.rotate(paragraphs, paragraphUnderConstruction)
      paragraphs.push(<Alert variant="error">Item elements require an id property</Alert>)
      // iterate to matching end tag so the rest of the text can render properly
      this.iterateToClosingTag(elt, iter, currentElt, done)
    } else if (currentElt !== elt) {
      this.rotate(paragraphs, paragraphUnderConstruction)
      paragraphs.push(<Alert variant="error">Item elements may not contain other elements.</Alert>)
      // iterate to matching end tag so the rest of the text can render properly
      this.iterateToClosingTag(elt, iter, currentElt, done)
    } else {
      paragraphUnderConstruction.push(
        <button
          key={elt.props.id}
          styleName="item-button"
          onClick={(event) => this.handleItemClick(event, elt.props.id)} >
          {elt.props.children}
        </button>
      )
    }
  }

  iterateToClosingTag (elt, iter, currentElt, done) {
    while (!done && currentElt !== elt) { ({value: currentElt, done} = iter.next()) }
  }

  rotate (paragraphs, paragraphUnderConstruction) {
    if (paragraphUnderConstruction.length) {
      paragraphs.push(paragraphUnderConstruction.slice(0)) // push a clone
      paragraphUnderConstruction.length = 0 // truncate original
    }
  }

  // make our own iterator because IE and Safari don't support JS iterators
  makeIterator (array) {
    let nextIndex = 0
    return {
      next () {
        return nextIndex < array.length
          ? { value: array[nextIndex++], done: false }
          : { done: true }
      },
    }
  }

  handleItemClick (event, itemId) {
    if (this.props.onItemClick) {
      this.props.onItemClick(itemId)
    }
  }

  render () {
    return <div styleName="content">{this.watextToReact(this.props.watext)}</div>
  }
}
