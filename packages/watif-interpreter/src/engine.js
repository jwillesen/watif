import changeCase from 'change-case'

export default class Engine {
  constructor (universe) {
    this.universe = universe
  }

  loadStory (storyCode) {
    if (typeof storyCode === 'object') {
      this.universe.bigBang(storyCode)
    } else {
      // The variable `story` will be created and assigned when evaluating the story code. This is
      // the standard interface for a story library to export its evaluated code. It's the best
      // option for webpacked story libraries because we can't use another packaging system,
      // like CommonJS, in the browser.
      // In production this runs in a sandboxed (jailled) environment, so it's ok to call eval to
      // dynamically load the story code.
      eval(storyCode) // eslint-disable-line no-eval
      this.universe.bigBang(story) // eslint-disable-line no-undef
    }
  }

  replaceState (newState) {
    this.universe.setUniverseState(newState)
  }

  getDisplayData () {
    const universeState = this.universe.getUniverseState()

    const currentItemId = universeState.currentItemId || null
    const currentItem = currentItemId && this.universe.getItem(universeState.currentItemId)

    const currentRoomId = this.universe.getStateOf('player').location || null
    const currentRoom = currentRoomId && this.universe.getItem(currentRoomId)

    return {
      currentItemDescription: currentItem && currentItem.description(),
      currentRoomDescription: currentRoom && currentRoom.description(),
      playerInventory: this.constructInventory(universeState),
      universe: this.universe.getUniverseState(),
    }
  }

  constructInventory () {
    const playerStuff = this.findItemsAt('player')
    Object.keys(playerStuff).forEach(playerStuffId => {
      playerStuff[playerStuffId].contents = this.findItemsAt(playerStuffId)
    })
    return playerStuff
  }

  findItemsAt (targetLocation) {
    const universeState = this.universe.getUniverseState()
    const itemStates = universeState.itemStates
    return Object.keys(itemStates).reduce((results, itemId) => {
      const itemState = itemStates[itemId]
      const item = this.universe.getItem(itemId)
      const itemLocation = itemState.location
      if (itemLocation === targetLocation) {
        results[itemId] = {name: item.name()}
      }
      return results
    }, {})
  }

  executeVerb (verbInvokation) {
    const {id, subject, target} = verbInvokation
    const subjectItem = this.universe.getItem(subject)
    if (!subjectItem) throw new Error(`verb "${id}" invoked with invalid subject "${subject}"`)
    let targetItem = null
    if (target) {
      targetItem = this.universe.getItem(target)
      if (!targetItem) throw new Error(`verb "${id}" invoked with invalid target "${target}"`)
    }
    const handlerName = 'verb' + changeCase.pascal(id)
    const handler = subjectItem[handlerName]
    if (!handler) throw new Error(`subject "${subject}" does not have handler "${handlerName}" to handle verb "${id}"`)

    if (typeof handler === 'function') {
      return handler.call(subjectItem, target)
    } else {
      let enabled = true
      if (handler.enabled) enabled = handler.enabled.call(subjectItem, target)
      if (enabled) {
        if (!handler.action) throw new Error(`complex verb "${id}" on subject "${subject}" does not have an "action" method`)
        return handler.action.call(subjectItem, target)
      } else {
        throw new Error(`called disabled verb "${id}" on subject "${subject}"`)
      }
    }
  }
}
