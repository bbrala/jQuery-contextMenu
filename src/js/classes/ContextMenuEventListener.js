'use strict';
import Helper from './ContextMenuHelper';

const NOT_CAPTURED_EVENTS = [];// ['blur', 'focus', 'mouseenter', 'mouseleave', 'click', 'mouseup', 'mousedown', 'selectstart'];

/**
 * Listens to events dispatched to an element or its children.
 *
 * @param {Element} el The element to listen to.
 * @param {ContextMenuData} contextMenuData ContextMenuData of menu this is bound to
 * @param {Element} context Optional context in which to execute the callbacks.
 */
class ContextMenuEventListener {
    constructor(el, contextMenuData) {
        if (!window.instanceId) {
            window.instanceId = 0;
        }
        this.instanceId = window.instanceId++;
        console.log('New listener', el, this.instanceId);

        this.contextMenuData = contextMenuData || null;
        this.el = el;
        this.events = {};
        this.eventData = {};
        this._onEvent = this._onEvent.bind(this);
    }

    /**
     * Destructor.
     *
     * Removes all event listeners and cleans up all references.
     */
    destruct() {
        if (this.events !== null) {
            Object.keys(this.events).forEach(function (eventName) {
                // let useCapture = CAPTURED_EVENTS.indexOf(eventName) > -1;
                let useCapture = NOT_CAPTURED_EVENTS.indexOf(eventName) === -1;
                this.el.removeEventListener(eventName, this._onEvent, useCapture);
            }, this);
        }

        this.context = null;
        this.contextMenuData = null;
        this.el = null;
        this.events = null;
        this.eventData = null;
    }

    /**
     * Stops listening to an event.
     *
     * The arguments are the same as for on(), but when no callback is given, all callbacks for the
     * given event and class are discarded.
     * @param {string} eventName
     * @param {string?} selector
     * @param {Function?} callback
     *
     * @returns {ContextMenuEventListener}
     */
    off(eventName, selector, callback) {
        // console.log('Off', eventName, selector, callback);
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
            if (this.events.hasOwnProperty(eventName) && this.events[eventName].hasOwnProperty(selector)) {
                this.events[eventName][selector] = [];
            }
        }
        return this;
    }

    /**
     * Starts listening to an event.
     *
     * @param {string} eventName Name of the event to listen to, in lower-case.
     * @param {string} selector Optional CSS selector. If given, only events inside a child element matching
     *                 the selector are caught.
     * @param {Function} callback Callback to invoke when the event is caught.
     *
     * Alternatively, the arguments may be provided using a map to start listening to multiple
     * events at once. Here, the keys of the map are eventNames and the values are callbacks.
     * Selectors may be specified by separating them from the event name with a space. For example:
     *
     *     .on({
     *         'blur': this._blurred,
     *         'click .some-input': this._inputClicked,
     *     })
     * @param {Object} data
     * @return {this}
     */
    on(eventName, selector, callback, data = false) {
        console.log('On', eventName, selector, this.instanceId);
        if (typeof eventName !== 'string') {
            const eventsMap = eventName;
            for (let key in eventsMap) {
                if (eventsMap.hasOwnProperty(key)) {
                    const split = key.split(' ');
                    if (split.length > 1) {
                        this.on(split[0], split[1], eventsMap[key], data);
                    } else {
                        this.on(split[0], '', eventsMap[key], data);
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
            const useCapture = NOT_CAPTURED_EVENTS.indexOf(eventName) === -1;
            this.el.addEventListener(eventName, this._onEvent, useCapture);

            this.events[eventName] = {};
        }

        if (!this.events[eventName].hasOwnProperty(selector)) {
            this.events[eventName][selector] = [];
        }

        if (this.events[eventName][selector].indexOf(callback) < 0) {
            this.events[eventName][selector].push(callback);
        }

        if (data) {
            if (!this.eventData.hasOwnProperty(eventName)) {
                this.eventData[eventName] = {};
            }
            if (!this.eventData[eventName].hasOwnProperty(selector)) {
                this.eventData[eventName][selector] = data;
            }
        }

        return this;
    }

    /**
     * @param {Event} event
     * @private
     */
    _onEvent(event) {
        console.log('Handling event', event.type, event);

        let isPropagationStopped = false;
        let stopPropagation = event.stopPropagation;
        event.stopPropagation = function () {
            stopPropagation.call(event);
            isPropagationStopped = true;
        };

        if (event.detail.data) {
            event._contextMenuData = event.detail.data;
        } else {
            event._contextMenuData = this.contextMenuData;
        }

        let target = event.target;

        console.log(event.target);

        const events = this.events[event.type.toLowerCase()];
        const eventData = this.eventData[event.type.toLowerCase()];

        if (event.type === 'contextmenu:focus') {
            console.group('focusstack');
        }
        // eslint-disable-next-line no-unmodified-loop-condition
        while (target && target !== this.el && isPropagationStopped === false) {
            console.log('find target for ' + event.type, target);

            for (let selector in events) {
                if (
                    selector && eventData && eventData.hasOwnProperty(selector) && Helper.matchesSelector(target, selector)) {
                    event._extraContextMenuData = eventData[selector];
                }

                if (selector && events.hasOwnProperty(selector) && Helper.matchesSelector(target, selector)) {
                    this.context = target;
                    console.log('find target for ' + event.type + '- FOUND ' + selector, target);
                    this.callAll(events[selector], event, this.context);
                }
            }
            target = target.parentElement;
            if (isPropagationStopped === true) {
                break;
            }
        }
        if (event.type === 'contextmenu:focus') {
            console.groupEnd();
        }
        if (isPropagationStopped === false && events.hasOwnProperty('')) {
            console.log('calling all');
            this.callAll(events[''], event, this.context);
        }
    }

    callAll(callbacks, event, context) {
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i].call(context, event);
        }
    }
}

module.exports = ContextMenuEventListener;
