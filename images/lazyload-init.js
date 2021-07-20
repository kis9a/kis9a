(() => {
  // sources/src/modules/js/lazyload.js
  var runningOnBrowser = typeof window !== "undefined";
  var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
  var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;
  var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");
  var isHiDpi = runningOnBrowser && window.devicePixelRatio > 1;
  var defaultSettings = {
    elements_selector: ".lazy",
    container: isBot || runningOnBrowser ? document : null,
    threshold: 300,
    thresholds: null,
    data_src: "src",
    data_srcset: "srcset",
    data_sizes: "sizes",
    data_bg: "bg",
    data_bg_hidpi: "bg-hidpi",
    data_bg_multi: "bg-multi",
    data_bg_multi_hidpi: "bg-multi-hidpi",
    data_poster: "poster",
    class_applied: "applied",
    class_loading: "loading",
    class_loaded: "loaded",
    class_error: "error",
    class_entered: "entered",
    class_exited: "exited",
    unobserve_completed: true,
    unobserve_entered: false,
    cancel_on_exit: true,
    callback_enter: null,
    callback_exit: null,
    callback_applied: null,
    callback_loading: null,
    callback_loaded: null,
    callback_error: null,
    callback_finish: null,
    callback_cancel: null,
    use_native: false
  };
  var getExtendedSettings = (customSettings) => {
    return Object.assign({}, defaultSettings, customSettings);
  };
  var createInstance = function(classObj, options) {
    var event;
    let eventString = "LazyLoad::Initialized";
    let instance = new classObj(options);
    try {
      event = new CustomEvent(eventString, { detail: { instance } });
    } catch (err) {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventString, false, false, { instance });
    }
    window.dispatchEvent(event);
  };
  var autoInitialize = (classObj, options) => {
    if (!options) {
      return;
    }
    if (!options.length) {
      createInstance(classObj, options);
    } else {
      for (let i = 0, optionsItem; optionsItem = options[i]; i += 1) {
        createInstance(classObj, optionsItem);
      }
    }
  };
  var statusLoading = "loading";
  var statusLoaded = "loaded";
  var statusApplied = "applied";
  var statusEntered = "entered";
  var statusError = "error";
  var statusNative = "native";
  var dataPrefix = "data-";
  var statusDataName = "ll-status";
  var getData = (element, attribute) => {
    return element.getAttribute(dataPrefix + attribute);
  };
  var setData = (element, attribute, value) => {
    var attrName = dataPrefix + attribute;
    if (value === null) {
      element.removeAttribute(attrName);
      return;
    }
    element.setAttribute(attrName, value);
  };
  var getStatus = (element) => getData(element, statusDataName);
  var setStatus = (element, status) => setData(element, statusDataName, status);
  var resetStatus = (element) => setStatus(element, null);
  var hasEmptyStatus = (element) => getStatus(element) === null;
  var hasStatusLoading = (element) => getStatus(element) === statusLoading;
  var hasStatusError = (element) => getStatus(element) === statusError;
  var hasStatusNative = (element) => getStatus(element) === statusNative;
  var statusesAfterLoading = [
    statusLoading,
    statusLoaded,
    statusApplied,
    statusError
  ];
  var hadStartedLoading = (element) => statusesAfterLoading.indexOf(getStatus(element)) >= 0;
  var safeCallback = (callback, arg1, arg2, arg3) => {
    if (!callback) {
      return;
    }
    if (arg3 !== void 0) {
      callback(arg1, arg2, arg3);
      return;
    }
    if (arg2 !== void 0) {
      callback(arg1, arg2);
      return;
    }
    callback(arg1);
  };
  var addClass = (element, className) => {
    if (supportsClassList) {
      element.classList.add(className);
      return;
    }
    element.className += (element.className ? " " : "") + className;
  };
  var removeClass = (element, className) => {
    if (supportsClassList) {
      element.classList.remove(className);
      return;
    }
    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
  };
  var addTempImage = (element) => {
    element.llTempImage = document.createElement("IMG");
  };
  var deleteTempImage = (element) => {
    delete element.llTempImage;
  };
  var getTempImage = (element) => element.llTempImage;
  var unobserve = (element, instance) => {
    if (!instance)
      return;
    const observer = instance._observer;
    if (!observer)
      return;
    observer.unobserve(element);
  };
  var resetObserver = (observer) => {
    observer.disconnect();
  };
  var unobserveEntered = (element, settings, instance) => {
    if (settings.unobserve_entered)
      unobserve(element, instance);
  };
  var updateLoadingCount = (instance, delta) => {
    if (!instance)
      return;
    instance.loadingCount += delta;
  };
  var decreaseToLoadCount = (instance) => {
    if (!instance)
      return;
    instance.toLoadCount -= 1;
  };
  var setToLoadCount = (instance, value) => {
    if (!instance)
      return;
    instance.toLoadCount = value;
  };
  var isSomethingLoading = (instance) => instance.loadingCount > 0;
  var haveElementsToLoad = (instance) => instance.toLoadCount > 0;
  var getSourceTags = (parentTag) => {
    let sourceTags = [];
    for (let i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
      if (childTag.tagName === "SOURCE") {
        sourceTags.push(childTag);
      }
    }
    return sourceTags;
  };
  var setAttributeIfValue = (element, attrName, value) => {
    if (!value) {
      return;
    }
    element.setAttribute(attrName, value);
  };
  var resetAttribute = (element, attrName) => {
    element.removeAttribute(attrName);
  };
  var hasOriginalAttributes = (element) => {
    return !!element.llOriginalAttrs;
  };
  var saveOriginalImageAttributes = (element) => {
    if (hasOriginalAttributes(element)) {
      return;
    }
    const originalAttributes = {};
    originalAttributes["src"] = element.getAttribute("src");
    originalAttributes["srcset"] = element.getAttribute("srcset");
    originalAttributes["sizes"] = element.getAttribute("sizes");
    element.llOriginalAttrs = originalAttributes;
  };
  var restoreOriginalImageAttributes = (element) => {
    if (!hasOriginalAttributes(element)) {
      return;
    }
    const originalAttributes = element.llOriginalAttrs;
    setAttributeIfValue(element, "src", originalAttributes["src"]);
    setAttributeIfValue(element, "srcset", originalAttributes["srcset"]);
    setAttributeIfValue(element, "sizes", originalAttributes["sizes"]);
  };
  var setImageAttributes = (element, settings) => {
    setAttributeIfValue(element, "sizes", getData(element, settings.data_sizes));
    setAttributeIfValue(element, "srcset", getData(element, settings.data_srcset));
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };
  var resetImageAttributes = (element) => {
    resetAttribute(element, "src");
    resetAttribute(element, "srcset");
    resetAttribute(element, "sizes");
  };
  var forEachPictureSource = (element, fn) => {
    const parent = element.parentNode;
    if (!parent || parent.tagName !== "PICTURE") {
      return;
    }
    let sourceTags = getSourceTags(parent);
    sourceTags.forEach(fn);
  };
  var forEachVideoSource = (element, fn) => {
    let sourceTags = getSourceTags(element);
    sourceTags.forEach(fn);
  };
  var restoreOriginalAttributesImg = (element) => {
    forEachPictureSource(element, (sourceTag) => {
      restoreOriginalImageAttributes(sourceTag);
    });
    restoreOriginalImageAttributes(element);
  };
  var setSourcesImg = (element, settings) => {
    forEachPictureSource(element, (sourceTag) => {
      saveOriginalImageAttributes(sourceTag);
      setImageAttributes(sourceTag, settings);
    });
    saveOriginalImageAttributes(element);
    setImageAttributes(element, settings);
  };
  var resetSourcesImg = (element) => {
    forEachPictureSource(element, (sourceTag) => {
      resetImageAttributes(sourceTag);
    });
    resetImageAttributes(element);
  };
  var setSourcesIframe = (element, settings) => {
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };
  var setSourcesVideo = (element, settings) => {
    forEachVideoSource(element, (sourceTag) => {
      setAttributeIfValue(sourceTag, "src", getData(sourceTag, settings.data_src));
    });
    setAttributeIfValue(element, "poster", getData(element, settings.data_poster));
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
    element.load();
  };
  var setSourcesFunctions = {
    IMG: setSourcesImg,
    IFRAME: setSourcesIframe,
    VIDEO: setSourcesVideo
  };
  var setBackground = (element, settings, instance) => {
    const bg1xValue = getData(element, settings.data_bg);
    const bgHiDpiValue = getData(element, settings.data_bg_hidpi);
    const bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
    if (!bgDataValue)
      return;
    element.style.backgroundImage = `url("${bgDataValue}")`;
    getTempImage(element).setAttribute("src", bgDataValue);
    manageLoading(element, settings, instance);
  };
  var setMultiBackground = (element, settings, instance) => {
    const bg1xValue = getData(element, settings.data_bg_multi);
    const bgHiDpiValue = getData(element, settings.data_bg_multi_hidpi);
    const bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
    if (!bgDataValue) {
      return;
    }
    element.style.backgroundImage = bgDataValue;
    manageApplied(element, settings, instance);
  };
  var setSources = (element, settings) => {
    const setSourcesFunction = setSourcesFunctions[element.tagName];
    if (!setSourcesFunction) {
      return;
    }
    setSourcesFunction(element, settings);
  };
  var manageApplied = (element, settings, instance) => {
    addClass(element, settings.class_applied);
    setStatus(element, statusApplied);
    if (settings.unobserve_completed) {
      unobserve(element, settings);
    }
    safeCallback(settings.callback_applied, element, instance);
  };
  var manageLoading = (element, settings, instance) => {
    updateLoadingCount(instance, 1);
    addClass(element, settings.class_loading);
    setStatus(element, statusLoading);
    safeCallback(settings.callback_loading, element, instance);
  };
  var elementsWithLoadEvent = ["IMG", "IFRAME", "VIDEO"];
  var hasLoadEvent = (element) => elementsWithLoadEvent.indexOf(element.tagName) > -1;
  var checkFinish = (settings, instance) => {
    if (instance && !isSomethingLoading(instance) && !haveElementsToLoad(instance)) {
      safeCallback(settings.callback_finish, instance);
    }
  };
  var addEventListener = (element, eventName, handler) => {
    element.addEventListener(eventName, handler);
    element.llEvLisnrs[eventName] = handler;
  };
  var removeEventListener = (element, eventName, handler) => {
    element.removeEventListener(eventName, handler);
  };
  var hasEventListeners = (element) => {
    return !!element.llEvLisnrs;
  };
  var addEventListeners = (element, loadHandler2, errorHandler2) => {
    if (!hasEventListeners(element))
      element.llEvLisnrs = {};
    const loadEventName = element.tagName === "VIDEO" ? "loadeddata" : "load";
    addEventListener(element, loadEventName, loadHandler2);
    addEventListener(element, "error", errorHandler2);
  };
  var removeEventListeners = (element) => {
    if (!hasEventListeners(element)) {
      return;
    }
    const eventListeners = element.llEvLisnrs;
    for (let eventName in eventListeners) {
      const handler = eventListeners[eventName];
      removeEventListener(element, eventName, handler);
    }
    delete element.llEvLisnrs;
  };
  var doneHandler = (element, settings, instance) => {
    deleteTempImage(element);
    updateLoadingCount(instance, -1);
    decreaseToLoadCount(instance);
    removeClass(element, settings.class_loading);
    if (settings.unobserve_completed) {
      unobserve(element, instance);
    }
  };
  var loadHandler = (event, element, settings, instance) => {
    const goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass(element, settings.class_loaded);
    setStatus(element, statusLoaded);
    safeCallback(settings.callback_loaded, element, instance);
    if (!goingNative)
      checkFinish(settings, instance);
  };
  var errorHandler = (event, element, settings, instance) => {
    const goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass(element, settings.class_error);
    setStatus(element, statusError);
    safeCallback(settings.callback_error, element, instance);
    if (!goingNative)
      checkFinish(settings, instance);
  };
  var addOneShotEventListeners = (element, settings, instance) => {
    const elementToListenTo = getTempImage(element) || element;
    if (hasEventListeners(elementToListenTo)) {
      return;
    }
    const _loadHandler = (event) => {
      loadHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };
    const _errorHandler = (event) => {
      errorHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };
    addEventListeners(elementToListenTo, _loadHandler, _errorHandler);
  };
  var loadBackground = (element, settings, instance) => {
    addTempImage(element);
    addOneShotEventListeners(element, settings, instance);
    setBackground(element, settings, instance);
    setMultiBackground(element, settings, instance);
  };
  var loadRegular = (element, settings, instance) => {
    addOneShotEventListeners(element, settings, instance);
    setSources(element, settings);
    manageLoading(element, settings, instance);
  };
  var load = (element, settings, instance) => {
    if (hasLoadEvent(element)) {
      loadRegular(element, settings, instance);
    } else {
      loadBackground(element, settings, instance);
    }
  };
  var loadNative = (element, settings, instance) => {
    element.setAttribute("loading", "lazy");
    addOneShotEventListeners(element, settings, instance);
    setSources(element, settings);
    setStatus(element, statusNative);
  };
  var cancelLoading = (element, entry, settings, instance) => {
    if (!settings.cancel_on_exit)
      return;
    if (!hasStatusLoading(element))
      return;
    if (element.tagName !== "IMG")
      return;
    removeEventListeners(element);
    resetSourcesImg(element);
    restoreOriginalAttributesImg(element);
    removeClass(element, settings.class_loading);
    updateLoadingCount(instance, -1);
    resetStatus(element);
    safeCallback(settings.callback_cancel, element, entry, instance);
  };
  var onEnter = (element, entry, settings, instance) => {
    const dontLoad = hadStartedLoading(element);
    setStatus(element, statusEntered);
    addClass(element, settings.class_entered);
    removeClass(element, settings.class_exited);
    unobserveEntered(element, settings, instance);
    safeCallback(settings.callback_enter, element, entry, instance);
    if (dontLoad)
      return;
    load(element, settings, instance);
  };
  var onExit = (element, entry, settings, instance) => {
    if (hasEmptyStatus(element))
      return;
    addClass(element, settings.class_exited);
    cancelLoading(element, entry, settings, instance);
    safeCallback(settings.callback_exit, element, entry, instance);
  };
  var tagsWithNativeLazy = ["IMG", "IFRAME", "VIDEO"];
  var shouldUseNative = (settings) => settings.use_native && "loading" in HTMLImageElement.prototype;
  var loadAllNative = (elements, settings, instance) => {
    elements.forEach((element) => {
      if (tagsWithNativeLazy.indexOf(element.tagName) === -1) {
        return;
      }
      loadNative(element, settings, instance);
    });
    setToLoadCount(instance, 0);
  };
  var isIntersecting = (entry) => entry.isIntersecting || entry.intersectionRatio > 0;
  var getObserverSettings = (settings) => ({
    root: settings.container === document ? null : settings.container,
    rootMargin: settings.thresholds || settings.threshold + "px"
  });
  var intersectionHandler = (entries, settings, instance) => {
    entries.forEach((entry) => isIntersecting(entry) ? onEnter(entry.target, entry, settings, instance) : onExit(entry.target, entry, settings, instance));
  };
  var observeElements = (observer, elements) => {
    elements.forEach((element) => {
      observer.observe(element);
    });
  };
  var updateObserver = (observer, elementsToObserve) => {
    resetObserver(observer);
    observeElements(observer, elementsToObserve);
  };
  var setObserver = (settings, instance) => {
    if (!supportsIntersectionObserver || shouldUseNative(settings)) {
      return;
    }
    instance._observer = new IntersectionObserver((entries) => {
      intersectionHandler(entries, settings, instance);
    }, getObserverSettings(settings));
  };
  var toArray = (nodeSet) => Array.prototype.slice.call(nodeSet);
  var queryElements = (settings) => settings.container.querySelectorAll(settings.elements_selector);
  var excludeManagedElements = (elements) => toArray(elements).filter(hasEmptyStatus);
  var hasError = (element) => hasStatusError(element);
  var filterErrorElements = (elements) => toArray(elements).filter(hasError);
  var getElementsToLoad = (elements, settings) => excludeManagedElements(elements || queryElements(settings));
  var retryLazyLoad = (settings, instance) => {
    const errorElements = filterErrorElements(queryElements(settings));
    errorElements.forEach((element) => {
      removeClass(element, settings.class_error);
      resetStatus(element);
    });
    instance.update();
  };
  var setOnlineCheck = (settings, instance) => {
    if (!runningOnBrowser) {
      return;
    }
    window.addEventListener("online", () => {
      retryLazyLoad(settings, instance);
    });
  };
  var LazyLoad = function(customSettings, elements) {
    const settings = getExtendedSettings(customSettings);
    this._settings = settings;
    this.loadingCount = 0;
    setObserver(settings, this);
    setOnlineCheck(settings, this);
    this.update(elements);
  };
  LazyLoad.prototype = {
    update: function(givenNodeset) {
      const settings = this._settings;
      const elementsToLoad = getElementsToLoad(givenNodeset, settings);
      setToLoadCount(this, elementsToLoad.length);
      if (isBot || !supportsIntersectionObserver) {
        this.loadAll(elementsToLoad);
        return;
      }
      if (shouldUseNative(settings)) {
        loadAllNative(elementsToLoad, settings, this);
        return;
      }
      updateObserver(this._observer, elementsToLoad);
    },
    destroy: function() {
      if (this._observer) {
        this._observer.disconnect();
      }
      queryElements(this._settings).forEach((element) => {
        delete element.llOriginalAttrs;
      });
      delete this._observer;
      delete this._settings;
      delete this.loadingCount;
      delete this.toLoadCount;
    },
    loadAll: function(elements) {
      const settings = this._settings;
      const elementsToLoad = getElementsToLoad(elements, settings);
      elementsToLoad.forEach((element) => {
        unobserve(element, this);
        load(element, settings, this);
      });
    }
  };
  LazyLoad.load = (element, customSettings) => {
    const settings = getExtendedSettings(customSettings);
    load(element, settings);
  };
  LazyLoad.resetStatus = (element) => {
    resetStatus(element);
  };
  if (runningOnBrowser) {
    autoInitialize(LazyLoad, window.lazyLoadOptions);
  }
  var lazyload_default = LazyLoad;

  // sources/src/pages/images/lazyload-init.js
  var logEvent = (eventName, element) => {
    console.log(Date.now(), eventName, element.getAttribute("data-src"), element.getAttribute("src"));
  };
  var lazyLoadOptions = {
    elements_selector: ".lazy",
    to_webp: true,
    callback_enter: (element) => {
      logEvent("ENTERED", element);
    },
    callback_load: (element) => {
      logEvent("LOADED", element);
    },
    callback_set: (element) => {
      logEvent("SET", element);
    },
    callback_error: (element) => {
      logEvent("ERROR", element);
    }
  };
  var createLazyLoadInstance = () => {
    return new lazyload_default(lazyLoadOptions);
  };
  var lazyload_init_default = () => {
    document.addEventListener("DOMContentLoaded", createLazyLoadInstance);
  };
})();
