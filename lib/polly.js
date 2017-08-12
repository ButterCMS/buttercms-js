'use strict';

var defaults = {
  delay: 100
};

function executeForPromiseWithDelay(config, cb) {
  return new Promise(function (resolve, reject) {
    function execute() {
      var original = cb();

      original.then(function (e) {
        resolve(e);
      }, function (e) {
        var delay = config.delays.shift();

        if (delay && config.handleFn(e)) {
          setTimeout(execute, delay);
        } else {
          reject(e);
        }
      });
    }

    execute();
  });
}

function delayCountToDelays(count) {
  var delays = [], delay = defaults.delay;

  for (var i = 0; i < count; i++) {
    delays.push(delay);
    delay = 2 * delay;
  }

  return delays;
}

var pollyFn = function () {
  var config = {
    count: 1,
    delays: [defaults.delay],
    handleFn: function () {
      return true;
    }
  };

  return {
    handle: function (handleFn) {
      if (typeof handleFn === 'function') {
        config.handleFn = handleFn;
      }

      return this;
    },
    waitAndRetry: function (delays) {
      if (typeof delays === 'number') {
        delays = delayCountToDelays(delays);
      }

      if (Array.isArray(delays)) {
        config.delays = delays;
      }

      return {
        executeForPromise: executeForPromiseWithDelay.bind(null, config)
      };
    }
  };
};

pollyFn.defaults = defaults;

module.exports = pollyFn;
