`mini-copromise`
---

A tinier Promise-based coroutine. Based off of [`copromise`](https://github.com/deanlandolt/copromise)

* 631 bytes uncompressed
* 489 bytes minified with uglify-js 2.6.2
* 266 bytes minified with uglify-js 2.6.2, and compressed with gzip 1.8

`npm install mini-copromise`

```js
import copromise from 'mini-copromise'

copromise.Promise = bluebird // Override which Promise copromise uses

const doThings = copromise(function * doThings (input) {
  yield washDishes()
  try {
      yield makePopcorn()
  } catch (err) {
      yield someFailureHandler(err)
  }
  return 'nice' + input
})

doThings(2).then((value) => {
  console.log('Copromise success:', value) // Copromise success: nice2
}).catch((err) => {
  console.log('An error occured', err)
})

```
