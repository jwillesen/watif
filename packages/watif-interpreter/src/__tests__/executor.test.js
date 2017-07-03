import Executor from '../executor'

function createItem (verbFnSuffix) {
  return {
    [`verb${verbFnSuffix}`]: jest.fn(() => `return value of verb${verbFnSuffix}`),
  }
}

function createUniverse (opts = {}) {
  const subjectItem = opts.subject || createItem('Foo')
  const targetItem = opts.target || createItem('Bar')
  const universe = {
    getItem: jest.fn((id) => universe[id]),
    subject: subjectItem,
    target: targetItem,
    ...opts.items,
  }
  return universe
}

it('throws if there is no subject', () => {
  const executor = new Executor(createUniverse())
  expect(() => executor.executeVerb({id: 'foo'})).toThrow()
})

it('throws if the subject does not exist', () => {
  const executor = new Executor(createUniverse())
  expect(() => executor.executeVerb({id: 'foo', subject: 'does-not-exist'})).toThrow()
})

it('throws if the verb does not exist', () => {
  const executor = new Executor(createUniverse())
  expect(() => executor.executeVerb({id: 'does-not-exist', subject: 'subject'})).toThrow()
})

it('throws if the target does not exist', () => {
  const executor = new Executor(createUniverse())
  expect(() => executor.executeVerb({id: 'foo', subject: 'subject', target: 'does-not-exist'})).toThrow()
})

it('executes a verb on the subject item', () => {
  const mockUniverse = createUniverse()
  const executor = new Executor(mockUniverse)
  executor.executeVerb({id: 'foo', subject: 'subject'})
  expect(mockUniverse.subject.verbFoo).toHaveBeenCalled()
})

it('passes the target id to the verb function handler', () => {
  const mockUniverse = createUniverse()
  const executor = new Executor(mockUniverse)
  executor.executeVerb({id: 'foo', subject: 'subject', target: 'target'})
  expect(mockUniverse.subject.verbFoo).toHaveBeenCalledWith('target')
})

it('does change-case on multi-word verbs', () => {
  const mockUniverse = createUniverse({subject: createItem('PutDown')})
  const executor = new Executor(mockUniverse)
  executor.executeVerb({id: 'put-down', subject: 'subject'})
  expect(mockUniverse.subject.verbPutDown).toHaveBeenCalled()
})

it('calls complex verb definitions', () => {
  const mockItem = {
    verbOpen: {
      enabled: jest.fn(() => true),
      action: jest.fn(),
    },
  }
  const mockUniverse = createUniverse({items: {trunk: mockItem}})
  const executor = new Executor(mockUniverse)
  executor.executeVerb({id: 'open', subject: 'trunk', target: 'target'})
  expect(mockItem.verbOpen.enabled).toHaveBeenCalledWith('target')
  expect(mockItem.verbOpen.action).toHaveBeenCalledWith('target')
})

it('does not call the action if the verb is disabled', () => {
  const mockItem = {
    verbOpen: {
      enabled: jest.fn(() => false),
      action: jest.fn(),
    },
  }
  const mockUniverse = createUniverse({items: {trunk: mockItem}})
  const executor = new Executor(mockUniverse)
  executor.executeVerb({id: 'open', subject: 'trunk', target: 'target'})
  expect(mockItem.verbOpen.enabled).toHaveBeenCalledWith('target')
  expect(mockItem.verbOpen.action).not.toHaveBeenCalled()
})

it('requires an action method for complex verbs', () => {
  const mockItem = {
    verbOpen: {
      enabled: () => true,
    },
  }
  const mockUniverse = createUniverse({items: {trunk: mockItem}})
  const executor = new Executor(mockUniverse)
  expect(() => executor.executeVerb({id: 'open', subject: 'trunk'})).toThrow()
})

it('returns the return value of the verb method', () => {
  const executor = new Executor(createUniverse())
  expect(executor.executeVerb({id: 'foo', subject: 'subject'})).toBe('return value of verbFoo')
})

it('returns the return value of the complex verb method', () => {
  const mockItem = {
    verbOpen: {
      action: jest.fn(() => 'return value'),
    },
  }
  const mockUniverse = createUniverse({items: {trunk: mockItem}})
  const executor = new Executor(mockUniverse)
  const result = executor.executeVerb({id: 'open', subject: 'trunk', target: 'target'})
  expect(result).toBe('return value')
})

it('returns undefined if the verb is not enabled', () => {
  const mockItem = {
    verbOpen: {
      enabled: jest.fn(() => false),
      action: jest.fn(),
    },
  }
  const mockUniverse = createUniverse({items: {trunk: mockItem}})
  const executor = new Executor(mockUniverse)
  const result = executor.executeVerb({id: 'open', subject: 'trunk', target: 'target'})
  expect(result).toBeUndefined()
})
