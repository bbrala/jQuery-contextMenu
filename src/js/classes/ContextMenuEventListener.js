'use strict';
import Helper from './ContextMenuHelper';

const CAPTURED_EVENTS = ['blur', 'focus', 'mouseenter', 'mouseleave', 'click', 'mouseup', 'mousedown', 'selectstart'];

/**
 * Listens to events dispatched to an element or its children.
 *
 * @param {Element} el The element to listen to.
 * @param {Element} context Optional context in which to execute the callbacks.
 */
class ContextMenuEventListener {
    constructor(el, context) {
        this.context = context || null;
        this.el = el;
        this.events = {};
        this._onEvent = this._onEvent.bind(this);
    }

    /**
     * Destructor.
     *
     * Removes all event listeners and cleans up all references.
     */
    destruct() {
        Object.keys(this.events).forEach(function (eventName) {
            var useCapture = CAPTURED_EVENTS.indexOf(eventName) > -1;
            this.el.removeEventListener(eventName, this._onEvent, useCapture);
        }, this);

        this.context = null;
        this.el = null;
        this.events = null;
    }

    /**
     * Stops listening to an event.
     *
     * The arguments are the same as for on(), but when no callback is given, all callbacks for the
     * given event and class are discarded.
     */
    off(eventName, selector, callback) {
        if (typeof selector !== 'string') {
            callback = selector;
            selector = '';
        }

        if (callback) {
            let events = this.events[eventName];
            if (events) {
                events = events[selector];
                if (events) {
                    for (let i = 0; i < events.length; i++) {
                        if (events[i] === callback) {
                            events.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        } else {
            this.events[eventName][selector] = [];
        }
    }

    /**
     * Starts listening to an event.
     *
     * @param eventName Name of the event to listen to, in lower-case.
     * @param selector Optional CSS selector. If given, only events inside a child element matching
     *                 the selector are caught.
     * @param callback Callback to invoke when the event is caught.
     *
     * Alternatively, the arguments may be provided using a map to start listening to multiple
     * events at once. Here, the keys of the map are eventNames and the values are callbacks.
     * Selectors may be specified by separating them from the event name with a space. For example:
     *
     *     .on({
     *         'blur': this._blurred,
     *         'click .some-input': this._inputClicked,
     *     })
     */
    on(eventName, selector, callback) {
        if (typeof eventName !== 'string') {
            const eventsMap = eventName;
            for (let key in eventsMap) {
                if (eventsMap.hasOwnProperty(key)) {
                    const split = key.split(' ');
                    if (split.length > 1) {
                        this.on(split[0], split[1], eventsMap[key]);
                    } else {
                        this.on(split[0], eventsMap[key]);
                    }
                }
            }
            return this;
        }

        if (typeof selector !== 'string') {
            callback = selector;
            selector = '';
        }

        if (!this.events.hasOwnProperty(eventName)) {
            const useCapture = CAPTURED_EVENTS.indexOf(eventName) > -1;
            this.el.addEventListener(eventName, this._onEvent, useCapture);

            this.events[eventName] = {};
        }

        if (!this.events[eventName].hasOwnProperty(selector)) {
            this.events[eventName][selector] = [];
        }

        if (this.events[eventName][selector].indexOf(callback) < 0) {
            this.events[eventName][selector].push(callback);
        }
        return this;
    }

    _onEvent(event) {
        let isPropagationStopped = false;
        let stopPropagation = event.stopPropagation;
        event.stopPropagation = function () {
            stopPropagation.call(event);
            isPropagationStopped = true;
        };

        const context = this.context;

        function callAll(callbacks) {
            for (let i = 0; i < callbacks.length; i++) {
                callbacks[i].call(context, event);
            }
        }

        let target = event.target;
        const events = this.events[event.type.toLowerCase()];
        if (isPropagationStopped === false) {
            while (target && target !== this.el) {
                for (let selector in events) {
                    if (
                        selector &&
                        events.hasOwnProperty(selector) &&
                        Helper.matchesSelector(target, selector)
                    ) {
                        callAll(events[selector]);
                    }
                }
                target = target.parentElement;
            }
        }

        if (!isPropagationStopped && events.hasOwnProperty('')) {
            callAll(events['']);
        }
    }
}

module.exports = ContextMenuEventListener;
