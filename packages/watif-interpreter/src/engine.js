import globalReact from 'react'
import globalChangeCase from 'change-case'

class EvalSandbox {
  evalStory (storyCode) {
    // These need to be in scope for the story eval because we don't embed these libraries into
    // every story. How eval can read these and fail to create a var is beyond me.
    const React = globalReact // eslint-disable-line no-unused-vars
    const changeCase = globalChangeCase // eslint-disable-line no-unused-vars
    // When webpacking a library for consumtion in a browser, the best option is a variable export
    // since the browser doesn't natively have another packaging mechanism. In this case, the story
    // export is stored in a newly created variable called `story`. However, evaling this variable
    // creation doesn't seem to be working here, but the `this` and other local vars is correct so
    // we hack around not being able to see the story var by replacing the variable creation
    // with an assignment to this.
    const modifiedStoryCode = storyCode.replace(/^var story/, 'this.story')

    // In production this runs in a sandboxed (jailled) environment, so it's ok to call eval to
    // dynamically load the story code.
    eval(modifiedStoryCode) // eslint-disable-line no-eval
  }
}

export default class Engine {
  constructor (universe) {
    this.universe = universe
  }

  loadStory (storyCode) {
    if (typeof storyCode === 'object') {
      this.universe.bigBang(storyCode)
    } else {
      const sandbox = new EvalSandbox()
      sandbox.evalStory(storyCode)
      this.universe.bigBang(sandbox.story)
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
      currentItemVerbs: currentItem && this.constructVerbList(currentItem),

      currentRoomDescription: currentRoom && currentRoom.description(),
      currentRoomVerbs: currentRoom && this.constructVerbList(currentRoom),

      playerInventory: this.constructInventory(universeState),
      universe: this.universe.getUniverseState(),
    }
  }

  getAllPropertyNames (item) {
    let props = []
    let current = item
    while (current !== Object.prototype && current != null) {
      props = props.concat(Object.getOwnPropertyNames(current))
      current = Object.getPrototypeOf(current)
    }
    return props
  }

  constructVerbList (item) {
    const propertyNames = this.getAllPropertyNames(item)
    const verbPropNames = propertyNames.filter(propName => propName.startsWith('verb'))
    return verbPropNames.reduce((verbList, verbPropName) => {
      const itemVerb = item[verbPropName]
      const verbId = globalChangeCase.param(verbPropName.replace(/^verb/, ''))
      const verb = this.verbFromProperty(verbId, itemVerb, item)
      if (verb) verbList.push(verb)
      return verbList
    }, [])
  }

  verbFromProperty (verbId, itemVerb, item) {
    if (typeof itemVerb === 'function') return this.verbFromFunction(verbId, itemVerb, item)
    else if (typeof itemVerb === 'object') return this.verbFromObject(verbId, itemVerb, item)
    else throw new Error(`verb ${verbId} on item ${item.id()} has incorrect type ${typeof itemVerb}`)
  }

  verbFromFunction (verbId, itemVerb, item) {
    return {
      id: verbId,
      name: globalChangeCase.noCase(verbId),
      compound: false,
      connector: null,
    }
  }

  verbFromObject (verbId, itemVerb, item) {
    let enabled = true
    if (itemVerb.enabled) enabled = itemVerb.enabled.call(item)
    if (!enabled) return
    return {
      id: verbId,
      name: itemVerb.name || globalChangeCase.noCase(verbId),
      compound: itemVerb.compound || false,
      connector: itemVerb.connector || null,
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
    const handlerName = 'verb' + globalChangeCase.pascal(id)
    const handler = subjectItem[handlerName]
    if (!handler) throw new Error(`subject "${subject}" does not have handler "${handlerName}" to handle verb "${id}"`)

    if (typeof handler === 'function') {
      return handler.call(subjectItem, target)
    } else {
      let enabled = true
      if (handler.enabled) enabled = handler.enabled.call(subjectItem)
      if (enabled) {
        if (!handler.action) throw new Error(`complex verb "${id}" on subject "${subject}" does not have an "action" method`)
        return handler.action.call(subjectItem, target)
      } else {
        throw new Error(`called disabled verb "${id}" on subject "${subject}"`)
      }
    }
  }
}
