(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.hyperappFx = {}));
}(this, function (exports) { 'use strict';

  function dispatchEffect(dispatch, props) {
    dispatch(props.action);
  }

  /**
   * Describes an effect that will dispatch whatever action is passed to it. Useful for batching actions and FX together.
   *
   * @memberof module:fx
   * @param {*} action - an action to dispatch
   * @example
   * import { Dispatch } from "hyperapp-fx"
   *
   * const BatchedFxAndActions = state => [
   *   state,
   *   SomeFx,
   *   Dispatch(SomeAction)
   * ]
   */
  function Dispatch(action) {
    return [dispatchEffect, { action: action }]
  }

  function consoleEffect(_, args) {
    // eslint-disable-next-line no-console
    console.log.apply(null, args);
  }

  /**
   * Describes an effect that will call [`console.log`](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) with arguments. Useful for development and debugging. Not recommended for production.
   *
   * @memberof module:fx
   * @param {...*} args - arguments to log to the console
   * @example
   * import { Console } from "hyperapp-fx"
   *
   * const ConsoleAction = state => [
   *   state,
   *   Console(
   *     "string arg",
   *     { object: "arg" },
   *     ["list", "of", "args"],
   *     someOtherArg
   *   )
   * ]
   */
  function Console() {
    return [consoleEffect, arguments]
  }

  function generateRandom(props) {
    if (props.values) {
      return props.values.map(generateRandom)
    }
    var min = props.min || 0;
    var max = props.max || 1;
    if (props.int) max++;
    if (props.bool) {
      min = 0;
      max = 2;
    }
    var randomValue = Math.random() * (max - min) + min;
    if (props.int || props.bool) {
      randomValue = Math.floor(randomValue);
    }
    if (props.bool) {
      randomValue = !!randomValue;
    }
    return randomValue
  }

  function randomEffect(dispatch, props) {
    var randomValue = generateRandom(props);
    dispatch(props.action, randomValue);
  }

  /**
   * Describes an effect that will call an action with one or more randomly generated value(s).
   * If provided the range for [random numeric values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) will be `[min, max)` or else the default range is `[0, 1)`. Also `bool`eans, `int`egers, and arrays of `values` are supported. The random value will be provided as the action `data`.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {*} props.action - action to call with the random number result
   * @param {number} props.min - minimum random number to generate
   * @param {number} props.max - maximum random number to generate
   * @param {boolean} props.int - round number to nearest integer
   * @param {boolean} props.bool - generate a boolean instead of a number (ignores numeric options)
   * @param {array(object)} props.values - generate an array of values (ignores other options, each object accepts same props as the root)
   * @example
   * import { Random } from "hyperapp-fx"
   *
   * const RollDie = state => [
   *   state,
   *   Random({
   *     min: 1,
   *     max: 6,
   *     int: true,
   *     action: (_, roll) => {
   *       // roll will be an int from 1-6
   *
   *       // return new state using roll
   *     }
   *   })
   * ]
   */
  function Random(props) {
    return [randomEffect, props]
  }

  function assign(source, assignments) {
    var result = {},
      i;
    for (i in source) result[i] = source[i];
    for (i in assignments) result[i] = assignments[i];
    return result
  }

  function makeRemoveListener(attachTo, dispatch, action, eventName) {
    var handler = dispatch.bind(null, action);
    attachTo.addEventListener(eventName, handler);
    return function() {
      attachTo.removeEventListener(eventName, handler);
    }
  }

  function makeDispatchTime(dispatch, props) {
    return function() {
      dispatch(props.action, props.asDate ? new Date() : performance.now());
    }
  }

  var webSocketConnections = {};

  function getOpenWebSocket(props) {
    var connection = webSocketConnections[props.url];
    if (!connection) {
      connection = {
        socket: new WebSocket(props.url, props.protocols),
        listeners: []
      };
      webSocketConnections[props.url] = connection;
    }
    return connection
  }

  function closeWebSocket(props) {
    var connection = getOpenWebSocket(props);
    // FIXME: handle close on opening
    connection.socket.close();
    delete webSocketConnections[props.url];
  }

  function httpEffect(dispatch, props) {
    fetch(props.url, props.options)
      .then(function(response) {
        if (!response.ok) {
          throw response
        }
        return response
      })
      .then(function(response) {
        return response[props.response]()
      })
      .then(function(result) {
        dispatch(props.action, result);
      })
      .catch(function(error) {
        dispatch(props.error, error);
      });
  }

  /**
   * Describes an effect that will send an HTTP request using [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) and then call an action with the response. If you are using a browser from the Proterozoic Eon like Internet Explorer you will want one of the [available](https://github.com/developit/unfetch) `fetch` [polyfills](https://github.com/github/fetch).
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.url - URL for sending HTTP request
   * @param {object} props.options - same [options as `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#Parameters)
   * @param {string} props.response - Specify which method to use on the response body, defaults to `"json"`, other [supported methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods) include `"text"`
   * @param {*} props.action - Action to call with the results of a successful HTTP response
   * @param {*} props.error - Action to call if there is a problem making the request or a not-ok HTTP response, defaults to the same action defined for success
   * @example
   * import { Http } from "hyperapp-fx"
   *
   * const Login = state => [
   *   state,
   *   Http({
   *     url: "/login",
   *     options: {
   *       method: "POST",
   *       body: form
   *     },
   *     action(state, loginResponse) {
   *       // loginResponse will have the JSON-decoded response from POSTing to /login
   *     },
   *     error(state, error) {
   *       // please handle your errors...
   *     }
   *   })
   * ]
   */
  function Http(props) {
    return [
      httpEffect,
      assign(
        {
          options: {},
          response: "json",
          error: props.action
        },
        props
      )
    ]
  }

  function mergeEffect(dispatch, props) {
    dispatch(function(state) {
      return assign(state, props.action(state))
    });
  }

  /**
   * Describes an effect that will shallow-merge the results from actions that return partial state.
   *
   * @memberof module:fx
   * @param {function(object): object} action - an action function that takes state and returns a partial new state which will be shallow-merged with the previous state
   * @example
   * import { Merge } from "hyperapp-fx"
   *
   * const MergingAction = state => [
   *   state,
   *   Merge(ActionReturningPartialState)
   * ]
   */
  function Merge(action) {
    return [mergeEffect, { action: action }]
  }

  var debounceTimeouts = [];
  function debounceEffect(dispatch, props) {
    var timeout = debounceTimeouts.find(function(nextTimeout) {
      return nextTimeout[0] === props.action
    });
    if (!timeout) {
      timeout = [props.action];
      debounceTimeouts.push(timeout);
    } else {
      clearTimeout(timeout[1]);
    }

    timeout[1] = setTimeout(function() {
      dispatch(props.action);
    }, props.wait);
  }

  /**
   * Describes an effect that will call an action after waiting for a delay to pass. The delay will be reset each time the action is called.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {number} props.wait - delay to wait before calling the action
   * @param {*} props.action - action to debounce
   * @example
   * import { Debounce } from "hyperapp-fx"
   *
   * const OriginalAction = state => {
   *   // This action will run after waiting for 500ms since the last call
   * }
   *
   * const DebouncedAction = state => [
   *   state,
   *   Debounce({
   *     wait: 500,
   *     action: OriginalAction
   *   })
   * ]
   */
  function Debounce(props) {
    return [debounceEffect, props]
  }

  var throttleLocks = [];
  function throttleEffect(dispatch, props) {
    var lock = throttleLocks.find(function(nextLock) {
      return nextLock[0] === props.action
    });
    if (!lock) {
      lock = [props.action];
      throttleLocks.push(lock);
    }

    if (!lock[1]) {
      dispatch(props.action);
      lock[1] = true;
      setTimeout(function() {
        lock[1] = false;
      }, props.rate);
    }
  }

  /**
   * Describes an effect that will call an action at a maximum rate. Where `rate` is one call per `rate` milliseconds.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {number} props.rate - minimum time between action calls
   * @param {*} props.action - action to throttle
   * @example
   * import { Throttle } from "hyperapp-fx"
   *
   * const OriginalAction = state => {
   *   // This action will only run once per 500ms
   * }
   *
   * const ThrottledAction = state => [
   *   state,
   *   Throttle({
   *     rate: 500,
   *     action: OriginalAction
   *   })
   * ]
   */
  function Throttle(props) {
    return [throttleEffect, props]
  }

  function storageArea(area) {
    return window[area + "Storage"] || localStorage
  }

  function writeToStorageEffect(_, props) {
    var value = props.converter(props.value);
    storageArea(props.area).setItem(props.key, value);
  }

  function readFromStorageEffect(dispatch, props) {
    try {
      var value = props.converter(storageArea(props.area).getItem(props.key));
      var dispatchProps = assign({}, props.props || {});
      dispatchProps[props.prop || "value"] = value;
      dispatch(props.action, dispatchProps);
    } catch (error) {
      dispatch(props.error);
    }
  }

  function removeFromStorageEffect(_, props) {
    storageArea(props.area).removeItem(props.key);
  }

  /**
   * Describes an effect that will write a key value pair to Storage. By default the item is written to [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), to write to [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) set the `storage` prop to `session`. Values are saved in JSON, unless a custom converter is provided.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.key - Specify key to use
   * @param {*} props.value - Value to write to storage
   * @param {string} props.storage - Storage area to write to, can be either "session" or "local"
   * @param {function} props.converter - Use a custom converter function to encode the value of the item
   * @example
   * import { WriteToStorage } from "hyperapp-fx"
   *
   * const SavePreferences = (state, preferences) => [
   *   state,
   *   WriteToStorage({
   *     key: "preferences",
   *     value: preferences,
   *     storage: "local"
   *   })
   * ]
   *
   */

  function WriteToStorage(props) {
    return [
      writeToStorageEffect,
      assign(
        {
          converter: props.converter || JSON.stringify
        },
        props
      )
    ]
  }

  /**
   * Describes an effect that will read the value of a key from Storage. By default the item is read from [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), to read from [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) set the `storage` prop to `session`. Values are converted from JSON, unless a custom converter is provided.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.key - Specify key to use with which to write to storage
   * @param {*} props.action - Action to call with the value of the item in storage
   * @param {string} props.storage - Storage area to read from, can be either "session" or "local"
   * @param {string} props.prop - Property of the action where the value is received, defaults to "value"
   * @param {function} props.converter - Use a custom converter function to decode the value of the item
   * @example
   * import { ReadFromStorage } from "hyperapp-fx"
   *
   * const LoadPreferences = state => [
   *  state,
   *  ReadFromStorage({
   *    key: "preferences",
   *    action: function (state, { value }) {
   *      // this action will receive the value of the item in storage
   *    }
   *  })
   * ]
   *
   */

  function ReadFromStorage(props) {
    return [
      readFromStorageEffect,
      assign(
        {
          converter: props.converter || JSON.parse,
          error: props.error
        },
        props
      )
    ]
  }

  /**
   * Describes an effect that will remove a key value pair Storage. By default the item is deleted from [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), to delete from [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) set the `storage` prop to `session`.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.key - Specify key to delete from storage
   * @param {string} props.storage - Storage area to delete from, can be either "session" or "local"
   * @example
   * import { RemoveFromStorage } from "hyperapp-fx"
   *
   * const ClearPreferences = state => [
   *  state,
   *  RemoveFromStorage({
   *    key: "preferences",
   *    storage: "local"
   *  })
   * ]
   *
   */

  function RemoveFromStorage(props) {
    return [removeFromStorageEffect, props]
  }

  function historyPushEffect(dispatch, props) {
    var title = props.title || document.title;
    var url = props.url || location.href;

    history.pushState(props.state, title, url);
  }

  function historyReplaceEffect(dispatch, props) {
    var title = props.title || document.title;
    var url = props.url || location.href;

    history.replaceState(props.state, title, url);
  }

  /**
   * Describes an effect that will add an entry to the browsers navigation [`history`](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries) with the supplied location and state.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {*} props.state - data to add to browser history
   * @param {string} props.url - url to add to browser history
   * @param {string} props.title - title to set document to
   * @example
   * import { HistoryPush } from "hyperapp-fx"
   *
   * export const UpdateHistory = state => [
   *   state,
   *   HistoryPush({
   *     state,
   *     title: document.title,
   *     url: '#foo'
   *   })
   * ]
   */

  function HistoryPush(props) {
    return [historyPushEffect, props]
  }

  /**
   * Describes an effect that will replace the browsers current [`history`](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries) navigation entry with the supplied location and state.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {*} props.state - data to add to browser history
   * @param {string} props.url - url to add to browser history
   * @param {string} props.title - title to set document to
   * @example
   * import { HistoryReplace } from "hyperapp-fx"
   *
   * export const InitialiseHistory = state => [
   *   state,
   *   HistoryReplace({
   *     state,
   *     title: document.title,
   *     url: '#foo'
   *   })
   * ]
   */

  function HistoryReplace(props) {
    return [historyReplaceEffect, props]
  }

  var validCookieNameChars =
    "abdefghijklmnqrstuvxyzABDEFGHIJKLMNQRSTUVXYZ0123456789!#$%&'*+-.^_`|~";
  var validCookieValueChars = validCookieNameChars + "()/:<>?@[]{}";

  function nameEncoder(value) {
    return value
      .toString()
      .split("")
      .map(function(c) {
        return validCookieNameChars.indexOf(c) > -1 ? c : encodeURIComponent(c)
      })
      .join("")
  }

  function valueEncoder(value) {
    return value
      .toString()
      .split("")
      .map(function(c) {
        return validCookieValueChars.indexOf(c) > -1 ? c : encodeURIComponent(c)
      })
      .join("")
  }

  function writeCookie(name, value, attributes) {
    var attrs = Object.keys(attributes)
      .map(function(k) {
        return k + "=" + attributes[k]
      })
      .join(";");
    document.cookie = name + "=" + value + (attrs ? ";" + attrs : "");
  }

  function readCookieEffect(dispatch, props) {
    var cookies = document.cookie.split("; ");
    var cookie = cookies.find(function(c) {
      return c.substr(0, c.indexOf("=")) === props.nameEncoder(props.name)
    });
    if (cookie) {
      var dispatchProps = assign({}, props.props || {});
      dispatchProps[props.prop || "value"] = props.converter(
        props.decoder(cookie.substr(props.nameEncoder(props.name).length + 1))
      );
      dispatch(props.action, dispatchProps);
    }
  }

  function writeCookieEffect(dispatch, props) {
    var name = (props.nameEncoder || nameEncoder)(props.name);
    var value = (props.encoder || valueEncoder)(props.converter(props.value));
    var attributes = {};
    if (props.ttl)
      props.expires = new Date(new Date().getTime() + props.ttl * 1000);
    if (props.path) attributes.path = props.path;
    if (props.domain) attributes.domain = props.domain;
    if (props.expires) attributes.expires = props.expires.toUTCString();

    writeCookie(name, value, attributes);
  }

  /**
   * Describes an effect that will read a cookie and then call an action with its value. If no `prop` is specified the action will receive the value of the cookie in the `value` prop. Extra properties may be added using by specifying `props`. If `json` is set to `true` the value will be converted from JSON.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.name - Name of the cookie
   * @param {string} props.action - Action to call when cookie is read
   * @param {string} props.prop - Name of prop to which the cookie value is passed
   * @param {object} props.props - Props to pass to action
   * @param {boolean} props.json - Indicates whether cookie value should be converted from JSON
   * @param {function} props.converter - Function used to convert cookie value
   * @param {function} props.decoder - Function used to decode cookie value
   * @example
   * import { ReadCookie } from "hyperapp-fx"
   *
   * const LoadPreferences = state => [
   *   state,
   *   ReadCookie({
   *     name: "preferences",
   *     action: function (state, { value }) {
   *       // this action will receive the cookie value
   *     },
   *     json: true
   *   })
   * ]
   */

  function ReadCookie(props) {
    return [
      readCookieEffect,
      assign(
        {
          nameEncoder: nameEncoder,
          converter:
            props.converter || props.json
              ? JSON.parse
              : function(v) {
                  return v
                },
          decoder: props.decoder || decodeURIComponent
        },
        props
      )
    ]
  }

  /**
   * Describes an effect that will write a cookie.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.name - Name of the cookie
   * @param {string} props.value - Value to save in cookie
   * @param {string} props.domain - Domain of the cookie
   * @param {string} props.path - Path of the cookie
   * @param {date} props.expires - Expiry date of the cookie
   * @param {number} props.ttl - Time to live of the cookie in seconds, this property has precedence over the `expires` property
   * @param {boolean} props.json - Indicates whether the cookie value should be converted to JSON
   * @param {function} props.nameEncoder - Function used to encode the cookie name
   * @param {function} props.converter - Function used to convert cookie value
   * @param {function} props.encoder - Function used to encode cookie value
   * @example
   * import { WriteCookie } from "hyperapp-fx"
   *
   * const SavePreferences = state => [
   *   state,
   *   WriteCookie({
   *     name: "preferences",
   *     value: state.preferences
   *     json: true
   *   })
   * ]
   */

  function WriteCookie(props) {
    return [
      writeCookieEffect,
      assign(
        {
          converter:
            props.converter || props.json
              ? JSON.stringify
              : function(v) {
                  return v
                }
        },
        props
      )
    ]
  }

  /**
   * Describes an effect that will delete a cookie. 
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.name - Name of the cookie to delete

   * @example
   * import { DeleteCookie } from "hyperapp-fx"
   * 
   *  const ClearPreferences = state => [
   *   state,
   *   DeleteCookie({
   *     name: "preferences"
   *   })
   * ]
   */

  function DeleteCookie(props) {
    return WriteCookie(assign(props, { ttl: -1, value: "" }))
  }

  function nowEffect(dispatch, props) {
    makeDispatchTime(dispatch, props)();
  }

  function delayEffect(dispatch, props) {
    setTimeout(makeDispatchTime(dispatch, props), props.wait);
  }

  /**
   * Describes an effect that provides the current timestamp (using [`performance.now`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)) or current date (using [`new Date()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Syntax)). The timestamp/date will be provided as the action `data`.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {boolean} props.asDate - use a Date object instead of a timestamp
   * @param {*} props.action - action to call with the timestamp/date
   * @example
   * import { Now } from "hyperapp-fx"
   *
   * const NowAction = state => [
   *   state,
   *   Now({
   *     asDate: true,
   *     action(currentDate) {
   *     }
   *   })
   * ]
   */
  function Now(props) {
    return [nowEffect, props]
  }

  /**
   * Describes an effect that provides a timestamp (using [`performance.now`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)) or date (using [`new Date()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Syntax)) after a delay. The timestamp/date will be provided as the action `data`.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {number} props.wait - delay to wait before calling action
   * @param {boolean} props.asDate - use a Date object instead of a timestamp
   * @param {*} props.action - action to call with the timestamp/date
   * @example
   * import { Delay } from "hyperapp-fx"
   *
   * const DelayedAction = state => [
   *   state,
   *   Delay({
   *     wait: 500,
   *     action() {
   *       // This action will run after a 500ms delay
   *     }
   *   })
   * ]
   */
  function Delay(props) {
    return [delayEffect, props]
  }

  function webSocketSendEffect(dispatch, props) {
    var connection = getOpenWebSocket(props);
    function sendMessage() {
      connection.socket.send(props.data);
      connection.socket.removeEventListener("open", sendMessage);
    }
    if (connection.socket.readyState === WebSocket.CONNECTING) {
      connection.socket.addEventListener("open", sendMessage);
    } else {
      sendMessage();
    }
  }

  /**
   * Describes an effect that will open a [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) connection for a given URL (and optional protocols) and send a message reusing existing connections.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {string} props.url - The URL to which to connect; this should be the URL to which the WebSocket server will respond
   * @param {string | string[]} props.protocols - Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified `protocol`). If you don't specify a protocol string, an empty string is assumed.
   * @param {*} props.data - data to send once connected
   * @example
   * import { WebSocketSend } from "hyperapp-fx"
   *
   *  const SendAction = state => [
   *   state,
   *   WebSocketSend({
   *     url: "wss://example.com",
   *     data: JSON.stringify({
   *       sendThisData: "on connecting"
   *     })
   *   })
   * ]
   */
  function WebSocketSend(props) {
    return [webSocketSendEffect, props]
  }

  function getCurrentPositionEffect(dispatch, props) {
    navigator.geolocation.getCurrentPosition(
      function(result) {
        return dispatch(props.action, result)
      },
      function(error) {
        return dispatch(props.error, error)
      },
      props.options
    );
  }

  /**
   * Describes an effect that will get the current user's location using the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) and then call an action with the coordinates.
   *
   * @memberof module:fx
   * @param {object} props
   * @param {*} props.action - Action to call with the position
   * @param {*} props.error - Action to call if there is a problem getting the position
   * @param {object} props.options - An optional [`PositionOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object
   * @example
   * import { GetCurrentPosition } from "hyperapp-fx"
   *
   * const WhereAmI = state => [
   *   state,
   *   GetCurrentPosition({
   *     action(state, position) {
   *       console.log(position);
   *     },
   *     error(state, error) {
   *       // please handle your errors...
   *     }
   *   })
   * ]
   */
  function GetCurrentPosition(props) {
    return [getCurrentPositionEffect, props]
  }

  /**
   * @module fx
   */

  function intervalEffect(dispatch, props) {
    var dispatchTime = makeDispatchTime(dispatch, props);
    var everyInterval = setInterval(dispatchTime, props.every);
    return function() {
      everyInterval && clearInterval(everyInterval);
    }
  }

  /**
   * Describes an effect that provides a timestamp (using [`performance.now`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)) or date (using [`new Date()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Syntax)) at a regular interval. The timestamp/date will be provided as the action `data`.
   *
   * @memberof module:subs
   * @param {object} props
   * @param {boolean} props.asDate - use a Date object instead of a timestamp
   * @param {number} props.every - get the time repeatedly after waiting a set interval
   * @param {*} props.action - action to call with the timestamp/date
   * @example
   * import { h, app } from "hyperapp"
   * import { Now, Interval } from "hyperapp-fx"
   *
   * const UpdateDate = (_, date) =>
   *   date.toLocaleString("uk", {
   *     hour: "numeric",
   *     minute: "numeric",
   *     second: "numeric"
   *   })
   *
   * const InitialTime = Now({
   *   asDate: true,
   *   action: UpdateDate
   * })
   *
   * const TimeSub = Interval({
   *   every: 100,
   *   asDate: true,
   *   action: UpdateDate
   * })
   *
   * app({
   *   init: ["", InitialTime],
   *   view: time => <h1>{time}</h1>,
   *   container: document.body,
   *   subscriptions: () => [TimeSub]
   * })
   */
  function Interval(props) {
    return [intervalEffect, props]
  }

  function animationEffect(dispatch, action) {
    var cancelId;

    function frame(timestamp) {
      dispatch(action, timestamp);
      cancelId = requestAnimationFrame(frame);
    }

    cancelId = requestAnimationFrame(frame);
    return function() {
      cancelAnimationFrame(cancelId);
    }
  }

  /**
   * Describes an effect that will call an action from inside a [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) loop, which is also where the render triggered by the action will run.
   * A relative timestamp will be provided as the action `data`.
   *
   * @memberof module:subs
   * @param {*} action - action to call inside a requestAnimationFrame loop
   * @example
   * import { h, app } from "hyperapp"
   * import { Animation, Merge } from "hyperapp-fx"
   *
   * const UpdateTime = time => ({ time: lastTime, delta: lastDelta }) => ({
   *   time,
   *   delta: time && lastTime ? time - lastTime : lastDelta
   * })
   *
   * const AnimationFrame = (state, time) => [
   *   state,
   *   Merge(UpdateTime(time)),
   *   Merge(UpdateStateForDelta),
   *   Merge(UpdateMoreStateForDelta),
   *   // ...
   * ]
   *
   * app({
   *   init: {
   *     time: 0,
   *     delta: 0,
   *     running: true
   *   }
   *   // ...
   *   subscriptions: ({ running }) => (running ? [Animation(AnimationFrame)] : [])
   * })
   */
  function Animation(action) {
    return [animationEffect, action]
  }

  function keyboardEffect(dispatch, props) {
    var removeListenerForEvent = makeRemoveListener.bind(
      null,
      document,
      dispatch,
      props.action
    );
    var removeDown = props.downs ? removeListenerForEvent("keydown") : null;
    var removeUp = props.ups ? removeListenerForEvent("keyup") : null;
    var removePress = props.presses ? removeListenerForEvent("keypress") : null;
    return function() {
      removeDown && removeDown();
      removeUp && removeUp();
      removePress && removePress();
    }
  }

  /**
   * Describes an effect that can capture [keydown](https://developer.mozilla.org/en-US/docs/Web/Events/keydown), [keyup](https://developer.mozilla.org/en-US/docs/Web/Events/keyup), and [keypress](https://developer.mozilla.org/en-US/docs/Web/Events/keypress) events for your entire document. The [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) will be provided as the action `data`.
   *
   * @memberof module:subs
   * @param {object} props
   * @param {boolean} props.downs - listen for keydown events
   * @param {boolean} props.ups - listen for keyup events
   * @param {boolean} props.presses - listen for keypress events
   * @param {*} props.action - action to call when keyboard events are fired
   * @example
   * import { Keyboard } from "hyperapp-fx"
   *
   * const KeySub = Keyboard({
   *   downs: true,
   *   ups: true,
   *   action: (_, keyEvent) => {
   *     // keyEvent has the props of the KeyboardEvent
   *     // action will be called for keydown and keyup
   *   }
   * })
   */
  function Keyboard(props) {
    return [keyboardEffect, props]
  }

  function webSocketListenEffect(dispatch, props) {
    var connection = getOpenWebSocket(props);
    var removeListen = makeRemoveListener(
      connection.socket,
      dispatch,
      props.action,
      "message"
    );
    connection.listeners.push(removeListen);
    var removeError;
    if (props.error) {
      removeError = makeRemoveListener(
        connection.socket,
        dispatch,
        props.error,
        "error"
      );
      connection.listeners.push(removeError);
    }
    var removeOpen;
    if (props.open) {
      removeOpen = makeRemoveListener(
        connection.socket,
        dispatch,
        props.open,
        "open"
      );
      connection.listeners.push(removeOpen);
    }
    var removeClose;
    if (props.close) {
      removeClose = makeRemoveListener(
        connection.socket,
        dispatch,
        props.close,
        "close"
      );
      connection.listeners.push(removeClose);
    }

    return function() {
      removeListen && removeListen();
      removeError && removeError();
      removeOpen && removeOpen();
      removeClose && removeClose();
      connection.listeners = connection.listeners.filter(function(listener) {
        return (
          listener !== removeListen &&
          listener !== removeError &&
          listener !== removeOpen &&
          listener !== removeClose
        )
      });
      if (connection.listeners.length === 0) {
        closeWebSocket(props);
      }
    }
  }

  /**
   * Describes an effect that will open a [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) connection for a given URL and optional protocols. Connections will remain open until the last subscription for that URL are cancelled.
   *
   * @memberof module:subs
   * @param {object} props
   * @param {string} props.url - The URL to which to connect; this should be the URL to which the WebSocket server will respond
   * @param {string | string[]} props.protocols - Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified `protocol`). If you don't specify a protocol string, an empty string is assumed.
   * @param {*} props.action - action to call with new incoming messages
   * @param {*} props.error - action to call if an error occurs
   * @param {*} props.open - action to call when the socket is opened
   * @param {*} props.close - action to call when the socket is closed
   * @example
   * import { WebSocketListen } from "hyperapp-fx"
   *
   * const WebSocketSub = WebSocketListen({
   *   url: "wss://example.com",
   *   action: ReceivedMessageAction
   * })
   */
  function WebSocketListen(props) {
    return [webSocketListenEffect, props]
  }

  function historyPopEffect(dispatch, props) {
    return makeRemoveListener(window, dispatch, props.action, "popstate")
  }

  /**
   * Describes an effect that will call an action whenever a user navigates through their browser [`history`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView/popstate_event). The action will receive the state at that point in the browsers history.
   *
   * @memberof module:subs
   * @param {*} action - Action to call
   * @example
   * import { h, app } from "hyperapp"
   * import { HistoryPop } from "hyperapp-fx"
   *
   * app({
   *   init: { page: 1 },
   *   view: state => <App page={state.page} />,
   *   container: document.body,
   *   subscriptions: state => [
   *     HistoryPop({ action: (state, event) => event.state || state })
   *   ]
   * })
   */

  function HistoryPop(props) {
    return [historyPopEffect, props]
  }

  function watchPositionEffect(dispatch, props) {
    var cancelId = navigator.geolocation.watchPosition(
      function(result) {
        return dispatch(props.action, result)
      },
      function(error) {
        return dispatch(props.error, error)
      },
      props.options
    );

    return function() {
      navigator.geolocation.clearWatch(cancelId);
    }
  }

  /**
   * Describes an effect that can monitor geolocation using the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), sending updates each time the location is updated
   *
   * @memberof module:subs
   * @param {object} props
   * @param {*} props.action - required action to call each time the location changes
   * @param {*} props.error - optional action to call on error
   * @param {object} props.options - An optional [`PositionOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object
   * @example
   * import { WatchPosition } from "hyperapp-fx"
   *
   * const GeoSub = WatchPosition({
   *   action: (state, position) => {
   *     state.user_location = position.coords,
   *   }
   * })
   */
  function WatchPosition(props) {
    return [watchPositionEffect, props]
  }

  /**
   * @module subs
   */

  exports.Animation = Animation;
  exports.Console = Console;
  exports.Debounce = Debounce;
  exports.Delay = Delay;
  exports.DeleteCookie = DeleteCookie;
  exports.Dispatch = Dispatch;
  exports.GetCurrentPosition = GetCurrentPosition;
  exports.HistoryPop = HistoryPop;
  exports.HistoryPush = HistoryPush;
  exports.HistoryReplace = HistoryReplace;
  exports.Http = Http;
  exports.Interval = Interval;
  exports.Keyboard = Keyboard;
  exports.Merge = Merge;
  exports.Now = Now;
  exports.Random = Random;
  exports.ReadCookie = ReadCookie;
  exports.ReadFromStorage = ReadFromStorage;
  exports.RemoveFromStorage = RemoveFromStorage;
  exports.Throttle = Throttle;
  exports.WatchPosition = WatchPosition;
  exports.WebSocketListen = WebSocketListen;
  exports.WebSocketSend = WebSocketSend;
  exports.WriteCookie = WriteCookie;
  exports.WriteToStorage = WriteToStorage;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=hyperappFx.js.map
