import changeCase from 'change-case'

export default class Executor {
  constructor (universe) {
    this.universe = universe
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
      handler(targetItem)
    } else {
      let enabled = true
      if (handler.enabled) enabled = handler.enabled(targetItem)
      if (enabled) {
        if (!handler.action) throw new Error(`complex verb "${id}" on subject "${subject}" does not have an "action" method`)
        handler.action(targetItem)
      }
    }
  }
}
