'use strict'

import test from 'ava'

import delay from 'delay'
import bluebird from 'bluebird'

import copromise from './'

const coroutine = function * (a, b) {
  let isCaught = false

  const retV = yield 'a'
  if (retV !== 'a') {
    throw new Error('retV is not a!')
  }

  const retP = yield Promise.resolve(100)
  if (retP !== 100) {
    throw new Error('retP is not 100!')
  }

  if (b === 'stop') {
    yield delay(100)
    return yield Promise.resolve('ok')
  }

  try {
    if (a === 'fail') {
      yield Promise.reject(new Error('a is fail'))
    } else {
      yield Promise.resolve()
    }
  } catch (err) {
    if (String(err) !== 'Error: a is fail') throw err
    isCaught = true
  }

  return [a, b, isCaught]
}

test('normal, non-caught', async (t) => {
  t.plan(1)
  const retval = await copromise(coroutine, 1, 2)
  t.deepEqual(retval, [1, 2, false])
})

test('normal, caught', async (t) => {
  t.plan(1)
  const retval = await copromise(coroutine, 'fail', 2)
  t.deepEqual(retval, ['fail', 2, true])
})

test('stopped early, with 100ms delay', async (t) => {
  t.plan(2)
  const startTime = Date.now()
  const retval = await copromise(coroutine, 1, 'stop')
  t.is(retval, 'ok')
  t.is(true, (
    Date.now() - startTime > 100
  ))
})

test('use bluebird as promise', async (t) => {
  t.plan(2)
  copromise.Promise = bluebird
  t.is(copromise.Promise, bluebird)
  const retval = await copromise(coroutine, 1, 2)
  t.deepEqual(retval, [1, 2, false])
})
