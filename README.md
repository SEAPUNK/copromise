`mini-copromise`
---

A tinier Promise-based coroutine. Based off of [`copromise`](https://github.com/deanlandolt/copromise)

* 629 bytes uncompressed
* 500 bytes minified with uglify-js 2.6.2
* 283 bytes minified with uglify-js 2.6.2, and compressed with gzip 1.8

`npm install mini-copromise`

```js
import copromise from 'mini-copromise'

copromise.Promise = bluebird // Override which Promise copromise uses

function * generatorFunction (input) {
  yield doSomeThings()
  try {
      yield doSomeOtherThings()
  } catch (err) {
      yield someFailureHandler()
  }
  return 'nice' + input
}

copromise(generatorFunction, 2).then((value) => {
  console.log('Copromise success', value)
}).catch((err) => {
  console.log('An error occured', err)
})

```
