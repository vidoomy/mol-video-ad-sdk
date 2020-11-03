var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = module.exports;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

/**
 * Interface for classes that may emit linear VAST events.
 *
 * @interface LinearEvents
 */

/**
 * Fires when the the creative was played to the end at normal speed so that 100% of the creative was played.
 *
 * @event LinearEvents#complete
 */
var complete = 'complete';

/**
 * Fires when a user clicks the ad.
 *
 * @event LinearEvents#clickThrough
 */
var clickThrough = 'clickThrough';

/**
 * Fires when there was an error with the linear creative.
 *
 * @event LinearEvents#error
 */
var error = 'error';

/**
 * Fires when the creative played continuously for at least 25% of the total duration at normal speed.
 *
 * @event LinearEvents#firstQuartile
 */
var firstQuartile = 'firstQuartile';

/**
 * Fires when there was an impression of the linear creative.
 *
 * @event LinearEvents#impression
 */
var impression = 'impression';

/**
 * Fires when the creative played continuously for at least 50% of the total duration at normal speed.
 *
 * @event LinearEvents#midpoint
 */
var midpoint = 'midpoint';

/**
 * Fires when the user activated the mute control and muted the creative.
 *
 * @event LinearEvents#mute
 */
var mute = 'mute';

/**
 * Optional metric that can capture all other user interactions under one metric such a s hover-overs, or custom clicks. It should NOT replace clickthrough events or other existing events like mute, unmute, pause, etc.
 *
 * @event LinearEvents#otherAdInteraction
 */
var otherAdInteraction = 'otherAdInteraction';

/**
 * Fires when the user clicked the pause control and stopped the creative.
 *
 * @event LinearEvents#pause
 */
var pause = 'pause';

/**
 * Fires when the user activated a control to reduce player to a smaller size. This event replaces the exitFullscreen event per the 2014 Digital Video In-Stream Ad Metric Definitions.
 *
 * @event LinearEvents#playerCollapse
 */
var playerCollapse = 'playerCollapse';

/**
 * Fires when the user activated a control to reduce player to a smaller size.
 *
 * @event LinearEvents#exitFullscreen
 */
var exitFullscreen = 'exitFullscreen';

/**
 * Fires when the user activated a control to extend the player to a larger size. This event replaces the fullscreen event per the 2014 Digital Video In-Stream Ad Metric Definitions.
 *
 * @event LinearEvents#playerExpand
 */
var playerExpand = 'playerExpand';

/**
 * Fires when the user activated a control to extend the player to a larger size. Only for VAST 3.
 *
 * @event LinearEvents#fullscreen
 */
var fullscreen = 'fullscreen';

/**
 * Fires when the creative played for a duration at normal speed that is equal to or greater than the value provided in an additional offset attribute for the <Tracking> element under Linear ads. Values can be time in the format HH:MM:SS or HH:MM:SS.mmm or a percentage value in the format n%.
 *
 * @event LinearEvents#progress
 */
var progress = 'progress';

/**
 * Fires when the user activated the resume control after the creative had been stopped or paused.
 *
 * @event LinearEvents#resume
 */
var resume = 'resume';

/**
 * Fires when the user activated the rewind control to access a previous point in the creative timeline.
 *
 * @event LinearEvents#rewind
 */
var rewind = 'rewind';

/**
 * Fires when the user activated a skip control to skip the creative.
 *
 * @event LinearEvents#skip
 */
var skip = 'skip';

/**
 * This event is used to indicate that an individual creative within the ad was loaded and playback began. As with creativeView, this event is another way of tracking creative playback.
 *
 * @event LinearEvents#start
 */
var start = 'start';

/**
 * Fires when the creative played continuously for at least 75% of the duration at normal speed.
 *
 * @event LinearEvents#thirdQuartile
 */
var thirdQuartile = 'thirdQuartile';

/**
 * Amount of video viewed at normal speed in seconds or other appropriate time-based units. If a rewind event occurs during play, time spent viewing may be calculated on total amount of video viewed at normal speed, which may include additional amounts of video viewed after rewinding. The offset attribute for the <Tracking> element under Linear ads may be used to track when time spent viewing meets the threshold. Otherwise, a macro may be provided so that the player may return a time value. VAST does not provide a standard macro for this value, so the involved parties must establish these parameters if this metric is to be used.
 *
 * @event LinearEvents#timeSpentViewing
 */
var timeSpentViewing = 'timeSpentViewing';

/**
 * Fires when the user activated the mute control and unmuted the creative.
 *
 * @event LinearEvents#unmute
 */
var unmute = 'unmute';

/**
 * Fires when the user clicked the creative icon.
 *
 * @event LinearEvents#iconClick
 */
var iconClick = 'iconClick';

/**
 * Fires when the user viewed the creative icon.
 *
 * @event LinearEvents#iconView
 */
var iconView = 'iconView';

/**
 * The viewer has chosen to close the linear ad unit. This is currently inuse by some of the largest mobile SDKs to mark the dismissal of the end card companion that follows the video, as well as a close of the video itself, if applicable
 *
 * @event LinearEvents#closeLinear
 */
var closeLinear = 'closeLinear';

var linearEvents = {
  clickThrough: clickThrough,
  closeLinear: closeLinear,
  complete: complete,
  error: error,
  exitFullscreen: exitFullscreen,
  firstQuartile: firstQuartile,
  fullscreen: fullscreen,
  iconClick: iconClick,
  iconView: iconView,
  impression: impression,
  midpoint: midpoint,
  mute: mute,
  otherAdInteraction: otherAdInteraction,
  pause: pause,
  playerCollapse: playerCollapse,
  playerExpand: playerExpand,
  progress: progress,
  resume: resume,
  rewind: rewind,
  skip: skip,
  start: start,
  thirdQuartile: thirdQuartile,
  timeSpentViewing: timeSpentViewing,
  unmute: unmute
};

/**
 * Interface for classes that may emit non linear VAST events.
 *
 * @interface NonLinearEvents
 */

/**
 * Fires when the user clicked or otherwise activated a control used to pause streaming content, which either expands the ad within the player’s viewable area or “takes-over” the streaming content area by launching an additional portion of the ad.
 *
 * @event NonLinearEvents#acceptInvitation
 */
var acceptInvitation = 'acceptInvitation';

/**
 * Fires when the user clicked or otherwise activated a control used to pause streaming content, which either expands the ad within the player’s viewable area or “takes-over” the streaming content area by launching an additional portion of the ad.
 *
 * @event NonLinearEvents#adCollapse
 */
var adCollapse = 'adCollapse';

/**
 * Not to be confused with an impression, this event indicates that an individual creative portion of the ad was viewed.
 *
 * @event NonLinearEvents#creativeView
 */
var creativeView = 'creativeView';

/**
 * Fires when the user clicked or otherwise activated a control for removing the ad.
 *
 * @event NonLinearEvents#close
 */
var close = 'close';

var nonLinearEvents = {
  acceptInvitation: acceptInvitation,
  adCollapse: adCollapse,
  close: close,
  creativeView: creativeView
};

var innerXML = function (node) {
    var s = new XMLSerializer();
    return Array.prototype.map.call(node.childNodes, function (node) {
        return s.serializeToString(node);
    }).join('');
};

var getParseError = function (doc) {
    // Firefox
    if (doc.documentElement.tagName === 'parsererror' &&
        doc.documentElement.namespaceURI === 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
        return doc.documentElement;
    }

    // Chrome, Safari
    if ((doc.documentElement.tagName === 'xml' || doc.documentElement.tagName === 'html') &&
        doc.documentElement.childNodes &&
        doc.documentElement.childNodes.length > 0 &&
        doc.documentElement.childNodes[0].nodeName === 'parsererror') {
        return doc.documentElement.childNodes[0];
    }

    // PhantomJS
    if (doc.documentElement.tagName === 'html' &&
        doc.documentElement.childNodes &&
        doc.documentElement.childNodes.length > 0 &&
        doc.documentElement.childNodes[0].nodeName === 'body' &&
        doc.documentElement.childNodes[0].childNodes &&
        doc.documentElement.childNodes[0].childNodes.length &&
        doc.documentElement.childNodes[0].childNodes[0].nodeName === 'parsererror') {
        return doc.documentElement.childNodes[0].childNodes[0];
    }

    return undefined;
};

var errorMessagePatterns = [
    // Chrome, Safari, PhantomJS
    new RegExp('^<h3[^>]*>This page contains the following errors:<\/h3><div[^>]*>(.+?)\n?<\/div>'),
    // Firefox
    new RegExp('^(.+)\n')
];

var extractParseError = function (errorNode) {
    var content = innerXML(errorNode);
    var i, match;

    for(i = 0; i < errorMessagePatterns.length; i++) {
        match = errorMessagePatterns[i].exec(content);

        if (match) {
            return match[1];
        }
    }
    return undefined;
};

var failOnParseError = function (doc) {
    var errorMessage;

    if (doc === null) {
        throw new Error('Parse error');
    }

    var parseError = getParseError(doc);
    if (parseError !== undefined) {
        errorMessage = extractParseError(parseError) || 'Parse error';
        throw new Error(errorMessage);
    }
};

var failOnParseError_1 = function (doc) {
    failOnParseError(doc);

    return doc;
};

var saneDomparserError = {
	failOnParseError: failOnParseError_1
};

var TYPE = {
  CDATA: 'cdata',
  DOCUMENT: 'document',
  ELEMENT: 'element',
  TEXT: 'text'
};

var nodeType = function nodeType(node) {
  if (node.nodeType === 1) {
    return TYPE.ELEMENT;
  }

  if (node.nodeType === 3 || node.nodeType === 4) {
    return TYPE.TEXT;
  }

  if (node.nodeType === 9) {
    return TYPE.DOCUMENT;
  }

  throw new Error('Unsupported element type');
};

var xmlToJson = function xmlToJson(node) {
  var type = nodeType(node);

  var obj = {
    type: type
  };

  if (type === TYPE.ELEMENT) {
    obj.name = node.nodeName.toLowerCase();

    if (node.attributes.length > 0) {
      obj.attributes = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(node.attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var attribute = _step.value;

          obj.attributes[attribute.nodeName] = attribute.nodeValue;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  } else if (type === TYPE.TEXT) {
    obj.text = node.nodeValue.replace('<![CDATA[', '').replace(']]>', '').trim();
  }

  // do children
  if (node.hasChildNodes()) {
    var childNodes = Array.from(node.childNodes).filter(function (childNode) {
      return [1, 3, 4].includes(childNode.nodeType);
    });
    var elements = [];

    obj.elements = elements;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = childNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var childNode = _step2.value;

        var childObj = xmlToJson(childNode);

        if (childObj.type !== TYPE.TEXT || childObj.text.length > 0) {
          elements.push(childObj);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return obj;
};

/* eslint-disable filenames/match-regex, id-match */

var xml2js = function xml2js(parser, xmlText) {
  var xmlDom = parser.parseFromString(xmlText, 'application/xml');

  saneDomparserError.failOnParseError(xmlDom);

  return xmlToJson(xmlDom);
};

var getChildren = function getChildren() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$elements = _ref.elements,
      elements = _ref$elements === undefined ? [] : _ref$elements;

  return elements;
};

var findChildByName = function findChildByName(element, childName) {
  return getChildren(element).find(function (_ref2) {
    var _ref2$name = _ref2.name,
        name = _ref2$name === undefined ? '' : _ref2$name;
    return name.toUpperCase() === childName.toUpperCase();
  });
};

var filterChildrenByName = function filterChildrenByName(element, childrenName) {
  return getChildren(element).filter(function (_ref3) {
    var _ref3$name = _ref3.name,
        name = _ref3$name === undefined ? '' : _ref3$name;
    return name.toUpperCase() === childrenName.toUpperCase();
  });
};

/**
 * Get the first child element from the passed parsed xml element.
 *
 * @memberof module:@mailonline/vast-xml2js
 * @param {Object} element - Parsed xml element object.
 * @param {string} childName - Child element name
 * @returns {Object|undefined} - the first child element with the passed name or undefined if not found.
 */
var get = findChildByName;

/**
 * Get all the children elements of the passed parsed xml element filtered by the passed child name if passed.
 *
 * @memberof module:@mailonline/vast-xml2js
 * @param {Object} element - Parsed xml element object.
 * @param {string} [childName] - Child element name.
 * @returns {Array} - Array of child elements or an empty array.
 */
var getAll = function getAll(element, childName) {
  if (typeof childName === 'string') {
    return filterChildrenByName(element, childName);
  }

  return getChildren(element);
};

/**
 * Get the first child element from the passed parsed xml element.
 *
 * @memberof module:@mailonline/vast-xml2js
 * @returns {Object|null} - the first child element or undefined if there are non.
 */
var getFirstChild = function getFirstChild(element) {
  return getChildren(element)[0] || null;
};

/**
 * Get the text value of the passed parsed xml element or null if there is non.
 *
 * @memberof module:@mailonline/vast-xml2js
 * @returns {string|null} - text of the element or null.
 */
var getText = function getText(element) {
  var firstChild = element && getFirstChild(element);

  return firstChild && firstChild.text || null;
};

/**
 * Get all the attributes of the passed parsed xml element.
 *
 * @memberof module:@mailonline/vast-xml2js
 * @returns {Object} - Object with the element attributes.
 */
var getAttributes = function getAttributes() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$attributes = _ref4.attributes,
      attributes = _ref4$attributes === undefined ? {} : _ref4$attributes;

  return attributes;
};

/**
 * Get the attribute with the passed name of the passed parsed xml element.
 *
 * @memberof module:@mailonline/vast-xml2js
 * @returns {number|string|undefined} - Attribute value or undefined.
 */
var getAttribute = function getAttribute(element, attributeName) {
  return getAttributes(element)[attributeName];
};

var parser = new DOMParser();

/**
 * Parses the passed xml text.
 *
 * @global
 * @typedef parseXml
 * @throws if there is an error parsing the xml.
 * @param {string} xmlText - XML text to be parsed.
 * @returns {Object} - Returns the parsed xml document as a js object.
 * @static
 */
var parseXml = function parseXml(xmlText) {
  return xml2js(parser, xmlText);
};

var parseHoursToMs = function parseHoursToMs(hourStr) {
  return parseInt(hourStr, 10) * 60 * 60 * 1000;
};
var parseMinToMs = function parseMinToMs(minStr) {
  return parseInt(minStr, 10) * 60 * 1000;
};
var parseSecToMs = function parseSecToMs(secStr) {
  return parseInt(secStr, 10) * 1000;
};
var parseTime = function parseTime(durationStr) {
  if (typeof durationStr === 'string') {
    var durationRegex = /(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/;
    var match = durationStr.match(durationRegex);

    if (match) {
      var durationInMs = parseHoursToMs(match[1]) + parseMinToMs(match[2]) + parseSecToMs(match[3]) + parseInt(match[5] || 0, 10);

      if (!isNaN(durationInMs)) {
        return durationInMs;
      }
    }
  }

  return null;
};

var isPercentage = function isPercentage(offset) {
  var percentageRegex = /^\d+(\.\d+)?%$/g;

  return percentageRegex.test(offset);
};

var parseOffset = function parseOffset(offset) {
  if (isPercentage(offset)) {
    return offset;
  }

  return parseTime(offset);
};

var getLinearCreative = function getLinearCreative(ad) {
  var adTypeElement = getFirstChild(ad);
  var creativesElement = adTypeElement && get(adTypeElement, 'creatives');
  var hasLinear = function hasLinear(creative) {
    return get(creative, 'linear');
  };

  return creativesElement && getAll(creativesElement).find(hasLinear) || null;
};

var getLinearTrackingEvents = function getLinearTrackingEvents(ad, eventName) {
  var creativeElement = ad && getLinearCreative(ad);

  if (creativeElement) {
    var linearElement = get(creativeElement, 'Linear');
    var trackingEventsElement = linearElement && get(linearElement, 'TrackingEvents');
    var trackingEventElements = trackingEventsElement && getAll(trackingEventsElement, 'Tracking');

    if (trackingEventElements && trackingEventElements.length > 0) {
      var trackingEvents = trackingEventElements.map(function (trackingEventElement) {
        var _getAttributes = getAttributes(trackingEventElement),
            event = _getAttributes.event,
            offset = _getAttributes.offset;

        var uri = getText(trackingEventElement);

        return {
          event: event,
          offset: offset && parseOffset(offset),
          uri: uri
        };
      });

      if (eventName) {
        var filteredEvents = trackingEvents.filter(function (_ref) {
          var event = _ref.event;
          return event === eventName;
        });

        if (filteredEvents.length > 0) {
          return filteredEvents;
        }
      } else {
        return trackingEvents;
      }
    }
  }

  return null;
};

var getNonLinearTrackingEvents = function getNonLinearTrackingEvents(ad, eventName) {
  var creativeElement = ad && getLinearCreative(ad);

  if (creativeElement) {
    var NonLinearAdsElement = get(creativeElement, 'NonLinearAds');
    var trackingEventsElement = NonLinearAdsElement && get(NonLinearAdsElement, 'TrackingEvents');
    var trackingEventElements = trackingEventsElement && getAll(trackingEventsElement, 'Tracking');

    if (trackingEventElements && trackingEventElements.length > 0) {
      var trackingEvents = trackingEventElements.map(function (trackingEventElement) {
        var _getAttributes = getAttributes(trackingEventElement),
            event = _getAttributes.event;

        var uri = getText(trackingEventElement);

        return {
          event: event,
          uri: uri
        };
      });

      if (eventName) {
        var filteredEvents = trackingEvents.filter(function (_ref) {
          var event = _ref.event;
          return event === eventName;
        });

        if (filteredEvents.length > 0) {
          return filteredEvents;
        }
      } else {
        return trackingEvents;
      }
    }
  }

  return null;
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var formatSize = function formatSize(size) {
  var match = ('' + size).match(/\d+/g);

  return parseInt(match[0], 10);
};

var formatPosition = function formatPosition(position) {
  var isNumberString = /\d+/.test(position);

  if (isNumberString) {
    return formatSize(position);
  }

  return position;
};

var getIconAttributes = function getIconAttributes(iconElement) {
  var _getAttributes = getAttributes(iconElement),
      duration = _getAttributes.duration,
      height = _getAttributes.height,
      offset = _getAttributes.offset,
      program = _getAttributes.program,
      pxratio = _getAttributes.pxratio,
      width = _getAttributes.width,
      _getAttributes$xPosit = _getAttributes.xPosition,
      xPosition = _getAttributes$xPosit === undefined ? 'right' : _getAttributes$xPosit,
      _getAttributes$yPosit = _getAttributes.yPosition,
      yPosition = _getAttributes$yPosit === undefined ? 'top' : _getAttributes$yPosit;

  return {
    duration: duration && parseTime(duration),
    height: height && formatSize(height),
    offset: offset && parseTime(offset),
    program: program,
    pxratio: pxratio && parseInt(pxratio, 10),
    width: width && formatSize(width),
    xPosition: xPosition && formatPosition(xPosition),
    yPosition: yPosition && formatPosition(yPosition)
  };
};

var getIconResource = function getIconResource(iconElement) {
  var staticResourceElement = get(iconElement, 'StaticResource');
  var htmlResourceElement = get(iconElement, 'HTMLResource');
  var iFrameResourceElement = get(iconElement, 'IFrameResource');

  if (staticResourceElement) {
    return { staticResource: getText(staticResourceElement) };
  }

  if (htmlResourceElement) {
    return { htmlResource: getText(htmlResourceElement) };
  }

  if (iFrameResourceElement) {
    return { iFrameResource: getText(iFrameResourceElement) };
  }

  return {
    staticResource: getText(iconElement)
  };
};

var getIconViewTracking = function getIconViewTracking(iconElement) {
  var iconTrackingElements = getAll(iconElement, 'IconViewTracking').map(function (iconViewTrackingElement) {
    return getText(iconViewTrackingElement);
  });

  if (iconTrackingElements.length === 0) {
    return {};
  }

  return {
    iconViewTracking: iconTrackingElements
  };
};

var getIconClicks = function getIconClicks(iconElement) {
  var iconClicksElement = get(iconElement, 'IconClicks');
  var iconClickThroughElement = iconClicksElement && get(iconClicksElement, 'IconClickThrough');
  var iconClickTrackingElements = iconClicksElement && getAll(iconClicksElement, 'IconClickTracking').map(function (iconClickTrackingElement) {
    return getText(iconClickTrackingElement);
  });

  return {
    iconClickThrough: iconClickThroughElement && getText(iconClickThroughElement),
    iconClickTracking: iconClickTrackingElements && iconClickTrackingElements.length > 0 ? iconClickTrackingElements : undefined
  };
};

var getIcons = function getIcons(ad) {
  var linearCreativeElement = ad && getLinearCreative(ad);
  var linearElement = linearCreativeElement && get(linearCreativeElement, 'linear');
  var iconsElement = linearElement && get(linearElement, 'Icons');
  var iconElements = iconsElement && getAll(iconsElement, 'Icon');

  if (iconElements && iconElements.length > 0) {
    return iconElements.map(function (iconElement) {
      return _extends({}, getIconAttributes(iconElement), getIconResource(iconElement), getIconViewTracking(iconElement), getIconClicks(iconElement));
    });
  }

  return null;
};

/**
 * @memberof module:@mailonline/video-ad-sdk
 * @description Published as part of {@link module:@mailonline/video-ad-sdk}
 * @module vastSelectors
 */

var getBooleanValue = function getBooleanValue(val) {
  if (typeof val === 'string') {
    return val === 'true';
  }

  return Boolean(val);
};

var compareBySequence = function compareBySequence(itemA, itemB) {
  var itemASequence = parseInt(getAttribute(itemA, 'sequence'), 10);
  var itemBSequence = parseInt(getAttribute(itemB, 'sequence'), 10);

  if (itemASequence < itemBSequence) {
    return -1;
  }

  if (itemASequence > itemBSequence) {
    return 1;
  }

  return 0;
};

/**
 * Selects the ads of the passed VAST.
 *
 * @function
 * @param {ParsedVast} parsedVAST - Parsed VAST xml.
 * @returns {?Array} - Array of ads or empty array.
 * @static
 */
var getAds = function getAds(parsedVAST) {
  var vastElement = parsedVAST && get(parsedVAST, 'VAST');
  var ads = vastElement && getAll(vastElement, 'Ad');

  if (ads && ads.length > 0) {
    return ads;
  }

  return [];
};

/**
 * Gets the Error URI of the passed parsed VAST xml.
 *
 * @function
 * @param {ParsedVast} parsedVAST - Parsed VAST xml.
 * @returns {?VAST-macro} - Vast Error URI or `null` otherwise.
 * @static
 */
var getVastErrorURI = function getVastErrorURI(parsedVAST) {
  var vastElement = parsedVAST && get(parsedVAST, 'VAST');

  if (vastElement) {
    var error = get(vastElement, 'Error');

    if (error) {
      return getText(error);
    }
  }

  return null;
};

/**
 * Gets the sequence of the pod ad.
 *
 * @function
 * @param {ParsedAd} ad - Parsed ad definition object.
 * @returns {?number} - The pod ad sequence number or `null`.
 * @static
 */
var getPodAdSequence = function getPodAdSequence(ad) {
  var sequence = parseInt(getAttribute(ad, 'sequence'), 10);

  if (typeof sequence === 'number' && !isNaN(sequence)) {
    return sequence;
  }

  return null;
};

/**
 * Checks if the passed ad definition is a pod ad.
 *
 * @function
 * @param {ParsedAd} ad - Parsed ad definition object.
 * @returns {?boolean} - Returns true if there the ad is a pod ad and false otherwise.
 * @static
 */
var isPodAd = function isPodAd(ad) {
  return Boolean(getPodAdSequence(ad));
};

/**
 * Checks if the passed array of ads have an ad pod.
 *
 * @function
 * @param {ParsedVAST} parsedVAST - Parsed VAST xml.
 * @returns {?boolean} - Returns true if there is an ad pod in the array and false otherwise.
 * @static
 */
var hasAdPod = function hasAdPod(parsedVAST) {
  var ads = getAds(parsedVAST);

  return Array.isArray(ads) && ads.filter(isPodAd).length > 1;
};

/**
 * Returns true if the passed VastChain has an ad pod or false otherwise.
 *
 * @function
 * @param {Array} VastChain - Array of VAST responses. See `load` or `requestAd` for more info.
 *
 * @returns {boolean} - True if the VastChain contains an ad pod and false otherwise.
 * @static
 */
var isAdPod = function isAdPod() {
  var VastChain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return VastChain.map(function (_ref) {
    var parsedXML = _ref.parsedXML;
    return parsedXML;
  }).some(hasAdPod);
};

/**
 * Selects the first ad of the passed VAST. If the passed VAST response contains an ad pod it will return the first ad in the ad pod sequence.
 *
 * @function
 * @param {ParsedVAST} parsedVAST - Parsed VAST xml.
 * @returns {?ParsedAd} - First ad of the VAST xml or `null`.
 * @static
 */
var getFirstAd = function getFirstAd(parsedVAST) {
  var ads = getAds(parsedVAST);

  if (Array.isArray(ads) && ads.length > 0) {
    if (hasAdPod(parsedVAST)) {
      return ads.filter(isPodAd).sort(compareBySequence)[0];
    }

    return ads[0];
  }

  return null;
};

/**
 * Checks if the passed ad is a Wrapper.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {boolean} - `true` if the ad contains a wrapper and `false` otherwise.
 * @static
 */
var isWrapper = function isWrapper() {
  var ad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Boolean(get(ad || {}, 'Wrapper'));
};

/**
 * Checks if the passed ad is an Inline.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {boolean} - Returns `true` if the ad contains an Inline or `false` otherwise.
 * @static
 */
var isInline = function isInline(ad) {
  return Boolean(get(ad || {}, 'Inline'));
};

/**
 * Returns the VASTAdTagURI from the wrapper ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?string} - Returns the VASTAdTagURI from the wrapper ad or `null` otherwise.
 * @static
 */
var getVASTAdTagURI = function getVASTAdTagURI(ad) {
  var wrapperElement = get(ad, 'Wrapper');
  var vastAdTagURIElement = wrapperElement && get(wrapperElement, 'VastAdTagUri');

  if (vastAdTagURIElement) {
    return getText(vastAdTagURIElement) || null;
  }

  return null;
};

/**
 * Returns the options from the wrapper ad.
 *
 * @function
 * @param {Object} ad - VAST ad object.
 * @returns {WrapperOptions} - Returns the options from the wrapper ad.
 * @static
 */
var getWrapperOptions = function getWrapperOptions(ad) {
  var _getAttributes = getAttributes(get(ad, 'Wrapper')),
      allowMultipleAds = _getAttributes.allowMultipleAds,
      fallbackOnNoAd = _getAttributes.fallbackOnNoAd,
      followAdditionalWrappers = _getAttributes.followAdditionalWrappers;

  var opts = {};

  if (allowMultipleAds) {
    opts.allowMultipleAds = getBooleanValue(allowMultipleAds);
  }

  if (fallbackOnNoAd) {
    opts.fallbackOnNoAd = getBooleanValue(fallbackOnNoAd);
  }

  if (followAdditionalWrappers) {
    opts.followAdditionalWrappers = getBooleanValue(followAdditionalWrappers);
  }

  return opts;
};

/**
 * Gets the Error URI of the passed ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?string} - Vast ad Error URI or `null` otherwise.
 * @static
 */
var getAdErrorURI = function getAdErrorURI(ad) {
  var adTypeElement = ad && getFirstChild(ad);

  if (adTypeElement) {
    var error = get(adTypeElement, 'Error');

    if (error) {
      return getText(error);
    }
  }

  return null;
};

/**
 * Gets the Impression URI of the passed ad.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?string} - Vast ad Impression URI or `null` otherwise.
 * @static
 */
var getImpressionUri = function getImpressionUri(ad) {
  var adTypeElement = ad && getFirstChild(ad);

  if (adTypeElement) {
    var impression = get(adTypeElement, 'Impression');

    if (impression) {
      return getText(impression);
    }
  }

  return null;
};

/**
 * Gets the ad's MediaFiles.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<MediaFile>} - array of media files or null
 * @static
 */
var getMediaFiles = function getMediaFiles(ad) {
  var creativeElement = ad && getLinearCreative(ad);

  if (creativeElement) {
    var universalAdIdElement = get(creativeElement, 'UniversalAdId');
    var universalAdId = universalAdIdElement && getText(universalAdIdElement) || null;
    var linearElement = get(creativeElement, 'Linear');
    var mediaFilesElement = get(linearElement, 'MediaFiles');
    var mediaFileElements = mediaFilesElement && getAll(mediaFilesElement, 'MediaFile');

    if (mediaFileElements && mediaFileElements.length > 0) {
      return mediaFileElements.map(function (mediaFileElement) {
        var src = getText(mediaFileElement);

        var _getAttributes2 = getAttributes(mediaFileElement),
            apiFramework = _getAttributes2.apiFramework,
            bitrate = _getAttributes2.bitrate,
            codec = _getAttributes2.codec,
            delivery = _getAttributes2.delivery,
            height = _getAttributes2.height,
            id = _getAttributes2.id,
            maintainAspectRatio = _getAttributes2.maintainAspectRatio,
            maxBitrate = _getAttributes2.maxBitrate,
            minBitrate = _getAttributes2.minBitrate,
            scalable = _getAttributes2.scalable,
            type = _getAttributes2.type,
            width = _getAttributes2.width;

        return {
          apiFramework: apiFramework,
          bitrate: bitrate,
          codec: codec,
          delivery: delivery,
          height: height,
          id: id,
          maintainAspectRatio: maintainAspectRatio,
          maxBitrate: maxBitrate,
          minBitrate: minBitrate,
          scalable: scalable,
          src: src,
          type: type,
          universalAdId: universalAdId,
          width: width
        };
      });
    }
  }

  return null;
};

/**
 * Gets the ad's InteractiveFiles. That were added with the `InteractiveCreativeFile` tag.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<InteractiveFile>} - array of media files or null
 * @static
 */
var getInteractiveCreativeFiles = function getInteractiveCreativeFiles(ad) {
  var creativeElement = ad && getLinearCreative(ad);

  if (creativeElement) {
    var linearElement = get(creativeElement, 'Linear');
    var mediaFilesElement = get(linearElement, 'MediaFiles');
    var interactiveElements = mediaFilesElement && getAll(mediaFilesElement, 'InteractiveCreativeFile');

    if (interactiveElements && interactiveElements.length > 0) {
      return interactiveElements.map(function (interactiveElement) {
        var _getAttributes3 = getAttributes(interactiveElement),
            apiFramework = _getAttributes3.apiFramework,
            type = _getAttributes3.type;

        var src = getText(interactiveElement);

        return {
          apiFramework: apiFramework,
          src: src,
          type: type
        };
      });
    }
  }

  return null;
};

/**
 * Gets all the ad's InteractiveFiles.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<InteractiveFile>} - array of media files or null
 * @static
 */
var getInteractiveFiles = function getInteractiveFiles(ad) {
  var interactiveFiles = getInteractiveCreativeFiles(ad);

  if (interactiveFiles) {
    return interactiveFiles;
  }

  var mediaFiles = getMediaFiles(ad);

  if (mediaFiles) {
    interactiveFiles = mediaFiles.filter(function (_ref2) {
      var _ref2$apiFramework = _ref2.apiFramework,
          apiFramework = _ref2$apiFramework === undefined ? '' : _ref2$apiFramework;
      return apiFramework.toLowerCase() === 'vpaid';
    }).map(function (_ref3) {
      var apiFramework = _ref3.apiFramework,
          src = _ref3.src,
          type = _ref3.type;
      return {
        apiFramework: apiFramework,
        src: src,
        type: type
      };
    });

    if (interactiveFiles.length > 0) {
      return interactiveFiles;
    }
  }

  return null;
};

var getVideoClicksElement = function getVideoClicksElement(ad) {
  var creativeElement = ad && getLinearCreative(ad);
  var linearElement = creativeElement && get(creativeElement, 'Linear');
  var videoClicksElement = linearElement && get(linearElement, 'VideoClicks');

  if (videoClicksElement) {
    return videoClicksElement;
  }

  return null;
};

/**
 * Gets the click through {@link VAST-macro}.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?VAST-macro} - clickthrough macro
 * @static
 */
var getClickThrough = function getClickThrough(ad) {
  var videoClicksElement = getVideoClicksElement(ad);
  var clickThroughElement = videoClicksElement && get(videoClicksElement, 'ClickThrough');

  if (clickThroughElement) {
    return getText(clickThroughElement);
  }

  return null;
};

/**
 * Gets the click through {@link VAST-macro}.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<VAST-macro>} - click tracking macro
 * @static
 */
var getClickTracking = function getClickTracking(ad) {
  var videoClicksElement = getVideoClicksElement(ad);
  var clickTrackingElements = videoClicksElement && getAll(videoClicksElement, 'ClickTracking');

  if (clickTrackingElements && clickTrackingElements.length > 0) {
    return clickTrackingElements.map(function (element) {
      return getText(element);
    });
  }

  return null;
};

/**
 * Gets the custom click {@link VAST-macro}.
 *
 * @function
 * @param {ParsedAd} ad - VAST ad object.
 * @returns {?Array.<VAST-macro>} - click tracking macro
 * @static
 */
var getCustomClick = function getCustomClick(ad) {
  var videoClicksElement = getVideoClicksElement(ad);
  var customClickElements = videoClicksElement && getAll(videoClicksElement, 'CustomClick');

  if (customClickElements && customClickElements.length > 0) {
    return customClickElements.map(function (element) {
      return getText(element);
    });
  }

  return null;
};

/**
 * Gets the skipoffset.
 *
 * @function
 * @param {Object} ad - VAST ad object.
 * @returns {?ParsedOffset} - the time offset in milliseconds or a string with the percentage or null
 * @static
 */
var getSkipOffset = function getSkipOffset(ad) {
  var creativeElement = ad && getLinearCreative(ad);
  var linearElement = creativeElement && get(creativeElement, 'Linear');
  var skipoffset = linearElement && getAttribute(linearElement, 'skipoffset');

  if (skipoffset) {
    return parseOffset(skipoffset);
  }

  return null;
};

var getLinearContent = function getLinearContent(xml) {
  var linearRegex = /<Linear([\s\S]*)<\/Linear/gm;
  var result = linearRegex.exec(xml);

  return result && result[1];
};

var getAdParametersContent = function getAdParametersContent(xml) {
  var paramsRegex = /<AdParameters[\s\w="]*>([\s\S]*)<\/AdParameters>/gm;
  var result = paramsRegex.exec(xml);

  return result && result[1].replace(/[\n\s]*<!\[CDATA\[[\n\s]*/, '').replace(/[\n\s]*\]\]>[\n\s]*$/, '')

  // unescape nested CDATA
  .replace(/\]\]\]\]><!\[CDATA\[>/, ']]>').trim();
};

var getXmlEncodedValue = function getXmlEncodedValue(xml) {
  var xmlEncodedRegex = /<AdParameters[\s]*xmlEncoded="(.*?)">/gmi;
  var result = xmlEncodedRegex.exec(xml);

  return Boolean(result) && result[1] === 'true';
};

/**
 * Gets the creative data.
 *
 * @function
 * @param {string} xml - VAST XML text.
 * @returns {Object} - with `AdParameters` as they come in the XML and a flag `xmlEncoded` to indicate if the ad parameters are xml encoded.
 * @static
 */
var getCreativeData = function getCreativeData(xml) {
  var linearContent = getLinearContent(xml);
  var AdParameters = linearContent && getAdParametersContent(linearContent);
  var xmlEncoded = linearContent && getXmlEncodedValue(linearContent);

  return {
    AdParameters: AdParameters,
    xmlEncoded: xmlEncoded
  };
};

var index = /*#__PURE__*/Object.freeze({
	getAds: getAds,
	getVastErrorURI: getVastErrorURI,
	getPodAdSequence: getPodAdSequence,
	isPodAd: isPodAd,
	hasAdPod: hasAdPod,
	isAdPod: isAdPod,
	getFirstAd: getFirstAd,
	isWrapper: isWrapper,
	isInline: isInline,
	getVASTAdTagURI: getVASTAdTagURI,
	getWrapperOptions: getWrapperOptions,
	getAdErrorURI: getAdErrorURI,
	getImpressionUri: getImpressionUri,
	getMediaFiles: getMediaFiles,
	getInteractiveCreativeFiles: getInteractiveCreativeFiles,
	getInteractiveFiles: getInteractiveFiles,
	getClickThrough: getClickThrough,
	getClickTracking: getClickTracking,
	getCustomClick: getCustomClick,
	getSkipOffset: getSkipOffset,
	getCreativeData: getCreativeData,
	getIcons: getIcons,
	getLinearTrackingEvents: getLinearTrackingEvents,
	getNonLinearTrackingEvents: getNonLinearTrackingEvents
});

var toUpperKeys = function toUpperKeys(map) {
  var upperKeysMap = {};

  Object.keys(map).forEach(function (key) {
    upperKeysMap[key.toUpperCase()] = map[key];
  });

  return upperKeysMap;
};

/**
 * Parses the passed macro with the passed data and returns the resulting parsed Macro.
 * If no CACHEBUSTING property is passed in the data it will generate a random one on its own.
 * If no TIMESTAMP property is passed in the data it will generate a one on its own.
 *
 * @ignore
 * @param {string} macro - The string macro to be parsed.
 * @param {Object} data - The data used by the macro.
 * @returns {string} - The parsed macro.
 * @static
 */
var parseMacro = function parseMacro(macro) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parsedMacro = macro;
  var macroData = toUpperKeys(data);

  if (!Boolean(macroData.CACHEBUSTING)) {
    macroData.CACHEBUSTING = Math.round(Math.random() * 1.0e+10);
  }

  if (!Boolean(macroData.TIMESTAMP)) {
    macroData.TIMESTAMP = new Date().toISOString();
  }

  Object.keys(macroData).forEach(function (key) {
    var value = encodeURIComponent(macroData[key]);

    parsedMacro = parsedMacro.replace(new RegExp('\\[' + key + '\\]', 'gm'), value);
  });

  return parsedMacro;
};

/**
 * Creates a tracking image with the passed URL macro.
 *
 * @global
 * @typedef pixelTracker
 * @type TrackerFn
 * @name pixelTracker
 * @param {string} URLMacro - URL Macro that need to be tracked.
 * @param {Object} data - Data Object with the macros's variables.
 * @returns {HTMLImageElement} - Image element whose source is the parsed URL Macro.
 * @static
 */
var pixelTracker = function pixelTracker(URLMacro, data) {
  var img = new Image();

  img.src = parseMacro(URLMacro, data);

  return img;
};

/**
 * Tracks an error.
 *
 * @ignore
 * @param {VastChain} vastChain - the ad VAST Chain.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {Object} [options.logger] - Optional logger instance.
 *                                    Must comply to the [Console interface](https://developer.mozilla.org/es/docs/Web/API/Console).
 *                                    Defaults to console.
 * @param {tracker} [options.tracker] - optional tracker to use for the actual tracking. Defaults to the pixel tracker.
 * @param {string} [options.errorCode] - error code. Needed if we are tracking an error.
 */
var trackError = function trackError(vastChain, _ref) {
  var errorCode = _ref.errorCode,
      _ref$tracker = _ref.tracker,
      tracker = _ref$tracker === undefined ? pixelTracker : _ref$tracker;

  vastChain.forEach(function (_ref2) {
    var ad = _ref2.ad,
        parsedXML = _ref2.parsedXML;

    var errorURI = getAdErrorURI(ad) || getVastErrorURI(parsedXML);

    if (Boolean(errorURI)) {
      tracker(errorURI, { errorCode: errorCode });
    }
  });
};

var trackIconView = function trackIconView(vastChain, _ref) {
  var data = _ref.data,
      _ref$tracker = _ref.tracker,
      tracker = _ref$tracker === undefined ? pixelTracker : _ref$tracker;
  var iconViewTracking = data.iconViewTracking;


  if (Array.isArray(iconViewTracking)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = iconViewTracking[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var trackUrl = _step.value;

        tracker(trackUrl, _extends({}, data));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

var trackIconClick = function trackIconClick(vastChain, _ref) {
  var data = _ref.data,
      _ref$tracker = _ref.tracker,
      tracker = _ref$tracker === undefined ? pixelTracker : _ref$tracker;
  var iconClickTracking = data.iconClickTracking;


  if (Array.isArray(iconClickTracking)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = iconClickTracking[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var trackUrl = _step.value;

        tracker(trackUrl, _extends({}, data));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

var trackProgress = function trackProgress(vastChain, _ref) {
  var data = _ref.data,
      _ref$tracker = _ref.tracker,
      tracker = _ref$tracker === undefined ? pixelTracker : _ref$tracker;
  var progressUri = data.progressUri;


  if (Boolean(progressUri)) {
    tracker(progressUri, _extends({}, data));
  }
};

var createVastEventTracker = function createVastEventTracker(vastChainSelector) {
  return function (vastChain, _ref) {
    var data = _ref.data,
        _ref$tracker = _ref.tracker,
        tracker = _ref$tracker === undefined ? pixelTracker : _ref$tracker;

    vastChain.forEach(function (_ref2) {
      var ad = _ref2.ad;

      var value = vastChainSelector(ad);

      if (Boolean(value)) {
        switch (true) {
          case typeof value === 'string':
            {
              tracker(value, data);
              break;
            }
          case Array.isArray(value):
            {
              value.map(function (_ref3) {
                var uri = _ref3.uri;
                return tracker(uri, data);
              });
              break;
            }
        }
      }
    });
  };
};

var _linearTrackers;

var clickTrackingSelector = function clickTrackingSelector(ad) {
  var trackingURIs = [];
  var clickTrackings = getClickTracking(ad);
  var customClicks = getCustomClick(ad);

  /* istanbul ignore else */
  if (Array.isArray(clickTrackings) && clickTrackings.length > 0) {
    trackingURIs.push.apply(trackingURIs, toConsumableArray(clickTrackings.map(function (uri) {
      return { uri: uri };
    })));
  }

  /* istanbul ignore else */
  if (Array.isArray(customClicks) && customClicks.length > 0) {
    trackingURIs.push.apply(trackingURIs, toConsumableArray(customClicks.map(function (uri) {
      return { uri: uri };
    })));
  }

  return trackingURIs;
};

var linearTrackingEventSelector = function linearTrackingEventSelector(event) {
  return function (ad) {
    return getLinearTrackingEvents(ad, event);
  };
};
var linearTrackers = (_linearTrackers = {}, defineProperty(_linearTrackers, clickThrough, createVastEventTracker(clickTrackingSelector)), defineProperty(_linearTrackers, closeLinear, createVastEventTracker(linearTrackingEventSelector(closeLinear))), defineProperty(_linearTrackers, complete, createVastEventTracker(linearTrackingEventSelector(complete))), defineProperty(_linearTrackers, error, trackError), defineProperty(_linearTrackers, exitFullscreen, createVastEventTracker(linearTrackingEventSelector(exitFullscreen))), defineProperty(_linearTrackers, firstQuartile, createVastEventTracker(linearTrackingEventSelector(firstQuartile))), defineProperty(_linearTrackers, fullscreen, createVastEventTracker(linearTrackingEventSelector(fullscreen))), defineProperty(_linearTrackers, iconClick, trackIconClick), defineProperty(_linearTrackers, iconView, trackIconView), defineProperty(_linearTrackers, impression, createVastEventTracker(getImpressionUri)), defineProperty(_linearTrackers, midpoint, createVastEventTracker(linearTrackingEventSelector(midpoint))), defineProperty(_linearTrackers, mute, createVastEventTracker(linearTrackingEventSelector(mute))), defineProperty(_linearTrackers, pause, createVastEventTracker(linearTrackingEventSelector(pause))), defineProperty(_linearTrackers, playerCollapse, createVastEventTracker(linearTrackingEventSelector(playerCollapse))), defineProperty(_linearTrackers, playerExpand, createVastEventTracker(linearTrackingEventSelector(playerExpand))), defineProperty(_linearTrackers, progress, trackProgress), defineProperty(_linearTrackers, resume, createVastEventTracker(linearTrackingEventSelector(resume))), defineProperty(_linearTrackers, rewind, createVastEventTracker(linearTrackingEventSelector(rewind))), defineProperty(_linearTrackers, skip, createVastEventTracker(linearTrackingEventSelector(skip))), defineProperty(_linearTrackers, start, createVastEventTracker(linearTrackingEventSelector(start))), defineProperty(_linearTrackers, thirdQuartile, createVastEventTracker(linearTrackingEventSelector(thirdQuartile))), defineProperty(_linearTrackers, unmute, createVastEventTracker(linearTrackingEventSelector(unmute))), _linearTrackers);

/**
 * Tracks the passed linear event.
 *
 * @ignore
 * @param {string} event - name of the linear event we need to track. @see LinearEvents
 * @param {VastChain} vastChain - the ad VAST Chain.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {Object} [options.logger] - Optional logger instance.
 *                                    Must comply to the [Console interface](https://developer.mozilla.org/es/docs/Web/API/Console).
 *                                    Defaults to console.
 * @param {Object} [options.data] - additional data for the URL macro. See [VAST specification]{@link https://www.iab.com/guidelines/digital-video-ad-serving-template-vast-4-0/}
 * @param {tracker} [options.tracker] - optional tracker to use for the actual tracking. Defaults to the pixel tracker.
 * @param {string} [options.errorCode] - error code. Needed if we are tracking an error.
 */
var trackLinearEvent = function trackLinearEvent(event, vastChain, _ref) {
  var data = _ref.data,
      errorCode = _ref.errorCode,
      _ref$tracker = _ref.tracker,
      tracker = _ref$tracker === undefined ? pixelTracker : _ref$tracker,
      _ref$logger = _ref.logger,
      logger = _ref$logger === undefined ? console : _ref$logger;

  var linearTracker = linearTrackers[event];

  if (linearTracker) {
    linearTracker(vastChain, {
      data: _extends({}, data, {
        errorCode: errorCode
      }),
      errorCode: errorCode,
      tracker: tracker
    });
  } else {
    logger.error('Event \'' + event + '\' cannot be tracked');
  }
};

var _linearTrackers$1;

var trackingEventSelector = function trackingEventSelector(event) {
  return function (ad) {
    return getNonLinearTrackingEvents(ad, event);
  };
};
var linearTrackers$1 = (_linearTrackers$1 = {}, defineProperty(_linearTrackers$1, acceptInvitation, createVastEventTracker(trackingEventSelector(acceptInvitation))), defineProperty(_linearTrackers$1, adCollapse, createVastEventTracker(trackingEventSelector(adCollapse))), defineProperty(_linearTrackers$1, close, createVastEventTracker(trackingEventSelector(close))), defineProperty(_linearTrackers$1, creativeView, createVastEventTracker(trackingEventSelector(creativeView))), _linearTrackers$1);

/**
 * Tracks the passed non linear event.
 *
 * @ignore
 * @param {string} event - name of the linear event we need to track. @see LinearEvents
 * @param {VastChain} vastChain - the ad VAST Chain.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {Object} [options.logger] - Optional logger instance.
 *                                    Must comply to the [Console interface](https://developer.mozilla.org/es/docs/Web/API/Console).
 *                                    Defaults to console.
 * @param {Object} [options.data] - additional data for the URL macro. See [VAST specification]{@link https://www.iab.com/guidelines/digital-video-ad-serving-template-vast-4-0/}
 * @param {tracker} [options.tracker] - optional tracker to use for the actual tracking. Defaults to the pixel tracker.
 */
var trackNonLinearEvent = function trackNonLinearEvent(event, vastChain, _ref) {
  var data = _ref.data,
      _ref$tracker = _ref.tracker,
      tracker = _ref$tracker === undefined ? pixelTracker : _ref$tracker,
      _ref$logger = _ref.logger,
      logger = _ref$logger === undefined ? console : _ref$logger;

  var linearTracker = linearTrackers$1[event];

  if (linearTracker) {
    linearTracker(vastChain, {
      data: _extends({}, data),
      tracker: tracker
    });
  } else {
    logger.error('Event \'' + event + '\' cannot be tracked');
  }
};

/**
 * Loads the script source.
 *
 * @ignore
 * @param {string} src - The script source.
 * @param {Object} options - The allowed options are:
 *                           type: Defaults to 'text/javascript'.
 *                           async<Boolean> : if "true" the "async" attribute is added to the new script. Defaults to false.
 *                           defer<Boolean> : if "true" the "defer" attribute is added to the new script. Defaults to false.
 *                           placeholder: Element that should contain the script. Defaults to the parentNode of the currentScript or
 *                                        if missing to document.head .
 */
var loadScript = function loadScript(src) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$async = _ref.async,
      async = _ref$async === undefined ? false : _ref$async,
      _ref$defer = _ref.defer,
      defer = _ref$defer === undefined ? false : _ref$defer,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'text/javascript' : _ref$type,
      placeholder = _ref.placeholder;

  if (!src) {
    throw new TypeError('Missing required "src" parameter');
  }

  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    var scriptPlaceholder = placeholder;

    script.type = type;
    script.async = async;
    script.defer = defer;
    script.onerror = function () {
      return reject(new URIError('The script ' + src + ' is not accessible.'));
    };
    script.onload = function () {
      return resolve(script);
    };

    if (!scriptPlaceholder) {
      scriptPlaceholder = document.currentScript ?
      /* istanbul ignore next */
      document.currentScript.parentNode : document.head;
    }

    script.src = src;
    scriptPlaceholder.appendChild(script);
  });
};

var createAdVideoElement = function createAdVideoElement() {
  var contentDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  var video = contentDocument.createElement('VIDEO');

  video.style.width = '100%';
  video.style.height = '100%';

  return video;
};

var createAdContainer = function createAdContainer() {
  var adContainer = document.createElement('DIV');

  adContainer.classList.add('mol-video-ad-container');
  adContainer.style.width = '100%';
  adContainer.style.height = '100%';

  return adContainer;
};

var getContentDocument = function getContentDocument(iframeElement) {
  return iframeElement.contentDocument ||
  /* istanbul ignore next */
  iframeElement.contentWindow && iframeElement.contentWindow.document;
};

var getOrigin = function getOrigin() {
  var location = window.location;

  /* istanbul ignore else */
  if (location.origin) {
    return location.origin;
  } else {
    return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
  }
};

var supported = 'srcdoc' in document.createElement('iframe');
var supportsSrcdoc = function supportsSrcdoc() {
  return supported;
};

var iframeContent = function iframeContent(id, targetOrigin) {
  return '<!DOCTYPE html>\n<html>\n  <head><meta charset=\'UTF-8\'></head>\n  <body style=\'margin:0;padding:0\'>\n  <script type=\'text/javascript\'>window.parent.postMessage(\'' + id + '_ready\', \'' + targetOrigin + '\');</script>\n  </body>\n</html>';
};

var createBaseIframe = function createBaseIframe() {
  var iframe = document.createElement('IFRAME');

  iframe.sandbox = 'allow-forms allow-popups allow-scripts allow-same-origin';
  iframe.style.margin = '0';
  iframe.style.padding = '0';
  iframe.style.border = 'none';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.position = 'absolute';

  return iframe;
};

var createIframe = function createIframe(placeholder, id) {
  return new Promise(function (resolve, reject) {
    var content = iframeContent(id, getOrigin());
    var iframe = void 0;

    /*
      NOTE: favor about:blank instead of srcdoc because some browsers
    */
    try {
      iframe = createBaseIframe();
      iframe.src = 'about:blank';
      placeholder.appendChild(iframe);
      getContentDocument(iframe).write(content);
    } catch (error) {
      placeholder.removeChild(iframe);

      if (supportsSrcdoc()) {
        iframe = createBaseIframe();
        iframe.src = 'about:srcdoc';
        iframe.srcdoc = content;
        placeholder.appendChild(iframe);
      } else {
        reject(error);
      }
    }

    var handleMessage = function handleMessage(_ref) {
      var data = _ref.data;

      /* istanbul ignore else */
      if (data === id + '_ready') {
        window.removeEventListener('message', handleMessage);
        resolve(iframe);
      }
    };

    window.addEventListener('message', handleMessage, false);
  });
};

/**
 * unique will create a unique string every time is called, sequentially and namespaced
 *
 * @ignore
 * @param {string} namespace
 */
var unique = function unique(namespace) {
  var count = -1;

  return function () {
    return namespace + '_' + ++count;
  };
};

var nextId = unique('videoAdContainer');
var hidden = Symbol('hidden');

/**
 * @class
 * @alias VideoAdContainer
 * @description This class provides everything necessary to contain and create a video ad within a given placeholder Element.
 */

var VideoAdContainer = function () {

  /**
   * Creates a VideoAdContainer.
   *
   * @param {HTMLDivElement} placeholder - DIV that will contain the ad.
   * @param {HTMLVideoElement} [videoElement] - optional videoElement that will be used to play the ad.
   */
  function VideoAdContainer(placeholder) {
    var videoElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    classCallCheck(this, VideoAdContainer);
    this[hidden] = {
      destroyed: false,
      iframe: null,
      readyPromise: null
    };

    if (!(placeholder instanceof Element)) {
      throw new TypeError('placeholder is not an Element');
    }

    this[hidden].id = nextId();
    this.element = createAdContainer();
    this.executionContext = null;

    this.isOriginalVideoElement = Boolean(videoElement);

    if (videoElement) {
      this.videoElement = videoElement;
    } else {
      this.videoElement = createAdVideoElement();
      this.element.appendChild(this.videoElement);
    }

    placeholder.appendChild(this.element);
  }

  /**
   * Adds the passed script to the ad container.
   *
   * @param {string} src - script source uri.
   * @param {Object} options - Options map.
   * @param {string} options.type - Defaults to 'text/javascript'.
   * @param {boolean} options.async - if "true" the "async" attribute is added to the new script. Defaults to false.
   * @param {boolean} options.defer - if "true" the "defer" attribute is added to the new script. Defaults to true.
   */


  createClass(VideoAdContainer, [{
    key: 'addScript',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(src) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var placeholder;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isDestroyed()) {
                  _context.next = 2;
                  break;
                }

                throw new Error('VideoAdContainer has been destroyed');

              case 2:
                if (this[hidden].iframe) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return createIframe(this.element, this[hidden].id);

              case 5:
                this[hidden].iframe = _context.sent;

                this.executionContext = this[hidden].iframe.contentWindow;

              case 7:
                placeholder = getContentDocument(this[hidden].iframe).body;
                return _context.abrupt('return', loadScript(src, _extends({
                  placeholder: placeholder
                }, options)));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addScript(_x2) {
        return _ref.apply(this, arguments);
      }

      return addScript;
    }()

    /**
     * Destroys the VideoAdContainer.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.element.parentNode.removeChild(this.element);
      this[hidden].destroyed = true;
    }

    /**
     * Checks if the container is destroyed.
     *
     * @returns {boolean} - true if the container is destroyed and false otherwise.
     */

  }, {
    key: 'isDestroyed',
    value: function isDestroyed() {
      return this[hidden].destroyed;
    }
  }]);
  return VideoAdContainer;
}();

/**
 * @function
 * @description VideoAdContainer factory method. Returns a VideoAdContainer instance that will contain the video ad.
 *
 * @ignore
 * @static
 * @param {HTMLElement} placeholder - Placeholder element that will contain the video ad.
 * @param {HTMLVideoElement} [videoElement] - optional videoElement that will be used to play the ad.
 *
 * @returns {VideoAdContainer} - Returns a `VideoAdContainer` instance.
 */
var createVideoAdContainer = function createVideoAdContainer(placeholder, videoElement) {
  if (!placeholder) {
    throw new TypeError('placeholder is required');
  }

  return new VideoAdContainer(placeholder, videoElement);
};

/* eslint-disable id-match*/
var guessMimeType = function guessMimeType(src) {
  var mimeMap = {
    '3gp': 'video/3gpp',
    avi: 'video/x-msvideo',
    flv: 'video/x-flv',
    m3u8: 'application/x-mpegURL',
    m4v: 'video/mp4',
    mov: 'video/quicktime',
    mp4: 'video/mp4',
    mpd: 'application/dash+xml',
    ogv: 'video/ogg',
    ts: 'video/MP2T',
    webm: 'video/webm',
    wmv: 'video/x-ms-wmv'
  };
  var match = src.match(/\.([^./?]+)(\?[^/]+)?$/i);
  var ext = match && match[1];

  return mimeMap[ext] || 'video/' + ext;
};

var canPlay = function canPlay(videoElement, mediaFile) {
  var src = mediaFile.src,
      type = mediaFile.type;


  return videoElement.canPlayType(type || guessMimeType(src));
};

var sortMediaByBestFit = function sortMediaByBestFit(mediaFiles, screenRect) {
  var screenWidth = screenRect.width;
  var compareTo = function compareTo(mediaFileA, mediaFileB) {
    var deltaA = Math.abs(screenWidth - (mediaFileA.width || 0));
    var deltaB = Math.abs(screenWidth - (mediaFileB.width || 0));

    return deltaA - deltaB;
  };

  return mediaFiles.slice(0).sort(compareTo);
};

var findBestMedia = function findBestMedia(inlineAd, videoElement, container) {
  var screenRect = container.getBoundingClientRect();
  var mediaFiles = getMediaFiles(inlineAd);

  if (mediaFiles) {
    var supportedMediaFiles = mediaFiles.filter(function (mediaFile) {
      return canPlay(videoElement, mediaFile);
    });
    var sortedMediaFiles = sortMediaByBestFit(supportedMediaFiles, screenRect);

    return sortedMediaFiles[0];
  }

  return null;
};

var once = function once(element, eventName, listener) {
  var handler = function handler() {
    element.removeEventListener(eventName, handler);

    return listener.apply(undefined, arguments);
  };

  element.addEventListener(eventName, handler);

  return function () {
    element.removeEventListener(eventName, handler);
  };
};

var progress$1 = linearEvents.progress;


var getProgressEvents = function getProgressEvents(vastChain) {
  return vastChain.map(function (_ref) {
    var ad = _ref.ad;
    return ad;
  }).reduce(function (accumulated, ad) {
    var events = getLinearTrackingEvents(ad, progress$1) || [];

    return [].concat(toConsumableArray(accumulated), toConsumableArray(events));
  }, []).map(function (_ref2) {
    var offset = _ref2.offset,
        uri = _ref2.uri;
    return {
      offset: offset,
      uri: uri
    };
  });
};

var safeCallback = function safeCallback(callback, logger) {
  return function () {
    try {
      // eslint-disable-next-line callback-return, promise/prefer-await-to-callbacks
      callback.apply(undefined, arguments);
    } catch (error) {
      if (logger) {
        logger.error(error);
      }
    }
  };
};

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var fullscreenElement = function fullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
};

var fullscreen$1 = linearEvents.fullscreen,
    exitFullscreen$1 = linearEvents.exitFullscreen,
    playerCollapse$1 = linearEvents.playerCollapse,
    playerExpand$1 = linearEvents.playerExpand;


var onFullscreenChange = function onFullscreenChange(_ref, callback) {
  var videoElement = _ref.videoElement;

  var fullscreenEvtNames = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];
  var fullscreenOn = false;
  var fullscreenchangeHandler = function fullscreenchangeHandler() {
    if (fullscreenElement() === videoElement) {
      fullscreenOn = true;
      callback(playerExpand$1);
      callback(fullscreen$1);
    } else if (fullscreenOn) {
      fullscreenOn = false;
      callback(playerCollapse$1);
      callback(exitFullscreen$1);
    }
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fullscreenEvtNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var event = _step.value;

      document.addEventListener(event, fullscreenchangeHandler);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return function () {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = fullscreenEvtNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _event = _step2.value;

        document.removeEventListener(_event, fullscreenchangeHandler);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };
};

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var pause$1 = linearEvents.pause,
    resume$1 = linearEvents.resume;


var onPlayPause = function onPlayPause(_ref, callback) {
  var videoElement = _ref.videoElement;

  var started = false;
  var paused = true;

  var playHandler = function playHandler() {
    if (!started) {
      started = true;
      paused = false;
    } else if (paused) {
      paused = false;
      callback(resume$1);
    }
  };

  var pauseHandler = function pauseHandler() {
    if (!paused) {
      paused = true;
      callback(pause$1);
    }
  };

  videoElement.addEventListener('play', playHandler);
  videoElement.addEventListener('pause', pauseHandler);

  return function () {
    videoElement.removeEventListener('play', playHandler);
    videoElement.removeEventListener('pause', pauseHandler);
  };
};

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var rewind$1 = linearEvents.rewind;

var onRewind = function onRewind(_ref, callback) {
  var videoElement = _ref.videoElement;

  var currentTime = videoElement.currentTime;

  var timeupdateHandler = function timeupdateHandler() {
    var delta = videoElement.currentTime - currentTime;

    if (delta < 0 && Math.abs(delta) >= 1) {
      callback(rewind$1);
    }

    currentTime = videoElement.currentTime;
  };

  videoElement.addEventListener('timeupdate', timeupdateHandler);

  return function () {
    videoElement.removeEventListener('timeupdate', timeupdateHandler);
  };
};

/* eslint-disable callback-return, promise/prefer-await-to-callbacks */

var skip$1 = linearEvents.skip;

var createDefaultSkipControl = function createDefaultSkipControl() {
  var skipBtn = document.createElement('BUTTON');

  skipBtn.classList.add('mol-vast-skip-control');
  skipBtn.type = 'button';
  skipBtn.innerHTML = 'skip';
  skipBtn.style.position = 'absolute';
  skipBtn.style.bottom = '15px';
  skipBtn.style.right = '15px';

  return skipBtn;
};

var onSkip = function onSkip(videoAdContainer, callback) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      skipoffset = _ref.skipoffset,
      _ref$createSkipContro = _ref.createSkipControl,
      createSkipControl = _ref$createSkipContro === undefined ? createDefaultSkipControl : _ref$createSkipContro;

  if (!Boolean(skipoffset)) {
    return function () {};
  }

  var skipControl = void 0;
  var videoElement = videoAdContainer.videoElement,
      element = videoAdContainer.element;


  var skipHandler = function skipHandler() {
    var currentTimeMs = videoElement.currentTime * 1000;

    if (!Boolean(skipControl) && currentTimeMs >= skipoffset) {
      skipControl = createSkipControl();

      skipControl.onclick = function (event) {
        if (Event.prototype.stopPropagation !== undefined) {
          event.stopPropagation();
        }

        callback(skip$1);

        return false;
      };

      element.appendChild(skipControl);
      videoElement.removeEventListener('timeupdate', skipHandler);
    }
  };

  videoElement.addEventListener('timeupdate', skipHandler);

  return function () {
    videoElement.removeEventListener('timeupdate', skipHandler);
    if (Boolean(skipControl)) {
      element.removeChild(skipControl);
    }
  };
};

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var error$1 = linearEvents.error;


var onError = function onError(_ref, callback) {
  var videoElement = _ref.videoElement;

  var errorHandler = function errorHandler() {
    callback(error$1, videoElement.error);
  };

  videoElement.addEventListener('error', errorHandler);

  return function () {
    videoElement.removeEventListener('error', errorHandler);
  };
};

/**
 * Fires when the adUnit's volume has changed.
 *
 * @event VideoAdUnit#volumeChanged
 */
var volumeChanged = 'volumeChanged';

/**
 * Fires when the adUnit's has finished.
 *
 * @event VideoAdUnit#finish
 */
var finish = 'finish';

/**
 * fires on ad progress.
 *
 * @event VideoAdUnit#adProgress
 */
var adProgress = 'adProgress';

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var complete$1 = linearEvents.complete,
    firstQuartile$1 = linearEvents.firstQuartile,
    midpoint$1 = linearEvents.midpoint,
    start$1 = linearEvents.start,
    thirdQuartile$1 = linearEvents.thirdQuartile;

var percentageProgress = function percentageProgress(currentTime, duration) {
  return currentTime * 100 / duration;
};
var isPassFirstQuartile = function isPassFirstQuartile(currentTime, duration) {
  return percentageProgress(currentTime, duration) >= 25;
};
var isPassMidPoint = function isPassMidPoint(currentTime, duration) {
  return percentageProgress(currentTime, duration) >= 50;
};
var isPassThirdQuartile = function isPassThirdQuartile(currentTime, duration) {
  return percentageProgress(currentTime, duration) >= 75;
};
var isCompleted = function isCompleted(currentTime, duration) {
  return percentageProgress(currentTime, duration) >= 99;
};

// TODO: implement logic to track `timeSpentViewing` linear event

var onTimeUpdate = function onTimeUpdate(_ref, callback) {
  var videoElement = _ref.videoElement;

  var started = false;
  var passFirstQuartile = false;
  var passMidPoint = false;
  var passThirdQuartile = false;
  var completed = false;

  // eslint-disable-next-line complexity
  var timeupdateHandler = function timeupdateHandler() {
    var duration = videoElement.duration;
    var currentTime = videoElement.currentTime;

    if (!started && currentTime > 0) {
      started = true;
      callback(start$1);
    } else if (!passFirstQuartile) {
      if (isPassFirstQuartile(currentTime, duration)) {
        passFirstQuartile = true;
        callback(firstQuartile$1);
      }
    } else if (!passMidPoint) {
      if (isPassMidPoint(currentTime, duration)) {
        passMidPoint = true;
        callback(midpoint$1);
      }
    } else if (!passThirdQuartile) {
      if (isPassThirdQuartile(currentTime, duration)) {
        passThirdQuartile = true;
        callback(thirdQuartile$1);
      }
    } else if (!completed) {
      if (isCompleted(currentTime, duration)) {
        completed = true;
        callback(complete$1);
      }
    }

    callback(adProgress);
  };

  var endedHandler = function endedHandler() {
    var duration = videoElement.duration;
    var currentTime = videoElement.currentTime;

    if (!completed && isCompleted(currentTime, duration)) {
      completed = true;
      callback(complete$1);
    }

    videoElement.removeEventListener('ended', endedHandler);
    videoElement.removeEventListener('timeupdate', timeupdateHandler);
  };

  videoElement.addEventListener('timeupdate', timeupdateHandler);
  videoElement.addEventListener('ended', endedHandler);

  return function () {
    videoElement.removeEventListener('timeupdate', timeupdateHandler);
    videoElement.removeEventListener('ended', endedHandler);
  };
};

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var mute$1 = linearEvents.mute,
    unmute$1 = linearEvents.unmute;

var isMuted = function isMuted(videoElement) {
  return videoElement.muted || videoElement.volume === 0;
};

var onVolumeChange = function onVolumeChange(_ref, callback) {
  var videoElement = _ref.videoElement;

  var wasMuted = isMuted(videoElement);

  var volumechangeHandler = function volumechangeHandler() {
    callback(volumeChanged);

    if (wasMuted && !isMuted(videoElement)) {
      callback(unmute$1);
    } else if (!wasMuted && isMuted(videoElement)) {
      callback(mute$1);
    }

    wasMuted = isMuted(videoElement);
  };

  videoElement.addEventListener('volumechange', volumechangeHandler);

  return function () {
    videoElement.removeEventListener('volumechange', volumechangeHandler);
  };
};

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var impression$1 = linearEvents.impression;


var onImpression = function onImpression(_ref, callback) {
  var videoElement = _ref.videoElement;

  var impressionHandler = function impressionHandler() {
    var currentTime = videoElement.currentTime;

    if (currentTime >= 2) {
      callback(impression$1);
      videoElement.removeEventListener('timeupdate', impressionHandler);
    }
  };

  videoElement.addEventListener('timeupdate', impressionHandler);

  return function () {
    videoElement.removeEventListener('timeupdate', impressionHandler);
  };
};

var toFixedDigits = function toFixedDigits(num, digits) {
  var formattedNum = String(num);

  while (formattedNum.length < digits) {
    formattedNum = '0' + formattedNum;
  }

  return formattedNum;
};

var formatProgress = function formatProgress(progress) {
  var hours = Math.floor(progress / (60 * 60 * 1000));
  var minutes = Math.floor(progress / (60 * 1000) % 60);
  var seconds = Math.floor(progress / 1000 % 60);
  var ms = progress % 1000;

  return toFixedDigits(hours, 2) + ':' + toFixedDigits(minutes, 2) + ':' + toFixedDigits(seconds, 2) + '.' + toFixedDigits(ms, 3);
};

/* eslint-disable promise/prefer-await-to-callbacks, callback-return */

var progress$2 = linearEvents.progress;

var secondsToMilliseconds = function secondsToMilliseconds(seconds) {
  return seconds * 1000;
};
var isPercentage$1 = function isPercentage(offset) {
  var percentageRegex = /^\d+(\.\d+)?%$/g;

  return percentageRegex.test(offset) && !isNaN(parseFloat(offset));
};

var isValid = function isValid(_ref) {
  var offset = _ref.offset,
      uri = _ref.uri;

  var offsetIsValid = typeof offset === 'number' || isPercentage$1(offset);
  var uriIsValid = typeof uri === 'string' && uri.length > 0;

  return offsetIsValid && uriIsValid;
};

var offsetToMs = function offsetToMs(offset, durationInMs) {
  if (typeof offset === 'number') {
    return offset;
  }

  return parseFloat(offset) / 100 * durationInMs;
};

var onProgress = function onProgress(_ref2, callback) {
  var videoElement = _ref2.videoElement;

  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$progressEvents = _ref3.progressEvents,
      progressEvents = _ref3$progressEvents === undefined ? [] : _ref3$progressEvents;

  var duration = videoElement.duration;

  var durationInMs = secondsToMilliseconds(duration);
  var playedMs = 0;
  var previousCurrentTime = secondsToMilliseconds(videoElement.currentTime);
  var pendingEvents = progressEvents.filter(isValid).map(function (_ref4) {
    var offset = _ref4.offset,
        uri = _ref4.uri;
    return {
      offset: offsetToMs(offset, durationInMs),
      uri: uri
    };
  });

  var progressHandler = function progressHandler() {
    var currentTime = videoElement.currentTime;

    var delta = Math.abs(currentTime - previousCurrentTime);

    playedMs += secondsToMilliseconds(delta);
    previousCurrentTime = currentTime;

    var _pendingEvents$reduce = pendingEvents.reduce(function (accumulator, event) {
      var offset = event.offset;


      if (playedMs >= offset) {
        accumulator.toCall.push(event);
      } else {
        accumulator.stillPending.push(event);
      }

      return accumulator;
    }, {
      stillPending: [],
      toCall: []
    }),
        stillPending = _pendingEvents$reduce.stillPending,
        toCall = _pendingEvents$reduce.toCall;

    pendingEvents = stillPending;
    toCall.forEach(function (_ref5) {
      var uri = _ref5.uri;

      callback(progress$2, {
        contentplayhead: formatProgress(playedMs),
        progressUri: uri
      });
    });

    if (pendingEvents.length === 0) {
      videoElement.removeEventListener('timeupdate', progressHandler);
    }
  };

  if (pendingEvents.length > 0) {
    videoElement.addEventListener('timeupdate', progressHandler);
  }

  return function () {
    videoElement.removeEventListener('timeupdate', progressHandler);
  };
};

/* eslint-disable callback-return, promise/prefer-await-to-callbacks */

var clickThrough$1 = linearEvents.clickThrough;


var onClickThrough = function onClickThrough(_ref, callback) {
  var videoElement = _ref.videoElement,
      element = _ref.element;

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      clickThroughUrl = _ref2.clickThroughUrl;

  var placeholder = element || videoElement.parentNode;
  var anchor = document.createElement('A');

  anchor.classList.add('mol-vast-clickthrough');
  anchor.style.width = '100%';
  anchor.style.height = '100%';
  anchor.style.position = 'absolute';
  anchor.style.left = 0;
  anchor.style.top = 0;

  if (clickThroughUrl) {
    anchor.href = clickThroughUrl;
    anchor.target = '_blank';
  }

  anchor.onclick = function (event) {
    if (Event.prototype.stopPropagation !== undefined) {
      event.stopPropagation();
    }

    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();

      callback(clickThrough$1);
    }
  };

  placeholder.appendChild(anchor);

  return function () {
    return placeholder.removeChild(anchor);
  };
};

/* eslint-disable import/max-dependencies */

var handlers = [onClickThrough, onError, onFullscreenChange, onImpression, onPlayPause, onProgress, onRewind, onSkip, onTimeUpdate, onVolumeChange];

/* eslint-disable promise/prefer-await-to-callbacks */

var setupMetricHandlers = function setupMetricHandlers(_ref, callback) {
  var vastChain = _ref.vastChain,
      videoAdContainer = _ref.videoAdContainer,
      hooks = _ref.hooks;

  var inlineAd = vastChain[0].ad;
  var skipoffset = getSkipOffset(inlineAd);
  var clickThroughUrl = getClickThrough(inlineAd);
  var progressEvents = getProgressEvents(vastChain);
  var data = _extends({
    clickThroughUrl: clickThroughUrl,
    progressEvents: progressEvents,
    skipoffset: skipoffset
  }, hooks);

  var stopHandlersFns = handlers.map(function (handler) {
    return safeCallback(handler(videoAdContainer, callback, data));
  });

  return function () {
    return stopHandlersFns.forEach(function (disconnect) {
      return disconnect();
    });
  };
};

var updateMedia = function updateMedia(videoElement, media) {
  return new Promise(function (resolve) {
    var state = {
      currentTime: videoElement.currentTime,
      playing: !videoElement.paused
    };

    if (state.playing) {
      videoElement.pause();
    }

    videoElement.src = media.src;
    videoElement.load();

    once(videoElement, 'loadeddata', function () {
      videoElement.currentTime = state.currentTime;

      if (state.playing) {
        videoElement.play();
      }

      resolve();
    });
  });
};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce = debounce;

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

/* eslint-disable promise/prefer-await-to-callbacks */

var validate = function validate(target, callback) {
  if (!(target instanceof Element)) {
    throw new TypeError('Target is not an Element node');
  }

  if (!(callback instanceof Function)) {
    throw new TypeError('Callback is not a function');
  }
};
var noop = function noop() {};
var sizeMutationAttrs = ['style', 'clientWidth', 'clientHeight'];
var createResizeMO = function createResizeMO(target, callback) {
  var observer = new MutationObserver(function (mutations) {
    for (var index = 0; index < mutations.length; index++) {
      var attributeName = mutations[index].attributeName;


      if (sizeMutationAttrs.includes(attributeName)) {
        // eslint-disable-next-line callback-return
        callback();
      }
    }
  });

  observer.observe(target, {
    attributes: true,
    characterData: false,
    childList: true
  });

  return observer;
};
var mutationHandlers = Symbol('mutationHandlers');
var observerKey = Symbol('mutationObserver');
var onMutation = function onMutation(target, callback) {
  if (!target[mutationHandlers]) {
    target[mutationHandlers] = [];

    var execHandlers = function execHandlers() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (target[mutationHandlers]) {
        target[mutationHandlers].forEach(function (handler) {
          return handler.apply(undefined, args);
        });
      }
    };

    target[observerKey] = createResizeMO(target, execHandlers);
  }

  target[mutationHandlers].push(callback);

  return function () {
    target[mutationHandlers] = target[mutationHandlers].filter(function (handler) {
      return handler !== callback;
    });

    if (target[mutationHandlers].length === 0) {
      target[observerKey].disconnect();

      delete target[mutationHandlers];
      delete target[observerKey];
    }
  };
};

var createResizeObjElement = function createResizeObjElement(callback) {
  var obj = document.createElement('object');

  // eslint-disable-next-line max-len
  obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
  obj.onload = function () {
    if (this.contentWindow) {
      this.contentWindow.addEventListener('resize', callback);
    }
  };
  obj.type = 'text/html';
  obj.data = 'about:blank';

  return obj;
};
var resizeHandlers = Symbol('resizeHandlers');
var resizeObject = Symbol('resizeObj');

// Original code http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
var onResize = function onResize(target, callback) {
  if (!target[resizeHandlers]) {
    target[resizeHandlers] = [];
    var execHandlers = function execHandlers() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (target[resizeHandlers]) {
        target[resizeHandlers].forEach(function (handler) {
          return handler.apply(undefined, args);
        });
      }
    };

    target[resizeObject] = createResizeObjElement(execHandlers);

    if (getComputedStyle(target).position === 'static') {
      target.style.position = 'relative';
    }

    target.appendChild(target[resizeObject]);
  }

  target[resizeHandlers].push(callback);

  return function () {
    target[resizeHandlers] = target[resizeHandlers].filter(function (handler) {
      return handler !== callback;
    });

    if (target[resizeHandlers].length === 0) {
      target.removeChild(target[resizeObject]);
      delete target[resizeHandlers];
      delete target[resizeObject];
    }
  };
};

var onElementResize = function onElementResize(target, callback) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 20 : _ref$threshold;

  validate(target, callback);

  var makeSizeId = function makeSizeId(_ref2) {
    var style = _ref2.style,
        clientHeight = _ref2.clientHeight,
        clientWidth = _ref2.clientWidth;
    return [style.width, style.height, clientWidth, clientHeight].join('.');
  };
  var lastSize = makeSizeId(target);
  var checkElementSize = function checkElementSize() {
    var currentSize = makeSizeId(target);

    if (currentSize !== lastSize) {
      lastSize = currentSize;
      // eslint-disable-next-line callback-return
      callback();
    }
  };

  var checkElementHandler = lodash_debounce(checkElementSize, threshold);
  var stopObservingMutations = Boolean(MutationObserver) ? onMutation(target, checkElementHandler) : noop;
  var stopListeningToResize = onResize(target, checkElementHandler);

  return function () {
    stopObservingMutations();
    stopListeningToResize();
  };
};

var isElementVisible = function isElementVisible(element) {
  var viewabilityOffsetFraction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var _element$getBoundingC = element.getBoundingClientRect(),
      height = _element$getBoundingC.height,
      width = _element$getBoundingC.width,
      top = _element$getBoundingC.top,
      right = _element$getBoundingC.right,
      bottom = _element$getBoundingC.bottom,
      left = _element$getBoundingC.left;

  if (!height || !width) {
    return false;
  }

  var verticalOffset = height * (1 - viewabilityOffsetFraction);
  var horizontalOffset = width * (1 - viewabilityOffsetFraction);
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  return !document.hidden && top + verticalOffset >= 0 && bottom - verticalOffset <= viewportHeight && left + horizontalOffset >= 0 && right - horizontalOffset <= viewportWidth;
};

/* eslint-disable promise/prefer-await-to-callbacks */

var elementEntries = [];

var checkIsVisible = function checkIsVisible(entry) {
  var element = entry.element,
      callback = entry.callback,
      lastInViewport = entry.lastInViewport,
      viewportOffset = entry.viewportOffset;

  var isInViewport = isElementVisible(element, viewportOffset);

  if (isInViewport !== lastInViewport) {
    entry.lastInViewport = isInViewport;

    // eslint-disable-next-line callback-return
    callback(isInViewport);
  }
};

var checkVisibility = function checkVisibility() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elementEntries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      checkIsVisible(entry);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var validate$1 = function validate(target, callback) {
  if (!(target instanceof Element)) {
    throw new TypeError('Target is not an Element node');
  }

  if (!(callback instanceof Function)) {
    throw new TypeError('Callback is not a function');
  }
};

var onElementVisibilityChange = function onElementVisibilityChange(target, callback) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 100 : _ref$threshold,
      _ref$scrollableElemen = _ref.scrollableElement,
      scrollableElement = _ref$scrollableElemen === undefined ? window : _ref$scrollableElemen,
      _ref$viewabilityOffse = _ref.viewabilityOffset,
      viewabilityOffset = _ref$viewabilityOffse === undefined ? 0.4 : _ref$viewabilityOffse;

  validate$1(target, callback);

  var viewportEventHandler = threshold > 0 ? lodash_debounce(checkVisibility) : checkVisibility;

  var entry = {
    callback: callback,
    element: target,
    lastInViewport: false,
    scrollableElement: scrollableElement,
    viewabilityOffset: viewabilityOffset
  };

  checkIsVisible(entry);
  elementEntries.push(entry);

  scrollableElement.addEventListener('scroll', viewportEventHandler);

  if (elementEntries.length === 1) {
    window.addEventListener('resize', viewportEventHandler);
    window.addEventListener('orientationchange', viewportEventHandler);
    document.addEventListener('visibilitychange', viewportEventHandler);
  }

  return function () {
    elementEntries = elementEntries.filter(function (elementEntry) {
      return elementEntry !== entry;
    });

    if (elementEntries.length === 0) {
      window.removeEventListener('resize', viewportEventHandler);
      window.removeEventListener('orientationchange', viewportEventHandler);
      document.removeEventListener('visibilitychange', viewportEventHandler);
    }

    if (elementEntries.every(function (elementEntry) {
      return elementEntry.scrollableElement !== scrollableElement;
    })) {
      scrollableElement.removeEventListener('scroll', viewportEventHandler);
    }
  };
};

var preventManualProgress = function preventManualProgress(videoElement) {
  // IOS video clock is very unreliable and we need a 3 seconds threshold to ensure that the user forwarded/rewound the ad
  var PROGRESS_THRESHOLD = 3;
  var previousTime = 0;
  var skipAttempts = 0;

  var preventAdSkip = function preventAdSkip() {
    // Ignore ended event if the Ad time was not 'near' the end
    // and revert time to the previous 'valid' time
    if (videoElement.duration - previousTime > PROGRESS_THRESHOLD) {
      // this reduces the video jitter if the IOS skip button is pressed
      videoElement.pause();

      // we need to trigger the play to put the video element back in a valid state
      videoElement.play();
      videoElement.currentTime = previousTime;
    }
  };

  var preventAdSeek = function preventAdSeek() {
    var currentTime = videoElement.currentTime;
    var progressDelta = Math.abs(currentTime - previousTime);

    if (progressDelta > PROGRESS_THRESHOLD) {
      skipAttempts += 1;
      if (skipAttempts >= 2) {
        videoElement.pause();
      }
      videoElement.currentTime = previousTime;
    } else {
      previousTime = currentTime;
    }
  };

  videoElement.addEventListener('timeupdate', preventAdSeek);
  videoElement.addEventListener('ended', preventAdSkip);

  return function () {
    videoElement.removeEventListener('timeupdate', preventAdSeek);
    videoElement.removeEventListener('ended', preventAdSkip);
  };
};

/* eslint-disable filenames/match-exported */
/**
 * @class
 * @description Subset of  node's [Emitter class]{@link https://nodejs.org/api/events.html#events_class_eventemitter}
 * @param {Object} logger - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 */
var Emitter = function () {
  function Emitter(logger) {
    classCallCheck(this, Emitter);

    this.evts = {};
    this.logger = logger || console;
  }

  /**
   * Adds the listener function to the end of the listeners array for the event named eventName.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - Listener fn that handles the evt.
   * @returns {Emitter} - The Emitter instance.
   */


  createClass(Emitter, [{
    key: "on",
    value: function on(eventName, listener) {
      var evts = this.evts;
      var evtListeners = evts[eventName] || (evts[eventName] = []);

      evtListeners.push(listener);

      return this;
    }

    /**
     * Removes the specified listener from the listener array for the event named eventName.
     *
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - Listener fn that handles the evt.
     * @returns {Emitter} - The Emitter instance.
     */

  }, {
    key: "removeListener",
    value: function removeListener(eventName, listener) {
      var evts = this.evts;
      var evtListeners = evts[eventName] || (evts[eventName] = []);

      evts[eventName] = evtListeners.filter(function (eListener) {
        return eListener !== listener && eListener._ !== listener;
      });

      return this;
    }

    /**
     * Removes all listeners, or those of the specified eventName.
     *
     * @param {string} eventName - The name of the event. Optional if omitted all listeners will be removed.
     * @returns {Emitter} - The Emitter instance.
     */

  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(eventName) {
      if (eventName) {
        this.evts[eventName] = null;
      } else {
        this.evts = {};
      }

      return this;
    }

    /**
     * Adds a one time listener function for the event named eventName. The next time eventName is triggered,
     * this listener is removed and then invoked.
     *
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - Listener fn that handles the evt.
     * @returns {Emitter} - The Emitter instance.
     */

  }, {
    key: "once",
    value: function once(eventName, listener) {
      var _this = this;

      var handler = function handler() {
        _this.removeListener(eventName, handler);
        listener.apply(undefined, arguments);
      };

      handler._ = listener;

      return this.on(eventName, handler);
    }

    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered,
     * passing the supplied arguments to each.
     *
     * @param {string} eventName - The name of the event.
     * @returns {boolean} - Returns true if the event had listeners, false otherwise.
     */

  }, {
    key: "emit",
    value: function emit(eventName) {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var evts = this.evts;
      var evtListeners = evts[eventName] || (evts[eventName] = []);
      var hasListeners = evtListeners.length > 0;

      evtListeners.forEach(function (handler) {
        try {
          handler.apply(undefined, args);
        } catch (error) {
          _this2.logger.error(error, error.stack);
        }
      });

      return hasListeners;
    }
  }]);
  return Emitter;
}();

var getResource = function getResource() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      staticResource = _ref.staticResource,
      htmlResource = _ref.htmlResource,
      iFrameResource = _ref.iFrameResource;

  return staticResource || htmlResource || iFrameResource;
};

var UNKNOWN = 'UNKNOWN';
var uniqBy = function uniqBy(array, uniqValue) {
  var seen = {};

  return array.filter(function (item) {
    var key = uniqValue(item);

    if (seen.hasOwnProperty(key)) {
      return false;
    }

    seen[key] = true;

    return true;
  });
};

var uniqByResource = function uniqByResource(icons) {
  return uniqBy(icons, getResource);
};

var groupIconsByProgram = function groupIconsByProgram(icons) {
  return icons.reduce(function (accumulator, icon) {
    var _icon$program = icon.program,
        program = _icon$program === undefined ? UNKNOWN : _icon$program;


    if (!accumulator[program]) {
      accumulator[program] = [];
    }

    accumulator[program].push(icon);

    return accumulator;
  }, {});
};

var sortIconByBestPxratio = function sortIconByBestPxratio(icons) {
  var devicePixelRatio = window.devicePixelRatio || 0;

  var compareTo = function compareTo(iconA, iconB) {
    var deltaA = Math.abs(devicePixelRatio - (iconA.pxratio || 0));
    var deltaB = Math.abs(devicePixelRatio - (iconB.pxratio || 0));

    return deltaA - deltaB;
  };

  return icons.slice(0).sort(compareTo);
};

var chooseByPxRatio = function chooseByPxRatio(icons) {
  if (icons.length === 1) {
    return icons[0];
  }

  return sortIconByBestPxratio(icons)[0];
};

var chooseIcons = function chooseIcons(icons) {
  var byProgram = groupIconsByProgram(icons);
  var programs = Object.keys(byProgram);

  return programs.reduce(function (accumulator, program) {
    if (program === UNKNOWN) {
      return [].concat(toConsumableArray(accumulator), toConsumableArray(byProgram[UNKNOWN]));
    }

    return [].concat(toConsumableArray(accumulator), [chooseByPxRatio(byProgram[program])]);
  }, []);
};

var retrieveIcons = function retrieveIcons(vastChain) {
  var ads = vastChain.map(function (_ref) {
    var ad = _ref.ad;
    return ad;
  });
  var icons = ads.reduce(function (accumulator, ad) {
    return [].concat(toConsumableArray(accumulator), toConsumableArray(getIcons(ad) || []));
  }, []);

  if (icons.length > 0) {
    var uniqIcons = uniqByResource(icons);

    return chooseIcons(uniqIcons);
  }

  return null;
};

var Deferred = function Deferred() {
  var _this = this;

  classCallCheck(this, Deferred);

  this.promise = new Promise(function (resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  });
};

var waitFor = function waitFor(element, event) {
  var pending = true;

  var _ref = new Deferred(),
      promise = _ref.promise,
      reject = _ref.reject,
      resolve = _ref.resolve;

  var cancelOnce = once(element, event, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    pending = false;
    resolve(args);
  });
  var cancel = function cancel() {
    if (pending) {
      pending = false;
      cancelOnce();
      reject(new Error('waitFor was canceled'));
    }
  };

  return {
    cancel: cancel,
    promise: promise
  };
};

(function(self) {

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    };

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue+','+value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) { items.push(name); });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) { items.push(value); });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) { items.push([name, value]); });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

var _this = undefined;

var isValidContentType = function isValidContentType(contentType) {
  var normalisedCT = contentType.toLowerCase();

  return ['text/plain', 'text/html'].some(function (allowedType) {
    return normalisedCT.includes(allowedType);
  });
};

var fetchHtml = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(endpoint) {
    var response, contentType, error, _error;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(endpoint);

          case 2:
            response = _context.sent;
            contentType = response.headers.get('Content-Type');

            if (!(response.status >= 400)) {
              _context.next = 8;
              break;
            }

            error = new Error(response.statusText);


            error.response = response;
            throw error;

          case 8:
            if (isValidContentType(contentType)) {
              _context.next = 12;
              break;
            }

            _error = new Error('fetchHtml error, invalid Content-Type ' + contentType);


            _error.response = response;
            throw _error;

          case 12:
            return _context.abrupt('return', response.text());

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function fetchHtml(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createHtmlResource = function createHtmlResource(src, _ref) {
  var document = _ref.document,
      data = _ref.data;
  var height = data.height,
      width = data.width;

  var divElement = document.createElement('DIV');

  if (width) {
    divElement.style.width = width + 'px';
  }

  if (height) {
    divElement.style.height = height + 'px';
  }

  fetchHtml(src)
  // eslint-disable-next-line promise/always-return, promise/prefer-await-to-then
  .then(function (html) {
    divElement.innerHTML = html;

    divElement.dispatchEvent(new CustomEvent('load'));
  }).catch(function () {
    divElement.dispatchEvent(new CustomEvent('error'));
  });

  return divElement;
};

var createIframeResource = function createIframeResource(src, _ref) {
  var document = _ref.document,
      data = _ref.data;
  var height = data.height,
      width = data.width;

  var iframeElement = document.createElement('IFRAME');

  iframeElement.src = src;
  iframeElement.sandbox = 'allow-forms allow-popups allow-scripts';

  if (width) {
    iframeElement.width = width;
  }

  if (height) {
    iframeElement.height = height;
  }

  iframeElement.src = src;

  iframeElement.frameBorder = 0;
  iframeElement.style.border = 'none';

  return iframeElement;
};

var createStaticResource = function createStaticResource(src, _ref) {
  var document = _ref.document,
      data = _ref.data;
  var height = data.height,
      width = data.width;

  var img = document.createElement('IMG');

  if (width) {
    img.width = width;
  }

  if (height) {
    img.height = height;
  }

  img.src = src;

  return img;
};

var createResource = function createResource(document, data) {
  var staticResource = data.staticResource,
      htmlResource = data.htmlResource,
      iFrameResource = data.iFrameResource;


  if (Boolean(staticResource)) {
    return createStaticResource(staticResource, {
      data: data,
      document: document
    });
  }

  if (Boolean(htmlResource)) {
    return createHtmlResource(htmlResource, {
      data: data,
      document: document
    });
  }

  return createIframeResource(iFrameResource, {
    data: data,
    document: document
  });
};

/* eslint-disable promise/prefer-await-to-then, promise/always-return */

var noop$1 = function noop() {};
var loadResource = function loadResource(icon, _ref) {
  var document = _ref.document,
      placeholder = _ref.placeholder;
  return new Promise(function (resolve, reject) {
    try {
      var resourceElement = createResource(document, icon);
      var resourceErrorWait = waitFor(resourceElement, 'error');
      var resourceLoadWait = waitFor(resourceElement, 'load');
      var cleanUp = function cleanUp() {
        if (placeholder.contains(resourceElement)) {
          placeholder.removeChild(resourceElement);
          resourceElement.style.zIndex = 0;
        }
      };

      resourceErrorWait.promise.then(function () {
        resourceLoadWait.cancel();
        cleanUp();

        reject(new Error('Error loading resource'));
      }).catch(noop$1);

      resourceLoadWait.promise.then(function () {
        resourceErrorWait.cancel();
        cleanUp();

        resolve(resourceElement);
      }).catch(noop$1);

      // Some browsers will not load the resource if they are not added to the DOM
      resourceElement.style.zIndex = -9999;
      placeholder.appendChild(resourceElement);
    } catch (error) {
      reject(error);
    }
  });
};

var isCustomXposition = function isCustomXposition(xPosition) {
  return !['left', 'right'].includes(String(xPosition).toLowerCase());
};
var isCustomYPosition = function isCustomYPosition(yPosition) {
  return !['top', 'bottom'].includes(String(yPosition).toLowerCase());
};
var calculateIconLeft = function calculateIconLeft(dynamicPos, iconWidth, drawnIcons, phWidth) {
  var drawnIconsWidth = drawnIcons.reduce(function (accumulator, icon) {
    return accumulator + icon.width + 1;
  }, 0);

  if (dynamicPos === 'left') {
    return drawnIconsWidth;
  }

  return phWidth - drawnIconsWidth - iconWidth;
};

var calculateIconTop = function calculateIconTop(dynamicPos, iconHeight, phHeight) {
  if (dynamicPos === 'top') {
    return 0;
  }

  return phHeight - iconHeight;
};

var updateIcon = function updateIcon(icon, iconElement, _ref) {
  var drawnIcons = _ref.drawnIcons,
      placeholder = _ref.placeholder;

  var oldSignature = icon.signature;
  var rect = iconElement.getBoundingClientRect();
  var phRect = placeholder.getBoundingClientRect();
  var width = icon.width || rect.width;
  var height = icon.height || rect.height;
  var xPosition = icon.xPosition || 'right';
  var yPosition = icon.yPosition || 'top';
  var left = void 0;
  var top = void 0;

  if (isCustomXposition(xPosition)) {
    left = xPosition;
  } else {
    var icons = drawnIcons.filter(function (dIcon) {
      return dIcon.xPosition === xPosition && dIcon.yPosition === yPosition;
    });

    left = calculateIconLeft(xPosition, width, icons, phRect.width);
  }
  if (isCustomYPosition(yPosition)) {
    top = yPosition;
  } else {
    top = calculateIconTop(yPosition, height, phRect.height);
  }

  var signature = left + '-' + top + '_' + width + 'x' + height;

  return Object.assign(icon, {
    height: height,
    left: left,
    signature: signature,
    top: top,
    updated: oldSignature !== signature,
    width: width
  });
};

/* eslint-disable no-shadow */
var calculateArea = function calculateArea(_ref) {
  var height = _ref.height,
      width = _ref.width;
  return height * width;
};

var hasSpace = function hasSpace(newIcon, config) {
  var drawnIcons = config.drawnIcons,
      placeholder = config.placeholder;

  var placeholderArea = calculateArea(placeholder.getBoundingClientRect());
  var iconArea = calculateArea(newIcon);
  var usedIconsArea = drawnIcons.reduce(function (accumulator, icon) {
    return accumulator + calculateArea(icon);
  }, 0);

  return iconArea + usedIconsArea <= placeholderArea * 0.35;
};

var withinBoundaries = function withinBoundaries(newIcon, _ref2) {
  var placeholder = _ref2.placeholder;

  var phRect = placeholder.getBoundingClientRect();

  return newIcon.left >= 0 && newIcon.left + newIcon.width <= phRect.width && newIcon.top >= 0 && newIcon.top + newIcon.height <= phRect.height;
};

var right = function right(_ref3) {
  var left = _ref3.left,
      width = _ref3.width;
  return left + width;
};
var left = function left(_ref4) {
  var left = _ref4.left;
  return left;
};
var top = function top(_ref5) {
  var top = _ref5.top;
  return top;
};
var bottom = function bottom(_ref6) {
  var top = _ref6.top,
      height = _ref6.height;
  return top + height;
};
var overlap = function overlap(newIcon, drawnIcon) {
  if (left(newIcon) > right(drawnIcon) || right(newIcon) < left(drawnIcon) || bottom(newIcon) < top(drawnIcon) || top(newIcon) > bottom(drawnIcon)) {
    return false;
  }

  return true;
};

var withoutOverlaps = function withoutOverlaps(newIcon, _ref7) {
  var drawnIcons = _ref7.drawnIcons;
  return !drawnIcons.some(function (drawnIcon) {
    return overlap(newIcon, drawnIcon);
  });
};

var canBeRendered = function canBeRendered(newIcon, config) {
  var thereIsSpace = hasSpace(newIcon, config);
  var isWithinTheContentArea = withinBoundaries(newIcon, config);
  var doesNotOverlap = withoutOverlaps(newIcon, config);

  return thereIsSpace && isWithinTheContentArea && doesNotOverlap;
};

var _this$1 = undefined;

var noop$2 = function noop() {};
var wrapWithClickThrough = function wrapWithClickThrough(iconElement, icon) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$onIconClick = _ref.onIconClick,
      onIconClick = _ref$onIconClick === undefined ? noop$2 : _ref$onIconClick;

  var anchor = document.createElement('A');

  if (icon.iconClickthrough) {
    anchor.href = icon.iconClickthrough;
    anchor.target = '_blank';
  }

  // NOTE: if iframe icon disable pointer events so that clickThrough and click tracking work
  if (Boolean(icon.iFrameResource)) {
    iconElement.style.pointerEvents = 'none';
  }

  anchor.onclick = function (event) {
    if (Event.prototype.stopPropagation !== undefined) {
      event.stopPropagation();
    }

    onIconClick(icon);
  };

  anchor.appendChild(iconElement);

  return anchor;
};

var createIcon = function () {
  var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(icon, config) {
    var iconResource;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (icon.element) {
              _context.next = 9;
              break;
            }

            _context.next = 3;
            return loadResource(icon, config);

          case 3:
            iconResource = _context.sent;


            iconResource.width = '100%';
            iconResource.height = '100%';
            iconResource.style.height = '100%';
            iconResource.style.width = '100%';

            icon.element = wrapWithClickThrough(iconResource, icon, config);

          case 9:
            return _context.abrupt('return', icon.element);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$1);
  }));

  return function createIcon(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var updateIconElement = function updateIconElement(iconElement, icon) {
  var height = icon.height,
      width = icon.width,
      left = icon.left,
      top = icon.top,
      yPosition = icon.yPosition;


  iconElement.height = height;
  iconElement.width = width;
  iconElement.style.position = 'absolute';
  iconElement.style.left = left + 'px';

  // NOTE: This if is a bit odd but some browser don't calculate the placeholder height pixel perfect and,
  //       setting the top of the icon will change the size of the icon's placeholder this if prevents that situation
  if (yPosition === 'bottom') {
    iconElement.style.bottom = '0';
  } else {
    iconElement.style.top = top + 'px';
  }
  iconElement.style.height = height + 'px';
  iconElement.style.width = width + 'px';

  return iconElement;
};

var renderIcon = function () {
  var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(icon, config) {
    var placeholder, iconElement, updatedIcon;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            placeholder = config.placeholder;
            _context2.next = 3;
            return createIcon(icon, config);

          case 3:
            iconElement = _context2.sent;
            updatedIcon = updateIcon(icon, iconElement, config);

            if (!canBeRendered(updatedIcon, config)) {
              _context2.next = 9;
              break;
            }

            if (!iconElement.parentNode || icon.updated) {
              placeholder.appendChild(updateIconElement(iconElement, updatedIcon));
            }
            _context2.next = 11;
            break;

          case 9:
            if (iconElement.parentNode) {
              iconElement.parentNode.removeChild(iconElement);
            }
            throw new Error('Icon can\'t be rendered');

          case 11:
            return _context2.abrupt('return', updatedIcon);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this$1);
  }));

  return function renderIcon(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var canBeShown = function canBeShown(icon, videoElement) {
  var currentTimeInMs = videoElement.currentTime * 1000;
  var videoDurationInMs = videoElement.duration * 1000;
  var offset = icon.offset || 0;
  var duration = icon.duration || videoDurationInMs;

  return offset <= currentTimeInMs && currentTimeInMs - offset <= duration;
};

/* eslint-disable promise/prefer-await-to-then */

var renderIcons = function renderIcons(icons, _ref) {
  var onIconClick = _ref.onIconClick,
      videoAdContainer = _ref.videoAdContainer,
      logger = _ref.logger;
  var element = videoAdContainer.element,
      videoElement = videoAdContainer.videoElement;

  var drawnIcons = [];

  var _icons$reduce = icons.reduce(function (accumulator, icon) {
    if (canBeShown(icon, videoElement)) {
      accumulator.iconsToShow.push(icon);
    } else {
      accumulator.otherIcons.push(icon);
    }

    return accumulator;
  }, {
    iconsToShow: [],
    otherIcons: []
  }),
      iconsToShow = _icons$reduce.iconsToShow,
      otherIcons = _icons$reduce.otherIcons;

  otherIcons.forEach(function (_ref2) {
    var iconElement = _ref2.element;

    if (iconElement && iconElement.parentNode) {
      iconElement.parentNode.removeChild(iconElement);
    }
  });

  return iconsToShow.reduce(function (promise, icon) {
    return promise.then(function () {
      return renderIcon(icon, {
        document: document,
        drawnIcons: drawnIcons,
        onIconClick: onIconClick,
        placeholder: element
      });
    }).then(function (renderedIcon) {
      return drawnIcons.push(renderedIcon);
    }).catch(function (error) {
      return logger.log(error);
    });
  }, Promise.resolve(drawnIcons)).then(function () {
    return drawnIcons;
  });
};

var _this$2 = undefined;

var firstRenderPending = Symbol('firstRenderPending');
var noop$3 = function noop() {};

var _hasPendingIconRedraws = function _hasPendingIconRedraws(icons, videoElement) {
  var currentTimeInMs = videoElement.currentTime * 1000;
  var videoDurationInMs = videoElement.duration * 1000;

  var iconsPendingToRedraw = icons.filter(function (icon) {
    return !icon.offset || icon.offset < currentTimeInMs;
  });
  var iconsPendingToBeRemoved = icons.filter(function (icon) {
    return icon.duration && icon.duration < videoDurationInMs;
  });

  return iconsPendingToRedraw.length > 0 || iconsPendingToBeRemoved.length > 0;
};

var removeDrawnIcons = function removeDrawnIcons(icons) {
  return icons.filter(function (_ref) {
    var element = _ref.element;
    return Boolean(element) && Boolean(element.parentNode);
  }).forEach(function (_ref2) {
    var element = _ref2.element;
    return element.parentNode.removeChild(element);
  });
};

var addIcons = function addIcons(icons) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var videoAdContainer = _ref3.videoAdContainer,
      _ref3$onIconView = _ref3.onIconView,
      onIconView = _ref3$onIconView === undefined ? noop$3 : _ref3$onIconView,
      _ref3$onIconClick = _ref3.onIconClick,
      onIconClick = _ref3$onIconClick === undefined ? noop$3 : _ref3$onIconClick,
      rest = objectWithoutProperties(_ref3, ['videoAdContainer', 'onIconView', 'onIconClick']);
  var videoElement = videoAdContainer.videoElement,
      element = videoAdContainer.element;

  var drawIcons = function () {
    var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var drawnIcons;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return renderIcons(icons, _extends({
                onIconClick: onIconClick,
                videoAdContainer: videoAdContainer
              }, rest));

            case 2:
              drawnIcons = _context.sent;


              element.dispatchEvent(new CustomEvent('iconsDrawn'));

              drawnIcons.forEach(function (icon) {
                if (icon[firstRenderPending]) {
                  onIconView(icon);
                  icon[firstRenderPending] = false;
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this$2);
    }));

    return function drawIcons() {
      return _ref4.apply(this, arguments);
    };
  }();

  icons.forEach(function (icon) {
    icon[firstRenderPending] = true;
  });

  return {
    drawIcons: drawIcons,
    hasPendingIconRedraws: function hasPendingIconRedraws() {
      return _hasPendingIconRedraws(icons, videoElement);
    },
    removeIcons: function removeIcons() {
      return removeDrawnIcons(icons);
    }
  };
};

var viewmode = function viewmode(width, height) {
  var isFullscreen = width + 100 > innerWidth && height + 100 > innerHeight;

  if (isFullscreen) {
    return 'fullscreen';
  }

  if (width < 400) {
    return 'thumbnail';
  }

  return 'normal';
};

var start$2 = linearEvents.start,
    iconClick$1 = linearEvents.iconClick,
    iconView$1 = linearEvents.iconView;

// eslint-disable-next-line id-match

var _protected = Symbol('_protected');

/**
 * @class
 * @extends Emitter
 * @alias VideoAdUnit
 * @implements LinearEvents
 * @description This class provides shared logic among all the ad units.
 */

var VideoAdUnit = function (_Emitter) {
  inherits(VideoAdUnit, _Emitter);

  /**
   * Creates a {@link VideoAdUnit}.
   *
   * @param {VastChain} vastChain - The {@link VastChain} with all the {@link VastResponse}
   * @param {VideoAdContainer} videoAdContainer - container instance to place the ad
   * @param {Object} [options] - Options Map. The allowed properties are:
   * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
   * Defaults to `window.console`
   * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
   * Defaults to `false`
   * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes
   * Defaults to `false`
   */


  /** If an error occurs it will contain the Vast Error code of the error */


  /** Ad unit type */
  function VideoAdUnit(vastChain, videoAdContainer) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$viewability = _ref.viewability,
        viewability = _ref$viewability === undefined ? false : _ref$viewability,
        _ref$responsive = _ref.responsive,
        responsive = _ref$responsive === undefined ? false : _ref$responsive,
        _ref$logger = _ref.logger,
        logger = _ref$logger === undefined ? console : _ref$logger;

    classCallCheck(this, VideoAdUnit);

    var _this = possibleConstructorReturn(this, (VideoAdUnit.__proto__ || Object.getPrototypeOf(VideoAdUnit)).call(this, logger));

    _this[_protected] = {
      finish: function finish$$1() {
        _this[_protected].finished = true;
        _this[_protected].onFinishCallbacks.forEach(function (callback) {
          return callback();
        });

        _this.emit(finish, {
          adUnit: _this,
          type: finish
        });
      },
      finished: false,
      onErrorCallbacks: [],
      onFinishCallbacks: [],
      started: false,
      throwIfCalled: function throwIfCalled() {
        throw new Error('VideoAdUnit method must be implemented on child class');
      },
      throwIfFinished: function throwIfFinished() {
        if (_this.isFinished()) {
          throw new Error('VideoAdUnit is finished');
        }
      }
    };
    _this.type = null;
    _this.error = null;
    _this.errorCode = null;
    _this.key = '';
    var onFinishCallbacks = _this[_protected].onFinishCallbacks;

    /** Reference to the {@link VastChain} used to load the ad. */

    _this.vastChain = vastChain;

    /** Reference to the {@link VideoAdContainer} that contains the ad. */
    _this.videoAdContainer = videoAdContainer;

    /** Array of {@link VastIcon} definitions to display from the passed {@link VastChain} or null if there are no icons.*/
    _this.icons = retrieveIcons(vastChain);

    onFinishCallbacks.push(preventManualProgress(_this.videoAdContainer.videoElement));

    if (_this.icons) {
      var _addIcons = addIcons(_this.icons, {
        logger: logger,
        onIconClick: function onIconClick(icon) {
          return _this.emit(iconClick$1, {
            adUnit: _this,
            data: icon,
            type: iconClick$1
          });
        },
        onIconView: function onIconView(icon) {
          return _this.emit(iconView$1, {
            adUnit: _this,
            data: icon,
            type: iconView$1
          });
        },
        videoAdContainer: videoAdContainer
      }),
          drawIcons = _addIcons.drawIcons,
          hasPendingIconRedraws = _addIcons.hasPendingIconRedraws,
          removeIcons = _addIcons.removeIcons;

      _this[_protected].drawIcons = drawIcons;
      _this[_protected].removeIcons = removeIcons;
      _this[_protected].hasPendingIconRedraws = hasPendingIconRedraws;

      onFinishCallbacks.push(removeIcons);
    }

    if (viewability) {
      _this.once(start$2, function () {
        var unsubscribe = onElementVisibilityChange(_this.videoAdContainer.element, function (visible) {
          if (_this.isFinished()) {
            return;
          }

          if (visible) {
            _this.resume();
          } else {
            _this.pause();
          }
        });

        onFinishCallbacks.push(unsubscribe);
      });
    }

    if (responsive) {
      _this.once(start$2, function () {
        var element = _this.videoAdContainer.element;


        _this[_protected].size = {
          height: element.clientHeight,
          viewmode: viewmode(element.clientWidth, element.clientHeight),
          width: element.clientWidth
        };
        var unsubscribe = onElementResize(element, function () {
          if (_this.isFinished()) {
            return;
          }

          var prevSize = _this[_protected].size;
          var height = element.clientHeight;
          var width = element.clientWidth;

          if (height !== prevSize.height || width !== prevSize.width) {
            _this.resize(width, height, viewmode(width, height));
          }
        });

        onFinishCallbacks.push(unsubscribe);
      });
    }
    return _this;
  }

  /*
   * Starts the ad unit.
   *
   * @throws if called twice.
   * @throws if ad unit is finished.
   */


  /** If an error occurs it will contain the reference to the error otherwise it will be bull */


  createClass(VideoAdUnit, [{
    key: 'start',
    value: function start() {
      this[_protected].throwIfCalled();
    }

    /**
     * Resumes a previously paused ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */

  }, {
    key: 'resume',
    value: function resume() {
      this[_protected].throwIfCalled();
    }

    /**
     * Pauses the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */

  }, {
    key: 'pause',
    value: function pause() {
      this[_protected].throwIfCalled();
    }

    /**
     * Sets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @param {number} volume - must be a value between 0 and 1;
     */
    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'setVolume',
    value: function setVolume(volume) {
      this[_protected].throwIfCalled();
    }

    /**
     * Gets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @returns {number} - the volume of the ad unit.
     */

  }, {
    key: 'getVolume',
    value: function getVolume() {
      this[_protected].throwIfCalled();
    }

    /**
     * Cancels the ad unit.
     *
     * @throws if ad unit is finished.
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      this[_protected].throwIfCalled();
    }

    /**
     * Returns the duration of the ad Creative or 0 if there is no creative.
     *
     * @returns {number} - the duration of the ad unit.
     */

  }, {
    key: 'duration',
    value: function duration() {
      this[_protected].throwIfCalled();
    }

    /**
     * Returns true if the ad is paused and false otherwise
     */

  }, {
    key: 'paused',
    value: function paused() {
      this[_protected].throwIfCalled();
    }

    /**
     * Returns the current time of the ad Creative or 0 if there is no creative.
     *
     * @returns {number} - the current time of the ad unit.
     */

  }, {
    key: 'currentTime',
    value: function currentTime() {
      this[_protected].throwIfCalled();
    }

    /**
     * Register a callback function that will be called whenever the ad finishes. No matter if it was finished because de ad ended, or cancelled or there was an error playing the ad.
     *
     * @throws if ad unit is finished.
     *
     * @param {Function} callback - will be called once the ad unit finished
     */

  }, {
    key: 'onFinish',
    value: function onFinish(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Expected a callback function');
      }

      this[_protected].onFinishCallbacks.push(safeCallback(callback, this.logger));
    }

    /**
     * Register a callback function that will be called if there is an error while running the ad.
     *
     * @throws if ad unit is finished.
     *
     * @param {Function} callback - will be called on ad unit error passing the Error instance  and an object with the adUnit and the  {@link VastChain}.
     */

  }, {
    key: 'onError',
    value: function onError(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Expected a callback function');
      }

      this[_protected].onErrorCallbacks.push(safeCallback(callback, this.logger));
    }

    /**
     * @returns {boolean} - true if the ad unit is finished and false otherwise
     */

  }, {
    key: 'isFinished',
    value: function isFinished() {
      return this[_protected].finished;
    }

    /**
     * @returns {boolean} - true if the ad unit has started and false otherwise
     */

  }, {
    key: 'isStarted',
    value: function isStarted() {
      return this[_protected].started;
    }

    /**
     * This method resizes the ad unit to fit the available space in the passed {@link VideoAdContainer}
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @returns {Promise} - that resolves once the unit was resized
     */

  }, {
    key: 'resize',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(width, height, mode) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this[_protected].size = {
                  height: height,
                  viewmode: mode,
                  width: width
                };

                if (!(this.isStarted() && !this.isFinished() && this.icons)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return this[_protected].removeIcons();

              case 4:
                _context.next = 6;
                return this[_protected].drawIcons();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resize(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return resize;
    }()
  }]);
  return VideoAdUnit;
}(Emitter);

var complete$2 = linearEvents.complete,
    errorEvt = linearEvents.error,
    skip$2 = linearEvents.skip;

// eslint-disable-next-line id-match

var _private = Symbol('_private');

/**
 * @class
 * @extends VideoAdUnit
 * @alias VastAdUnit
 * @implements LinearEvents
 * @description This class provides everything necessary to run a Vast ad.
 */

var VastAdUnit = function (_VideoAdUnit) {
  inherits(VastAdUnit, _VideoAdUnit);

  /**
   * Creates a {VastAdUnit}.
   *
   * @param {VastChain} vastChain - The {@link VastChain} with all the {@link VastResponse}
   * @param {VideoAdContainer} videoAdContainer - container instance to place the ad
   * @param {Object} [options] - Options Map. The allowed properties are:
   * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
   * Defaults to `window.console`
   * @param {Object} [options.hooks] - Optional map with hooks to configure the behaviour of the ad.
   * @param {Function} [options.hooks.createSkipControl] - If provided it will be called to generate the skip control. Must return a clickable [HTMLElement](https://developer.mozilla.org/es/docs/Web/API/HTMLElement) that is detached from the DOM.
   * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
   * Defaults to `false`
   * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes.
   * Defaults to `false`
   */
  function VastAdUnit(vastChain, videoAdContainer) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, VastAdUnit);

    var _this = possibleConstructorReturn(this, (VastAdUnit.__proto__ || Object.getPrototypeOf(VastAdUnit)).call(this, vastChain, videoAdContainer, options));

    _this[_private] = {
      handleMetric: function handleMetric(event, data) {
        switch (event) {
          case complete$2:
            {
              _this[_protected].finish();
              break;
            }
          case errorEvt:
            {
              _this.error = data;
              _this.errorCode = _this.error && _this.error.code ? _this.error.code : 405;
              _this[_protected].onErrorCallbacks.forEach(function (callback) {
                return callback(_this.error, {
                  adUnit: _this,
                  vastChain: _this.vastChain
                });
              });
              _this[_protected].finish();
              break;
            }
          case skip$2:
            {
              _this.cancel();
              break;
            }
        }

        _this.emit(event, {
          adUnit: _this,
          type: event
        });
      }
    };
    _this.assetUri = null;
    _this.type = 'VAST';
    var onFinishCallbacks = _this[_protected].onFinishCallbacks;
    var handleMetric = _this[_private].handleMetric;


    _this.hooks = options.hooks || {};

    var removeMetricHandlers = setupMetricHandlers({
      hooks: _this.hooks,
      vastChain: _this.vastChain,
      videoAdContainer: _this.videoAdContainer
    }, handleMetric);

    onFinishCallbacks.push(removeMetricHandlers);
    return _this;
  }

  /**
   * Starts the ad unit.
   *
   * @throws if called twice.
   * @throws if ad unit is finished.
   */


  /** Ad unit type. Will be `VAST` for VastAdUnit */


  createClass(VastAdUnit, [{
    key: 'start',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var _this2 = this;

        var inlineAd, _videoAdContainer, videoElement, element, media, drawIcons, adUnitError;

        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this[_protected].throwIfFinished();

                if (!this.isStarted()) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('VastAdUnit already started');

              case 3:
                inlineAd = this.vastChain[0].ad;
                _videoAdContainer = this.videoAdContainer, videoElement = _videoAdContainer.videoElement, element = _videoAdContainer.element;
                media = findBestMedia(inlineAd, videoElement, element);

                if (!Boolean(media)) {
                  _context2.next = 16;
                  break;
                }

                if (!this.icons) {
                  _context2.next = 11;
                  break;
                }

                drawIcons = function () {
                  var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
                    return regenerator.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!_this2.isFinished()) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt('return');

                          case 2:
                            _context.next = 4;
                            return _this2[_protected].drawIcons();

                          case 4:

                            if (_this2[_protected].hasPendingIconRedraws() && !_this2.isFinished()) {
                              once(videoElement, 'timeupdate', drawIcons);
                            }

                          case 5:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this2);
                  }));

                  return function drawIcons() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context2.next = 11;
                return drawIcons();

              case 11:

                videoElement.src = media.src;
                this.assetUri = media.src;
                videoElement.play();
                _context2.next = 19;
                break;

              case 16:
                adUnitError = new Error('Can\'t find a suitable media to play');


                adUnitError.code = 403;
                this[_private].handleMetric(errorEvt, adUnitError);

              case 19:

                this[_protected].started = true;

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()

    /**
     * Resumes a previously paused ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */

  }, {
    key: 'resume',
    value: function resume() {
      this.videoAdContainer.videoElement.play();
    }

    /**
     * Pauses the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */

  }, {
    key: 'pause',
    value: function pause() {
      this.videoAdContainer.videoElement.pause();
    }

    /**
     * Returns true if the ad is paused and false otherwise
     */

  }, {
    key: 'paused',
    value: function paused() {
      return this.videoAdContainer.videoElement.paused;
    }

    /**
     * Sets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @param {number} volume - must be a value between 0 and 1;
     */

  }, {
    key: 'setVolume',
    value: function setVolume(volume) {
      this.videoAdContainer.videoElement.volume = volume;
    }

    /**
     * Gets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @returns {number} - the volume of the ad unit.
     */

  }, {
    key: 'getVolume',
    value: function getVolume() {
      return this.videoAdContainer.videoElement.volume;
    }

    /**
     * Cancels the ad unit.
     *
     * @throws if ad unit is finished.
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      this[_protected].throwIfFinished();

      this.videoAdContainer.videoElement.pause();

      this[_protected].finish();
    }

    /**
     * Returns the duration of the ad Creative or 0 if there is no creative.
     *
     * @returns {number} - the duration of the ad unit.
     */

  }, {
    key: 'duration',
    value: function duration() {
      if (!this.isStarted()) {
        return 0;
      }

      return this.videoAdContainer.videoElement.duration;
    }

    /**
     * Returns the current time of the ad Creative or 0 if there is no creative.
     *
     * @returns {number} - the current time of the ad unit.
     */

  }, {
    key: 'currentTime',
    value: function currentTime() {
      if (!this.isStarted()) {
        return 0;
      }

      return this.videoAdContainer.videoElement.currentTime;
    }

    /**
     * This method resizes the ad unit to fit the available space in the passed {@link VideoAdContainer}
     *
     * @param width {number} - the new width of the ad container.
     * @param height {number} - the new height of the ad container.
     * @param viewmode {string} - fullscreen | normal | thumbnail
     * @returns {Promise} - that resolves once the unit was resized
     */

  }, {
    key: 'resize',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(width, height, viewmode) {
        var inlineAd, _videoAdContainer2, videoElement, element, media;

        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return get$1(VastAdUnit.prototype.__proto__ || Object.getPrototypeOf(VastAdUnit.prototype), 'resize', this).call(this, width, height, viewmode);

              case 2:

                if (this.isStarted() && !this.isFinished()) {
                  inlineAd = this.vastChain[0].ad;
                  _videoAdContainer2 = this.videoAdContainer, videoElement = _videoAdContainer2.videoElement, element = _videoAdContainer2.element;
                  media = findBestMedia(inlineAd, videoElement, element);


                  if (Boolean(media) && videoElement.src !== media.src) {
                    updateMedia(videoElement, media);
                  }
                }

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resize(_x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return resize;
    }()
  }]);
  return VastAdUnit;
}(VideoAdUnit);

var SUPPORTED_MIMETYPES = ['text/javascript', 'text/javascript1.0', 'text/javascript1.2', 'text/javascript1.4', 'text/jscript', 'application/javascript', 'application/x-javascript', 'text/ecmascript', 'text/ecmascript1.0', 'text/ecmascript1.2', 'text/ecmascript1.4', 'text/livescript', 'application/ecmascript', 'application/x-ecmascript'];

var isSupported = function isSupported(_ref) {
  var type = _ref.type;
  return SUPPORTED_MIMETYPES.some(function (mimetype) {
    return mimetype === type;
  });
};

var _this$3 = undefined;

var loadCreative = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(vastChain, videoAdContainer) {
    var creative, src, type, context;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            creative = (getInteractiveFiles(vastChain[0].ad) || []).filter(isSupported)[0];

            if (creative) {
              _context.next = 3;
              break;
            }

            throw new TypeError('VastChain does not contain a supported vpaid creative');

          case 3:
            src = creative.src, type = creative.type;
            _context.next = 6;
            return videoAdContainer.addScript(src, { type: type });

          case 6:
            context = videoAdContainer.executionContext;
            return _context.abrupt('return', context.getVPAIDAd());

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$3);
  }));

  return function loadCreative(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var handshakeVersion = 'handshakeVersion';
var resizeAd = 'resizeAd';
var startAd = 'startAd';
var stopAd = 'stopAd';
var pauseAd = 'pauseAd';
var resumeAd = 'resumeAd';
var getAdRemainingTime = 'getAdRemainingTime';
var getAdDuration = 'getAdDuration';
var getAdVolume = 'getAdVolume';
var getAdIcons = 'getAdIcons';
var setAdVolume = 'setAdVolume';
var adLoaded = 'AdLoaded';
var adStarted = 'AdStarted';
var adStopped = 'AdStopped';
var adSkipped = 'AdSkipped';
var adSkippableStateChange = 'AdSkippableStateChange';
var adSizeChange = 'AdSizeChange';
var adLinearChange = 'AdLinearChange';
var adDurationChange = 'AdDurationChange';
var adExpandedChange = 'AdExpandedChange';
var adRemainingTimeChange = 'AdRemainingTimeChange';
var adVolumeChange = 'AdVolumeChange';
var adImpression = 'AdImpression';
var adVideoStart = 'AdVideoStart';
var adVideoFirstQuartile = 'AdVideoFirstQuartile';
var adVideoMidpoint = 'AdVideoMidpoint';
var adVideoThirdQuartile = 'AdVideoThirdQuartile';
var adVideoComplete = 'AdVideoComplete';
var adClickThru = 'AdClickThru';
var adInteraction = 'AdInteraction';
var adUserAcceptInvitation = 'AdUserAcceptInvitation';
var adUserMinimize = 'AdUserMinimize';
var adUserClose = 'AdUserClose';
var adPaused = 'AdPaused';
var adPlaying = 'AdPlaying';
var adLog = 'AdLog';
var adError = 'AdError';

var EVENTS = [adLoaded, adStarted, adStopped, adSkipped, adSkippableStateChange, adSizeChange, adLinearChange, adDurationChange, adExpandedChange, adRemainingTimeChange, adVolumeChange, adImpression, adVideoStart, adVideoFirstQuartile, adVideoMidpoint, adVideoThirdQuartile, adVideoComplete, adClickThru, adInteraction, adUserAcceptInvitation, adUserMinimize, adUserClose, adPaused, adPlaying, adLog, adError];

var waitFor$1 = function waitFor(creativeAd, event, timeout) {
  return new Promise(function (resolve, reject) {
    // eslint-disable-next-line prefer-const
    var timeoutId = void 0;
    var handler = function handler() {
      if (typeof timeout === 'number') {
        clearTimeout(timeoutId);
      }

      creativeAd.unsubscribe(handler, event);
      resolve();
    };

    if (typeof timeout === 'number') {
      timeoutId = setTimeout(function () {
        creativeAd.unsubscribe(handler, event);
        reject(new Error('Timeout waiting for event \'' + event + '\''));
      }, timeout);
    }

    creativeAd.subscribe(handler, event);
  });
};

var callAndWait = function callAndWait(creativeAd, method, event) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var waitPromise = waitFor$1(creativeAd, event, 5000);

  creativeAd[method].apply(creativeAd, args);

  return waitPromise;
};

var major = function major(version) {
  var parts = version.split('.');

  return parseInt(parts[0], 10);
};

var isSupported$1 = function isSupported(supportedVersion, creativeVersion) {
  var creativeMajorNum = major(creativeVersion);

  if (creativeMajorNum < 1) {
    return false;
  }

  return creativeMajorNum <= major(supportedVersion);
};

var handshake = function handshake(creative, supportedVersion) {
  var creativeVersion = creative[handshakeVersion](supportedVersion);

  if (!isSupported$1(supportedVersion, creativeVersion)) {
    throw new Error('Creative Version \'' + creativeVersion + '\' not supported');
  }

  return creativeVersion;
};

var createSlot = function createSlot(placeholder, width, height) {
  var slot = document.createElement('DIV');

  Object.assign(slot.style, {
    border: '0px',
    cursor: 'pointer',
    height: height + 'px',
    left: '0px',
    margin: '0px',
    padding: '0px',
    position: 'absolute',
    top: '0px',
    width: width + 'px'
  });

  placeholder.appendChild(slot);

  return slot;
};
var initAd$1 = function initAd(creativeAd, videoAdContainer, vastChain) {
  var placeholder = videoAdContainer.element;

  var _placeholder$getBound = placeholder.getBoundingClientRect(),
      width = _placeholder$getBound.width,
      height = _placeholder$getBound.height;

  var mode = viewmode(width, height);
  var desiredBitrate = -1;
  var environmentVars = {
    slot: createSlot(placeholder, width, height),
    videoSlot: videoAdContainer.videoElement,
    videoSlotCanAutoPlay: videoAdContainer.isOriginalVideoElement
  };
  var creativeData = getCreativeData(vastChain[0].XML);

  creativeAd.initAd(width, height, mode, desiredBitrate, creativeData, environmentVars);
};

var complete$3 = linearEvents.complete,
    mute$2 = linearEvents.mute,
    unmute$2 = linearEvents.unmute,
    skip$3 = linearEvents.skip,
    start$3 = linearEvents.start,
    firstQuartile$2 = linearEvents.firstQuartile,
    pause$2 = linearEvents.pause,
    resume$2 = linearEvents.resume,
    impression$2 = linearEvents.impression,
    midpoint$2 = linearEvents.midpoint,
    thirdQuartile$2 = linearEvents.thirdQuartile,
    clickThrough$2 = linearEvents.clickThrough,
    errorEvt$1 = linearEvents.error,
    closeLinear$1 = linearEvents.closeLinear;

// NOTE some ads only allow one handler per event and we need to subscribe to the adLoaded to know the creative is loaded.

var VPAID_EVENTS = EVENTS.filter(function (event) {
  return event !== adLoaded;
});

// eslint-disable-next-line id-match
var _private$1 = Symbol('_private');

var vpaidGeneralError = function vpaidGeneralError(payload) {
  var error$$1 = payload instanceof Error ? payload : new Error('VPAID general error');

  if (!error$$1.code) {
    error$$1.code = 901;
  }

  return error$$1;
};

/**
 * @class
 * @alias VpaidAdUnit
 * @extends VideoAdUnit
 * @implements NonLinearEvents
 * @implements LinearEvents
 * @description This class provides everything necessary to run a Vpaid ad.
 */

var VpaidAdUnit = function (_VideoAdUnit) {
  inherits(VpaidAdUnit, _VideoAdUnit);

  /**
   * Creates a {VpaidAdUnit}.
   *
   * @param {VastChain} vastChain - The {@link VastChain} with all the {@link VastResponse}
   * @param {VideoAdContainer} videoAdContainer - container instance to place the ad
   * @param {Object} [options] - Options Map. The allowed properties are:
   * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
   * Defaults to `window.console`
   * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
   * Defaults to `false`
   * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes
   * Defaults to `false`
   * Defaults to `window.console`
   */


  /** Ad unit type. Will be `VPAID` for VpaidAdUnit */
  function VpaidAdUnit(vastChain, videoAdContainer) {
    var _evtHandler;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, VpaidAdUnit);

    var _this = possibleConstructorReturn(this, (VpaidAdUnit.__proto__ || Object.getPrototypeOf(VpaidAdUnit)).call(this, vastChain, videoAdContainer, options));

    _this[_private$1] = {
      evtHandler: (_evtHandler = {}, defineProperty(_evtHandler, adClickThru, function (url, id, playerHandles) {
        if (playerHandles) {
          if (_this.paused()) {
            _this.resume();
          } else {
            var clickThroughUrl = typeof url === 'string' && url.length > 0 ? url : getClickThrough(_this.vastChain[0].ad);

            _this.pause();
            window.open(clickThroughUrl, '_blank');
          }
        }

        _this.emit(clickThrough$2, {
          adUnit: _this,
          type: clickThrough$2
        });
      }), defineProperty(_evtHandler, adDurationChange, function () {
        _this.emit(adProgress, {
          adUnit: _this,
          type: adProgress
        });
      }), defineProperty(_evtHandler, adError, function (payload) {
        _this.error = vpaidGeneralError(payload);
        _this.errorCode = _this.error.code;

        _this[_protected].onErrorCallbacks.forEach(function (callback) {
          return callback(_this.error, {
            adUnit: _this,
            vastChain: _this.vastChain
          });
        });

        _this[_protected].finish();

        _this.emit(errorEvt$1, {
          adUnit: _this,
          type: errorEvt$1
        });
      }), defineProperty(_evtHandler, adImpression, function () {
        // NOTE: some ads forget to trigger the adVideoStart event. :(
        if (!_this[_private$1].videoStart) {
          _this[_private$1].handleVpaidEvt(adVideoStart);
        }

        _this.emit(impression$2, {
          adUnit: _this,
          type: impression$2
        });
      }), defineProperty(_evtHandler, adPaused, function () {
        _this[_private$1].paused = true;
        _this.emit(pause$2, {
          adUnit: _this,
          type: pause$2
        });
      }), defineProperty(_evtHandler, adPlaying, function () {
        _this[_private$1].paused = false;
        _this.emit(resume$2, {
          adUnit: _this,
          type: resume$2
        });
      }), defineProperty(_evtHandler, adRemainingTimeChange, function () {
        _this.emit(adProgress, {
          adUnit: _this,
          type: adProgress
        });
      }), defineProperty(_evtHandler, adSkipped, function () {
        _this.cancel();
        _this.emit(skip$3, {
          adUnit: _this,
          type: skip$3
        });
      }), defineProperty(_evtHandler, adStarted, function () {
        _this.emit(creativeView, {
          adUnit: _this,
          type: creativeView
        });
      }), defineProperty(_evtHandler, adStopped, function () {
        _this.emit(adStopped, {
          adUnit: _this,
          type: adStopped
        });

        _this[_protected].finish();
      }), defineProperty(_evtHandler, adUserAcceptInvitation, function () {
        _this.emit(acceptInvitation, {
          adUnit: _this,
          type: acceptInvitation
        });
      }), defineProperty(_evtHandler, adUserClose, function () {
        _this.emit(closeLinear$1, {
          adUnit: _this,
          type: closeLinear$1
        });

        _this[_protected].finish();
      }), defineProperty(_evtHandler, adUserMinimize, function () {
        _this.emit(adCollapse, {
          adUnit: _this,
          type: adCollapse
        });
      }), defineProperty(_evtHandler, adVideoComplete, function () {
        _this.emit(complete$3, {
          adUnit: _this,
          type: complete$3
        });

        _this[_protected].finish();
      }), defineProperty(_evtHandler, adVideoFirstQuartile, function () {
        _this.emit(firstQuartile$2, {
          adUnit: _this,
          type: firstQuartile$2
        });
      }), defineProperty(_evtHandler, adVideoMidpoint, function () {
        _this.emit(midpoint$2, {
          adUnit: _this,
          type: midpoint$2
        });
      }), defineProperty(_evtHandler, adVideoStart, function () {
        if (!_this[_private$1].videoStart) {
          _this[_private$1].videoStart = true;
          _this[_private$1].paused = false;
          _this.emit(start$3, {
            adUnit: _this,
            type: start$3
          });
        }
      }), defineProperty(_evtHandler, adVideoThirdQuartile, function () {
        _this.emit(thirdQuartile$2, {
          adUnit: _this,
          type: thirdQuartile$2
        });
      }), defineProperty(_evtHandler, adVolumeChange, function () {
        var volume = _this.getVolume();

        _this.emit(volumeChanged, {
          adUnit: _this,
          type: volumeChanged
        });

        if (volume === 0 && !_this[_private$1].muted) {
          _this[_private$1].muted = true;
          _this.emit(mute$2, {
            adUnit: _this,
            type: mute$2
          });
        }

        if (volume > 0 && _this[_private$1].muted) {
          _this[_private$1].muted = false;
          _this.emit(unmute$2, {
            adUnit: _this,
            type: unmute$2
          });
        }
      }), _evtHandler),
      handleVpaidEvt: function handleVpaidEvt(event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var handler = _this[_private$1].evtHandler[event];

        if (handler) {
          handler.apply(undefined, args);
        }

        _this.emit(event, {
          adUnit: _this,
          type: event
        });
      },
      muted: false,
      paused: true
    };
    _this.type = 'VPAID';
    _this.creativeAd = null;


    _this[_private$1].loadCreativePromise = loadCreative(vastChain, videoAdContainer);
    return _this;
  }

  /**
   * Starts the ad unit.
   *
   * @throws if called twice.
   * @throws if ad unit is finished.
   */


  /** Reference to the Vpaid Creative ad unit. Will be null before the ad unit starts. */


  createClass(VpaidAdUnit, [{
    key: 'start',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var _this2 = this;

        var adLoadedPromise, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, creativeEvt, videoElement, drawIcons;

        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this[_protected].throwIfFinished();

                if (!this.isStarted()) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('VpaidAdUnit already started');

              case 3:
                _context2.prev = 3;
                _context2.next = 6;
                return this[_private$1].loadCreativePromise;

              case 6:
                this.creativeAd = _context2.sent;
                adLoadedPromise = waitFor$1(this.creativeAd, adLoaded);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 11;


                for (_iterator = VPAID_EVENTS[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  creativeEvt = _step.value;

                  this.creativeAd.subscribe(this[_private$1].handleVpaidEvt.bind(this, creativeEvt), creativeEvt);
                }

                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](11);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 19:
                _context2.prev = 19;
                _context2.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 22:
                _context2.prev = 22;

                if (!_didIteratorError) {
                  _context2.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context2.finish(22);

              case 26:
                return _context2.finish(19);

              case 27:
                if (this.creativeAd[getAdIcons] && !this.creativeAd[getAdIcons]()) {
                  this.icons = null;
                }

                handshake(this.creativeAd, '2.0');
                initAd$1(this.creativeAd, this.videoAdContainer, this.vastChain);

                _context2.next = 32;
                return adLoadedPromise;

              case 32:
                if (this.videoAdContainer.isDestroyed()) {
                  _context2.next = 48;
                  break;
                }

                _context2.prev = 33;
                videoElement = this.videoAdContainer.videoElement;


                if (videoElement.muted) {
                  this[_private$1].muted = true;
                  this.setVolume(0);
                } else {
                  this.setVolume(videoElement.volume);
                }

                _context2.next = 38;
                return callAndWait(this.creativeAd, startAd, adStarted);

              case 38:
                if (!this.icons) {
                  _context2.next = 42;
                  break;
                }

                drawIcons = function () {
                  var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
                    return regenerator.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!_this2.isFinished()) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt('return');

                          case 2:
                            _context.next = 4;
                            return _this2[_protected].drawIcons();

                          case 4:

                            if (_this2[_protected].hasPendingIconRedraws() && !_this2.isFinished()) {
                              setTimeout(drawIcons, 500);
                            }

                          case 5:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this2);
                  }));

                  return function drawIcons() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context2.next = 42;
                return drawIcons();

              case 42:

                this[_protected].started = true;
                _context2.next = 48;
                break;

              case 45:
                _context2.prev = 45;
                _context2.t1 = _context2['catch'](33);

                this.cancel();

              case 48:
                return _context2.abrupt('return', this);

              case 51:
                _context2.prev = 51;
                _context2.t2 = _context2['catch'](3);

                this[_private$1].handleVpaidEvt(adError, _context2.t2);
                throw _context2.t2;

              case 55:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 51], [11, 15, 19, 27], [20,, 22, 26], [33, 45]]);
      }));

      function start$$1() {
        return _ref.apply(this, arguments);
      }

      return start$$1;
    }()

    /**
     * Resumes a previously paused ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */

  }, {
    key: 'resume',
    value: function resume$$1() {
      this.creativeAd[resumeAd]();
    }

    /**
     * Pauses the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */

  }, {
    key: 'pause',
    value: function pause$$1() {
      this.creativeAd[pauseAd]();
    }

    /**
     * Returns true if the ad is paused and false otherwise
     */

  }, {
    key: 'paused',
    value: function paused() {
      return this.isFinished() || this[_private$1].paused;
    }

    /**
     * Sets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @param {number} volume - must be a value between 0 and 1;
     */

  }, {
    key: 'setVolume',
    value: function setVolume(volume) {
      this.creativeAd[setAdVolume](volume);
    }

    /**
     * Gets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @returns {number} - the volume of the ad unit.
     */

  }, {
    key: 'getVolume',
    value: function getVolume() {
      return this.creativeAd[getAdVolume]();
    }

    /**
     * Cancels the ad unit.
     *
     * @throws if ad unit is finished.
     */

  }, {
    key: 'cancel',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        var adStoppedPromise;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this[_protected].throwIfFinished();

                _context3.prev = 1;
                adStoppedPromise = waitFor$1(this.creativeAd, adStopped, 3000);


                this.creativeAd[stopAd]();
                _context3.next = 6;
                return adStoppedPromise;

              case 6:
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](1);

                this[_protected].finish();

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function cancel() {
        return _ref3.apply(this, arguments);
      }

      return cancel;
    }()

    /**
     * Returns the duration of the ad Creative or 0 if there is no creative.
     *
     * Note: if the user has engaged with the ad, the duration becomes unknown and it will return 0;
     *
     * @returns {number} - the duration of the ad unit.
     */

  }, {
    key: 'duration',
    value: function duration() {
      if (!this.creativeAd) {
        return 0;
      }

      var duration = this.creativeAd[getAdDuration]();

      if (duration < 0) {
        return 0;
      }

      return duration;
    }

    /**
     * Returns the current time of the ad Creative or 0 if there is no creative.
     *
     * Note: if the user has engaged with the ad, the currentTime becomes unknown and it will return 0;
     *
     * @returns {number} - the current time of the ad unit.
     */

  }, {
    key: 'currentTime',
    value: function currentTime() {
      if (!this.creativeAd) {
        return 0;
      }

      var remainingTime = this.creativeAd[getAdRemainingTime]();

      if (remainingTime < 0) {
        return 0;
      }

      return this.duration() - remainingTime;
    }

    /**
     * This method resizes the ad unit to fit the available space in the passed {@link VideoAdContainer}
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @returns {Promise} - that resolves once the unit was resized
     */

  }, {
    key: 'resize',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(width, height, viewmode) {
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return get$1(VpaidAdUnit.prototype.__proto__ || Object.getPrototypeOf(VpaidAdUnit.prototype), 'resize', this).call(this, width, height, viewmode);

              case 2:
                return _context4.abrupt('return', callAndWait(this.creativeAd, resizeAd, adSizeChange, width, height, viewmode));

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function resize(_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return resize;
    }()
  }]);
  return VpaidAdUnit;
}(VideoAdUnit);

var createVideoAdUnit = function createVideoAdUnit(vastChain, videoAdContainer, options) {
  var tracker = options.tracker,
      type = options.type;

  var adUnit = type === 'VPAID' ? new VpaidAdUnit(vastChain, videoAdContainer, options) : new VastAdUnit(vastChain, videoAdContainer, options);

  Object.values(linearEvents).forEach(function (linearEvent) {
    return adUnit.on(linearEvent, function (event) {
      var evtType = event.type,
          data = event.data;

      var payload = {
        data: data,
        errorCode: adUnit.errorCode,
        tracker: tracker
      };

      trackLinearEvent(evtType, vastChain, payload);
    });
  });

  Object.values(nonLinearEvents).forEach(function (nonLinearEvent) {
    return adUnit.on(nonLinearEvent, function (event) {
      var payload = {
        data: event.data,
        tracker: tracker
      };

      trackNonLinearEvent(event.type, vastChain, payload);
    });
  });

  return adUnit;
};

var _this$4 = undefined;

var validate$2 = function validate(vastChain, videoAdContainer) {
  if (!Array.isArray(vastChain) || vastChain.length === 0) {
    throw new TypeError('Invalid vastChain');
  }

  if (!(videoAdContainer instanceof VideoAdContainer)) {
    throw new TypeError('Invalid VideoAdContainer');
  }
};

var hasVpaidCreative = function hasVpaidCreative(ad) {
  return Boolean(getInteractiveFiles(ad));
};

var hasVastCreative = function hasVastCreative(ad, videoElement) {
  var mediaFiles = getMediaFiles(ad);

  if (mediaFiles) {
    return mediaFiles.some(function (mediaFile) {
      return canPlay(videoElement, mediaFile);
    });
  }

  return false;
};

var startAdUnit = function startAdUnit(adUnit, _ref) {
  var onAdReady = _ref.onAdReady;
  return new Promise(function (resolve, reject) {
    var createRejectHandler = function createRejectHandler(event) {
      return function () {
        return reject(new Error('Ad unit start rejected due to event \'' + event + '\''));
      };
    };

    adUnit.onError(reject);
    adUnit.on(start, function () {
      return resolve(adUnit);
    });
    adUnit.on(adUserClose, createRejectHandler(adUserClose));
    adUnit.on(closeLinear, createRejectHandler(closeLinear));
    adUnit.on(adStopped, createRejectHandler(adStopped));

    onAdReady(adUnit);
    // eslint-disable-next-line lines-around-comment
    // adUnit.start();
  });
};

var tryToStartVpaidAd = function tryToStartVpaidAd(vastChain, videoAdContainer, options) {
  if (!hasVpaidCreative(vastChain[0].ad)) {
    throw new Error('No valid creative found in the passed VAST chain');
  }

  var adUnit = createVideoAdUnit(vastChain, videoAdContainer, _extends({}, options, {
    type: 'VPAID'
  }));

  return startAdUnit(adUnit, options);
};

var startVastAd = function startVastAd(vastChain, videoAdContainer, options) {
  var adUnit = createVideoAdUnit(vastChain, videoAdContainer, _extends({}, options, {
    type: 'VAST'
  }));

  return startAdUnit(adUnit, options);
};

var startVideoAd = function () {
  var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(vastChain, videoAdContainer, options) {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validate$2(vastChain, videoAdContainer);
            _context.prev = 1;
            _context.next = 4;
            return tryToStartVpaidAd(vastChain, videoAdContainer, options);

          case 4:
            return _context.abrupt('return', _context.sent);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);

            if (!hasVastCreative(vastChain[0].ad, videoAdContainer.videoElement)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', startVastAd(vastChain, videoAdContainer, options));

          case 11:
            throw _context.t0;

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$4, [[1, 7]]);
  }));

  return function startVideoAd(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _this$5 = undefined;

/**
 * Will try to start video ad in the passed {@link VastChain} and return the started VideoAdUnit.
 *
 * @memberof module:@mailonline/video-ad-sdk
 * @static
 * @throws if there is an error starting the ad or it times out (by throw I mean that it will reject promise with the error).
 * @param {VastChain} vastChain - The {@link VastChain} with all the {@link VastResponse}s.
 * @param {HTMLElement} placeholder - placeholder element that will contain the video ad.
 * @param {Object} [options] - Options Map. The allowed properties are:
 * @param {runWaterfall~onAdReady} options.onAdReady - will be called once the ad is ready with the ad unit.
 * @param {HTMLVideoElement} [options.videoElement] - optional videoElement that will be used to play the ad.
 * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 * Defaults to `window.console`
 * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
 * Defaults to `false`
 * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes.
 * Defaults to `false`
 * @param {number} [options.timeout] - timeout number in milliseconds. If set, the video ad will time out if it doesn't start within the specified time.
 * @param {TrackerFn} [options.tracker] - If provided it will be used to track the VAST events instead of the default {@link pixelTracker}.
 * @param {Object} [options.hooks] - Optional map with hooks to configure the behaviour of the ad.
 * @param {Function} [options.hooks.createSkipControl] - If provided it will be called to generate the skip control. Must return a clickable [HTMLElement](https://developer.mozilla.org/es/docs/Web/API/HTMLElement) that is detached from the DOM.
 * @returns {Promise.<VastAdUnit|VpaidAdUnit>} - The video ad unit.
 */
var run = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(vastChain, placeholder, options) {
    var videoAdContainer, timeout, adUnitPromise, timedOut, timeoutId, timeoutPromise, adUnit;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoAdContainer = void 0;
            _context.prev = 1;
            timeout = options.timeout;


            videoAdContainer = createVideoAdContainer(placeholder, options.videoElement);
            adUnitPromise = startVideoAd(vastChain, videoAdContainer, options);


            if (typeof timeout === 'number') {
              timedOut = false;
              timeoutId = void 0;
              timeoutPromise = new Promise(function (resolve, reject) {
                timeoutId = setTimeout(function () {
                  /*const {tracker} = options;
                   trackError(vastChain, {
                    errorCode: 402,
                    tracker
                  });
                  timedOut = true;
                  reject(new Error('Timeout while starting the ad'));*/
                }, options.timeout);
              });


              adUnitPromise = Promise.race([
              // eslint-disable-next-line promise/prefer-await-to-then
              adUnitPromise.then(function (newAdUnit) {
                if (timedOut) {
                  if (newAdUnit.isStarted()) {
                    newAdUnit.cancel();
                  }
                } else {
                  clearTimeout(timeoutId);
                }

                return newAdUnit;
              }), timeoutPromise]);
            }

            _context.next = 8;
            return adUnitPromise;

          case 8:
            adUnit = _context.sent;


            adUnit.onFinish(function () {
              videoAdContainer.destroy();
            });

            return _context.abrupt('return', adUnit);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](1);

            if (videoAdContainer) {
              videoAdContainer.destroy();
            }

            throw _context.t0;

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$5, [[1, 13]]);
  }));

  return function run(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _this$6 = undefined;

var fetch$1 = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(endpoint) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var defaults$$1, fetchOptions, response, error, _response, errorWithCors;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            defaults$$1 = {
              credentials: 'include'
            };
            fetchOptions = Object.assign({}, defaults$$1, options);
            _context.prev = 2;
            _context.next = 5;
            return window.fetch(endpoint, fetchOptions);

          case 5:
            response = _context.sent;

            if (!(response.status >= 400)) {
              _context.next = 10;
              break;
            }

            error = new Error(response.statusText);


            error.response = response;
            throw error;

          case 10:
            return _context.abrupt('return', response);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](2);

            fetchOptions.credentials = 'omit';
            _context.next = 18;
            return window.fetch(endpoint, fetchOptions);

          case 18:
            _response = _context.sent;

            if (!(_response.status >= 400)) {
              _context.next = 23;
              break;
            }

            errorWithCors = new Error(_response.statusText);


            errorWithCors.response = _response;
            throw errorWithCors;

          case 23:
            return _context.abrupt('return', _response);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$6, [[2, 13]]);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

var requested = Symbol('requested');

var markAdAsRequested = function markAdAsRequested(ad) {
  ad[requested] = true;
};

var hasAdBeenRequested = function hasAdBeenRequested(ad) {
  return Boolean(ad[requested]);
};

var _this$7 = undefined;

var validateChain = function validateChain(vastChain, _ref) {
  var _ref$wrapperLimit = _ref.wrapperLimit,
      wrapperLimit = _ref$wrapperLimit === undefined ? 5 : _ref$wrapperLimit;

  if (vastChain.length > wrapperLimit) {
    var error = new Error('Wrapper Limit reached');

    error.code = 304;
    throw error;
  }
};

var fetchAdXML = function () {
  var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(adTag, options) {
    var response, XML;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch$1(adTag, options);

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.text();

          case 6:
            XML = _context.sent;
            return _context.abrupt('return', XML);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            _context.t0.code = 502;

            throw _context.t0;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$7, [[0, 10]]);
  }));

  return function fetchAdXML(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var parseVastXml = function parseVastXml(xml) {
  try {
    return parseXml(xml);
  } catch (error) {
    error.code = 100;
    throw error;
  }
};

var getAd = function getAd(parsedXML) {
  try {
    var ad = getFirstAd(parsedXML);

    if (Boolean(ad)) {
      markAdAsRequested(ad);

      return ad;
    }

    throw new Error('No Ad');
  } catch (error) {
    error.code = 303;
    throw error;
  }
};

var validateResponse = function validateResponse(_ref3, _ref4) {
  var ad = _ref3.ad,
      parsedXML = _ref3.parsedXML;
  var _ref4$allowMultipleAd = _ref4.allowMultipleAds,
      allowMultipleAds = _ref4$allowMultipleAd === undefined ? true : _ref4$allowMultipleAd,
      _ref4$followAdditiona = _ref4.followAdditionalWrappers,
      followAdditionalWrappers = _ref4$followAdditiona === undefined ? true : _ref4$followAdditiona;

  if (!isWrapper(ad) && !isInline(ad)) {
    var error = new Error('Invalid VAST, ad contains neither Wrapper nor Inline');

    error.code = 101;
    throw error;
  }

  if (hasAdPod(parsedXML) && !allowMultipleAds) {
    var _error = new Error('Multiple ads are not allowed');

    _error.code = 203;
    throw _error;
  }

  if (isWrapper(ad) && !followAdditionalWrappers) {
    var _error2 = new Error('To follow additional wrappers is not allowed');

    _error2.code = 200;
    throw _error2;
  }
};

var getOptions = function getOptions(vastChain, options) {
  var parentAd = vastChain[0];
  var parentAdIsWrapper = Boolean(parentAd) && isWrapper(parentAd.ad);
  var wrapperOptions = parentAdIsWrapper ? getWrapperOptions(parentAd.ad) : {};

  return _extends({}, wrapperOptions, options);
};

// eslint-disable-next-line jsdoc/check-tag-names
/**
 * @function requestAd
 *
 * @memberof module:@mailonline/video-ad-sdk
 * @async
 * @static
 * @description Request the ad using the passed ad tag and returns an array with the [VAST responses]{@link VastResponse} needed to get an inline ad.
 *
 * @param {string} adTag - The VAST ad tag request url.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {number} [options.wrapperLimit] - Sets the maximum number of wrappers allowed in the {@link VastChain}.
 *  Defaults to `5`.
 * @param {boolean} [options.AllowMultipleAds] - Boolean to indicate whether adPods are allowed or not.
 *  Defaults to `true`.
 * @param {number} [options.timeout] - timeout number in milliseconds. If set, the request will timeout if it is not fulfilled before the specified time.
 * @param {VastChain} [vastChain] - Optional vastChain with the previous VAST responses.
 * @returns {Promise.<VastChain>} - Returns a Promise that will resolve with a VastChain with the newest VAST response at the beginning of the array.
 * If the {@link VastChain} had an error. The first VAST response of the array will contain an error and an errorCode entry.
 */
var requestAd = function () {
  var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(adTag, options) {
    var vastChain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var rawXml = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var VASTAdResponse, opts, epoch, timeout, fetchPromise;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            VASTAdResponse = {
              ad: null,
              errorCode: null,
              parsedXML: null,
              requestTag: adTag,
              XML: rawXml
            };
            opts = void 0;
            epoch = void 0;
            timeout = void 0;
            _context2.prev = 4;

            opts = getOptions(vastChain, options);
            validateChain(vastChain, opts);

            if (VASTAdResponse.XML) {
              _context2.next = 13;
              break;
            }

            fetchPromise = fetchAdXML(adTag, opts);


            if (typeof opts.timeout === 'number') {
              timeout = opts.timeout;
              epoch = Date.now();
              fetchPromise = Promise.race([fetchPromise, new Promise(function (resolve, reject) {
                setTimeout(function () {
                  var error = new Error('RequestAd timeout');

                  error.code = 301;
                  reject(error);
                }, timeout);
              })]);
            }

            _context2.next = 12;
            return fetchPromise;

          case 12:
            VASTAdResponse.XML = _context2.sent;

          case 13:
            VASTAdResponse.parsedXML = parseVastXml(VASTAdResponse.XML);
            VASTAdResponse.ad = getAd(VASTAdResponse.parsedXML);

            validateResponse(VASTAdResponse, opts);

            if (!isWrapper(VASTAdResponse.ad)) {
              _context2.next = 19;
              break;
            }

            if (epoch) {
              timeout -= Date.now() - epoch;
            }

            return _context2.abrupt('return', requestAd(getVASTAdTagURI(VASTAdResponse.ad), _extends({}, opts, {
              timeout: timeout
            }), [VASTAdResponse].concat(toConsumableArray(vastChain))));

          case 19:
            return _context2.abrupt('return', [VASTAdResponse].concat(toConsumableArray(vastChain)));

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](4);

            /* istanbul ignore if */
            if (!Number.isInteger(_context2.t0.code)) {
              _context2.t0.code = 900;
            }

            VASTAdResponse.errorCode = _context2.t0.code;
            VASTAdResponse.error = _context2.t0;

            return _context2.abrupt('return', [VASTAdResponse].concat(toConsumableArray(vastChain)));

          case 28:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this$7, [[4, 22]]);
  }));

  return function requestAd(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

var getNextPod = function getNextPod(currentPod, ads) {
  var nextPodSequence = getPodAdSequence(currentPod) + 1;

  return ads.find(function (ad) {
    return getPodAdSequence(ad) === nextPodSequence;
  }) || null;
};

var getNextAd = function getNextAd(_ref, _ref2) {
  var ad = _ref.ad,
      parsedXML = _ref.parsedXML;
  var _ref2$fallbackOnNoAd = _ref2.fallbackOnNoAd,
      fallbackOnNoAd = _ref2$fallbackOnNoAd === undefined ? true : _ref2$fallbackOnNoAd,
      _ref2$useAdBuffet = _ref2.useAdBuffet,
      useAdBuffet = _ref2$useAdBuffet === undefined ? false : _ref2$useAdBuffet;

  var ads = getAds(parsedXML);
  var availableAds = ads.filter(function (adDefinition) {
    return !hasAdBeenRequested(adDefinition);
  });
  var nextAd = null;

  if (hasAdPod(parsedXML)) {
    if (useAdBuffet) {
      nextAd = availableAds.filter(function (adDefinition) {
        return !isPodAd(adDefinition);
      })[0];
    }

    if (!nextAd) {
      nextAd = getNextPod(ad, availableAds);
    }
  } else if (availableAds.length > 0 && fallbackOnNoAd) {
    nextAd = availableAds[0];
  }

  return nextAd;
};

var validateChain$1 = function validateChain(VastChain) {
  if (!Array.isArray(VastChain)) {
    throw new TypeError('Invalid VAST chain');
  }

  if (VastChain.length === 0) {
    throw new Error('No next ad to request');
  }
};

// eslint-disable-next-line jsdoc/check-tag-names
/**
 * @function requestNextAd
 *
 * @memberof module:@mailonline/video-ad-sdk
 * @async
 * @static
 * @description Requests the next ad in the VAST Chain.
 *
 * @param {VastChain} VastChain - Array of {@link VastResponse}.
 * @param {Object} options - Options Map. The allowed properties are:
 * @param {number} [options.wrapperLimit] - Sets the maximum number of wrappers allowed in the vastChain.
 *  Defaults to `5`.
 * @param {boolean} [options.AllowMultipleAds] - Boolean to indicate whether adPods are allowed or not.
 *  Defaults to `true`.
 * @param {tracker} [options.track] - optional function to track whatever errors occur during the loading.
 *  Defaults to `@mailonline/video-ad-tracker` track method.
 * @param {boolean} [options.useAdBuffet] - Specifies whether to use buffet ads from an ad pod if possible.
 *    If no buffet ad is available it will return the next ad in ad pod sequence.
 *    Set it to true if an ad from an adPod failed and you want to replace it with an ad from the ad buffet.
 *    Defaults to `false`.
 * @param {boolean} [options.fallbackOnNoAd] - tells the video player to select an ad from any stand-alone ads available.
 *    Note: if the {@link VastChain} contains an adPod this property will be ignored.
 *    Defaults to `true`.
 * @param {number} [options.timeout] - timeout number in milliseconds. If set, the request will timeout if it is not fulfilled before the specified time.
 *
 * @returns {Promise.<VastChain>}  - Returns a Promise that will resolve with a VastChain with the newest VAST response at the beginning of the array.
 * If the {@link VastChain} had an error. The first VAST response of the array will contain an error and an errorCode entry.
 */
var requestNextAd = function requestNextAd(VastChain, options) {
  validateChain$1(VastChain);

  var vastResponse = VastChain[0];
  var nextAd = getNextAd(vastResponse, options);

  if (Boolean(nextAd)) {
    var newVastResponse = Object.assign({}, vastResponse, {
      ad: nextAd
    });
    var newVastChain = [newVastResponse].concat(toConsumableArray(VastChain.slice(1)));

    markAdAsRequested(nextAd);

    if (isWrapper(nextAd)) {
      return requestAd(getVASTAdTagURI(nextAd), options, newVastChain);
    }

    return Promise.resolve(newVastChain);
  }

  return requestNextAd(VastChain.slice(1), options);
};

/* eslint-disable filenames/match-regex */
var isIOS = function isIOS() {
  return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  );
};

var _this$8 = undefined;

var isVpaid = function isVpaid(vastChain) {
  return Boolean(getInteractiveFiles(vastChain[0].ad));
};
var validateVastChain = function validateVastChain(vastChain, options) {
  if (!vastChain || vastChain.length === 0) {
    throw new Error('Invalid VastChain');
  }

  var lastVastResponse = vastChain[0];

  if (!options.vpaidEnabled && isVpaid(vastChain)) {
    var error = new Error('VPAID ads are not supported by the current player');

    error.code = 200;
    lastVastResponse.errorCode = 200;
    lastVastResponse.error = error;
  }

  if (Boolean(lastVastResponse.error)) {
    throw lastVastResponse.error;
  }

  if (options.hooks && typeof options.hooks.validateVastResponse === 'function') {
    options.hooks.validateVastResponse(vastChain);
  }
};

var callbackHandler = function callbackHandler(cb) {
  return function () {
    if (typeof cb === 'function') {
      cb.apply(undefined, arguments);
    }
  };
};

var getErrorCode = function getErrorCode(vastChain, error) {
  return vastChain && vastChain[0] && vastChain[0].errorCode || error.code;
};
var transformVastResponse = function transformVastResponse(vastChain, _ref) {
  var hooks = _ref.hooks;

  if (hooks && typeof hooks.transformVastResponse === 'function') {
    return hooks.transformVastResponse(vastChain);
  }

  return vastChain;
};

// eslint-disable-next-line complexity
var waterfall = function () {
  var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(fetchVastChain, placeholder, options, isCanceled) {
    var vastChain, runEpoch, adUnit, opts, onAdStart, onError, onRunFinish, newEpoch, errorCode, tracker;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            vastChain = void 0;
            runEpoch = void 0;
            adUnit = void 0;
            opts = _extends({}, options);
            onAdStart = opts.onAdStart, onError = opts.onError, onRunFinish = opts.onRunFinish;
            _context.prev = 5;

            if (typeof opts.timeout === 'number') {
              runEpoch = Date.now();
            }

            _context.next = 9;
            return fetchVastChain();

          case 9:
            vastChain = _context.sent;

            if (!isCanceled()) {
              _context.next = 13;
              break;
            }

            onRunFinish();

            return _context.abrupt('return');

          case 13:

            if (runEpoch) {
              newEpoch = Date.now();


              opts.timeout -= newEpoch - runEpoch;
              runEpoch = newEpoch;
            }

            validateVastChain(vastChain, opts);

            _context.next = 17;
            return run(transformVastResponse(vastChain, opts), placeholder, _extends({}, opts));

          case 17:
            adUnit = _context.sent;

            if (!isCanceled()) {
              _context.next = 22;
              break;
            }

            adUnit.cancel();
            onRunFinish();

            return _context.abrupt('return');

          case 22:

            adUnit.onError(onError);
            adUnit.onFinish(onRunFinish);
            onAdStart(adUnit);
            _context.next = 38;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](5);
            errorCode = getErrorCode(vastChain, _context.t0);


            if (Boolean(errorCode)) {
              tracker = options.tracker;


              trackError(vastChain, {
                errorCode: errorCode,
                tracker: tracker
              });
            }

            onError(_context.t0, {
              adUnit: adUnit,
              vastChain: vastChain
            });

            if (!(vastChain && !isCanceled())) {
              _context.next = 37;
              break;
            }

            if (runEpoch) {
              opts.timeout -= Date.now() - runEpoch;
            }

            if (!(!runEpoch || opts.timeout > 0)) {
              _context.next = 37;
              break;
            }

            waterfall(function () {
              return requestNextAd(vastChain, opts);
            }, placeholder, _extends({}, opts), isCanceled);

            return _context.abrupt('return');

          case 37:

            onRunFinish();

          case 38:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$8, [[5, 27]]);
  }));

  return function waterfall(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Will try to start one of the ads returned by the `adTag`. It will keep trying until it times out or it runs out of ads.
 *
 * @memberof module:@mailonline/video-ad-sdk
 * @static
 * @alias runWaterfall
 * @param {string} adTag - The VAST ad tag request url.
 * @param {HTMLElement} placeholder - placeholder element that will contain the video ad.
 * @param {Object} [options] - Options Map. The allowed properties are:
 * @param {HTMLVideoElement} [options.videoElement] - optional videoElement that will be used to play the ad.
 * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 * Defaults to `window.console`
 * @param {number} [options.wrapperLimit] - Sets the maximum number of wrappers allowed in the {@link VastChain}.
 *  Defaults to `5`.
 * @param {runWaterfall~onAdReady} [options.onAdReady] - will be called once the ad is ready with the ad unit.
 * @param {runWaterfall~onAdStart} [options.onAdStart] - will be called once the ad starts with the ad unit.
 * @param {runWaterfall~onError} [options.onError] - will be called if there is an error with the video ad with the error instance and an obj with the {@link VastChain} and the ad unit if it exists.
 * @param {runWaterfall~onRunFinish} [options.onRunFinish] - will be called whenever the ad run finishes.
 * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
 * Defaults to `false`
 * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes.
 * Defaults to `false`
 * @param {number} [options.timeout] - timeout number in milliseconds. If set, the video ad will time out if it doesn't start within the specified time.
 * @param {TrackerFn} [options.tracker] - If provided it will be used to track the VAST events instead of the default {@link pixelTracker}.
 * @param {boolean} [options.vpaidEnabled] - if false and it gets a VPAID ad, it will throw an error before starting the ad and continue down in the waterfall.
 * Defaults to `true`.
 * @param {Object} [options.hooks] - Optional map with hooks to configure the behaviour of the ad.
 * @param {Function} [options.hooks.createSkipControl] - If provided it will be called to generate the skip control. Must return a clickable [HTMLElement](https://developer.mozilla.org/es/docs/Web/API/HTMLElement) that is detached from the DOM.
 * @param {Function} [options.hooks.validateVastResponse] - If provided it will be called passing the current {@link VastChain} for each valid vast response. Must throw if there is a problem with the vast response. If the Error instance has an `code` number then it will be tracked using the error macros in the Vast response. It will also call {@link runWaterfall~onError} with the thrown error.
 * @param {Function} [options.hooks.transformVastResponse] - If provided it will be called with the current {@link VastChain} before building the adUnit allowing the modification of the vastResponse if needed.
 * @returns {Function} - Cancel function. If called it will cancel the ad run. {@link runWaterfall~onRunFinish} will still be called;
 */
var runWaterfall = function runWaterfall(adTag, placeholder, options, rawXml, key) {
  var canceled = false;
  var adUnit = null;
  var isCanceled = function isCanceled() {
    return canceled;
  };
  var onAdStartHandler = callbackHandler(options.onAdStart);
  var onAdStart = function onAdStart(newAdUnit) {
    adUnit = newAdUnit;
    adUnit.key = key;
    onAdStartHandler(adUnit);
  };

  var opts = _extends({
    vpaidEnabled: true
  }, options, {
    // eslint-disable-next-line sort-keys
    onAdReady: callbackHandler(options.onAdReady),
    onAdStart: onAdStart,
    onError: callbackHandler(options.onError),
    onRunFinish: callbackHandler(options.onRunFinish)
  });

  if (options.videoElement && isIOS()) {
    /*
      It seems that if the video doesn't load synchronously inside a touchend or click event handler, the user gesture breaks on iOS and it won't allow a play.
    */
    options.videoElement.load();
  }

  waterfall(function () {
    return requestAd(adTag, opts, [], rawXml);
  }, placeholder, opts, isCanceled);

  return function () {
    canceled = true;

    if (adUnit && !adUnit.isFinished()) {
      adUnit.cancel();
    }
  };
};

var getAdSystem = function getAdSystem(ad) {
  var adTypeElement = getFirstChild(ad);
  var element = adTypeElement && get(adTypeElement, 'AdSystem');

  if (element) {
    return getText(element);
  }

  return undefined;
};

var getSubElementValue = function getSubElementValue(parentElement, tagName) {
  var element = parentElement && get(parentElement, tagName);

  if (element) {
    return getText(element);
  }

  return undefined;
};

var getPricingElement = function getPricingElement(ad) {
  var adTypeElement = getFirstChild(ad);

  return adTypeElement && get(adTypeElement, 'Pricing');
};

var getPricing = function getPricing(vastChain) {
  var ad = vastChain[0].ad;

  var pricingElement = getPricingElement(ad);

  if (pricingElement) {
    return {
      pricing: getText(pricingElement),
      pricingCurrency: getAttribute(pricingElement, 'currency'),
      pricingModel: getAttribute(pricingElement, 'model')
    };
  }

  if (vastChain.length > 1) {
    return getPricing(vastChain.slice(1));
  }

  return {};
};

var getCategory = function getCategory(ad) {
  var inLineElement = get(ad, 'InLine');
  var categoryElement = inLineElement && get(inLineElement, 'Category');

  if (categoryElement) {
    return {
      category: getText(categoryElement),
      categoryAuthority: getAttribute(categoryElement, 'authority')
    };
  }

  return {};
};

var getVastVersion = function getVastVersion(parsedVast) {
  var vastElement = parsedVast && get(parsedVast, 'VAST');

  if (vastElement) {
    return getAttribute(vastElement, 'version');
  }

  return 'unknown';
};

/**
 * @function getDetails
 *
 * @memberof module:@mailonline/video-ad-sdk
 * @static
 * @description Returns a summary of the passed {@link VastChain}.
 *
 * @param {VastChain} vastChain - the {@link VastChain} from which we want the details.
 *
 * @returns {VastChainDetails} - Returns a {@link VastChainDetails} object from the passed {@link VastChain}.
 */
var getDetails = function getDetails(vastChain) {
  var adIds = vastChain.map(function (_ref) {
    var ad = _ref.ad;
    return getAttribute(ad, 'id');
  });
  var adSystems = vastChain.map(function (_ref2) {
    var ad = _ref2.ad;
    return getAdSystem(ad);
  });
  var creatives = vastChain.map(function (_ref3) {
    var ad = _ref3.ad;
    return getLinearCreative(ad);
  }).filter(function (creative) {
    return Boolean(creative);
  });
  var creativeIds = creatives.map(function (creative) {
    return getAttribute(creative, 'id');
  });
  var creativeAdIds = creatives.map(function (creative) {
    return getAttribute(creative, 'adId');
  });

  var _getPricing = getPricing(vastChain),
      pricing = _getPricing.pricing,
      pricingCurrency = _getPricing.pricingCurrency,
      pricingModel = _getPricing.pricingModel;

  var _getCategory = getCategory(vastChain[0].ad),
      category = _getCategory.category,
      categoryAuthority = _getCategory.categoryAuthority;

  var adTypeElement = getFirstChild(vastChain[0].ad);
  var creativeElement = getLinearCreative(vastChain[0].ad);
  var linearElement = creativeElement && get(creativeElement, 'Linear');
  var adServingId = getSubElementValue(adTypeElement, 'AdServingId');
  var vastVersion = getVastVersion(vastChain[0].parsedXML);
  var advertiser = getSubElementValue(adTypeElement, 'Advertiser');
  var adTitle = getSubElementValue(adTypeElement, 'AdTitle');
  var description = getSubElementValue(adTypeElement, 'Description');
  var duration = getSubElementValue(linearElement, 'Duration');
  var durationInMs = duration && parseTime(duration);
  var adId = void 0;
  var adWrapperIds = [];
  var adSystem = void 0;
  var adWrapperSystems = [];
  var creativeId = void 0;
  var adWrapperCreativeIds = [];
  var creativeAdId = void 0;
  var adWrapperCreativeAdIds = [];
  var clickThroughUrl = void 0;
  var creativeData = void 0;
  var universalAdId = void 0;
  var universalAdIdRegistry = void 0;
  var mediaFiles = [];
  var vpaid = void 0;
  var skippable = void 0;
  var skipOffset = void 0;
  var skipOffsetInMs = void 0;

  if (isInline(vastChain[0].ad)) {
    var _adIds = toArray(adIds);

    adId = _adIds[0];
    adWrapperIds = _adIds.slice(1);

    var _adSystems = toArray(adSystems);

    adSystem = _adSystems[0];
    adWrapperSystems = _adSystems.slice(1);

    var _creativeIds = toArray(creativeIds);

    creativeId = _creativeIds[0];
    adWrapperCreativeIds = _creativeIds.slice(1);

    var _creativeAdIds = toArray(creativeAdIds);

    creativeAdId = _creativeAdIds[0];
    adWrapperCreativeAdIds = _creativeAdIds.slice(1);


    clickThroughUrl = getClickThrough(vastChain[0].ad);
    creativeData = getCreativeData(vastChain[0].XML);
    var universalIdElement = get(creativeElement, 'UniversalAdId');

    universalAdId = getText(universalIdElement);
    universalAdIdRegistry = getAttribute(universalIdElement, 'idRegistry');
    mediaFiles = getMediaFiles(vastChain[0].ad);
    vpaid = Boolean(getInteractiveFiles(vastChain[0].ad));
    skipOffset = getAttribute(linearElement, 'skipoffset');
    skipOffsetInMs = parseTime(skipOffset);
    skippable = Boolean(skipOffset);
  } else if (isWrapper(vastChain[0].ad)) {
    adWrapperIds = adIds;
    adWrapperSystems = adSystems;
    adWrapperCreativeIds = creativeIds;
    adWrapperCreativeAdIds = creativeAdIds;
  }

  return {
    adId: adId,
    adServingId: adServingId,
    adSystem: adSystem,
    adTitle: adTitle,
    advertiser: advertiser,
    adWrapperCreativeAdIds: adWrapperCreativeAdIds,
    adWrapperCreativeIds: adWrapperCreativeIds,
    adWrapperIds: adWrapperIds,
    adWrapperSystems: adWrapperSystems,
    category: category,
    categoryAuthority: categoryAuthority,
    clickThroughUrl: clickThroughUrl,
    creativeAdId: creativeAdId,
    creativeData: creativeData,
    creativeId: creativeId,
    description: description,
    duration: duration,
    durationInMs: durationInMs,
    mediaFiles: mediaFiles,
    pricing: pricing,
    pricingCurrency: pricingCurrency,
    pricingModel: pricingModel,
    skipOffset: skipOffset,
    skipOffsetInMs: skipOffsetInMs,
    skippable: skippable,
    universalAdId: universalAdId,
    universalAdIdRegistry: universalAdIdRegistry,
    vastVersion: vastVersion,
    vpaid: vpaid
  };
};

/**
 * @module @mailonline/video-ad-sdk
 * @description Video ad SDK to load and play HTML5 video ads.
 */

export { getDetails, run, runWaterfall, requestAd, requestNextAd, index as vastSelectors };
//# sourceMappingURL=main.esm.js.map
