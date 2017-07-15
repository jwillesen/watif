import React from 'react'
import changeCase from 'change-case'

export default class Item {
  constructor (universe) {
    this._universe = universe
  }

  // These methods should be overridden.

  // This is how the item will be described when the player selects it. It should return watext.
  description () {
    return <text>Item `{this.id()}` has no description.</text>
  }

  // These methods can be overridden but don't need to be.

  // This is the internal id for the item that you will use to refernce it in other places.
  // By default it transforms the class name into a dashed string.
  // For example, the item class AngelFish will be identified as 'angel-fish' in code.
  // The Item's id should be unique to each item instance.
  id () {
    return changeCase.param(this.constructor.name)
  }

  // This is the user visible name of the object. This is how the object will be identified in
  // generic contexts such as the user's inventory. By default it transforms the class name into a
  // space separated string.
  // For example, the item class AngelFish will named 'angel fish'
  name () {
    return changeCase.no(this.constructor.name)
  }

  // "Examine" is the verb the display sends when an item is clicked. By default this sets the
  // current item so its description will be displayed. You can override this to do soething else
  // if you want just examining an item to do something special.
  verbExamine () {
    this._universe.setCurrentItem(this.id())
  }

  // utility methods

  // Find the Item instance with the specified id.
  getItem (itemId) {
    return this._universe.getItem(itemId)
  }

  // Get the state of this Item. An item state is represented by an Object.
  getState () {
    return this.getStateOf(this.id())
  }

  // Set part of this Item's state. The new state will be merged with the existing state.
  setState (newState) {
    return this.setStateOf(this.id(), newState)
  }

  // Get the state of another item.
  getStateOf (itemId) {
    return this._universe.getStateOf(itemId)
  }

  // Set the state of another item.
  setStateOf (itemId, newState) {
    return this._universe.setStateOf(itemId, newState)
  }

  // Get the location of this item. This is the same as referencing the location key of the this
  // Item's state.
  getLocation () {
    return this.getLocationOf(this.id())
  }

  // Set the location of this item to the specified itemId.
  setLocation (containerId) {
    return this.setLocationOf(this.id(), containerId)
  }

  // Get the location of another item.
  getLocationOf (itemId) {
    return this.getStateOf(itemId).location
  }

  // Set the location of another item.
  setLocationOf (itemId, containerId) {
    return this.setStateOf(itemId, {location: containerId})
  }

  // Returns true if this item contains the specified item.
  contains (itemId) {
    return this.getStateOf(itemId).location === this.id()
  }
}
