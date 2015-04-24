//
// core coroutine runner
//
function spawn(coroutine) {
	return new Copromise.Promise(function (resolve, reject) {
		(function next(value, exception) {
			var result
			try {
				result = exception ? coroutine.throw(value) : coroutine.next(value)
			}
			catch (error) {
				return reject(error)
			}
			if (result.done)
				return resolve(result.value)

			Promise.resolve(result.value).then(next, function(error) {
				next(error, true)
			})
		})()
	})
}

//
// create an async function from provided coroutine (generator factory)
//
function Copromise(coroutine) {
	return function () {
		return spawn(coroutine.apply(this, arguments))
	}
}

//
// allow overriding of promise implementation for subclassing
//
Copromise.Promise = Promise

//
// rethrow error in next event turn
//
function raise(error) {
	if (!error)
		return

	setImmediate(function() {
		throw error
	})
}

//
// run coroutine and raise exception on failure
//
Copromise.run = function run(coroutine) {
	return spawn(coroutine()).catch(raise)
}

module.exports = Copromise
