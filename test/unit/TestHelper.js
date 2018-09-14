/** @global sinon **/
export default class TestHelper {
    classname;
    spies;
    items;
    $contextmenu;
    options;

    constructor(items = false, extraOptions = {}, classname = 'context-menu') {

        this.spies = {
            events: {
                show: sinon.spy(),
                hide: sinon.spy()
            },
            callback: sinon.spy()
        };

        if (!items) {
            items = TestHelper.simpleMenuItems();
        }
        this.items = items;
        this.$contextmenu = null;

        this.classname = classname;
        let options = this.defaultOptions(this.classname, items);
        this.options = $.extend(true, options, this.spies, extraOptions);
    }

    /**
     * Triggers an event on the instance's element.
     *
     * @param {Element} el Element to trigger on
     * @param {string} eventName Name of the event to trigger.
     * @param {Object} data Optional event data to be added to the event object.
     * @param {boolean} bubbles
     * @param {boolean} cancelable
     *
     * @return {boolean} Whether the default action of the event may be executed, ie. returns false if preventDefault() has been called.
     */
    static triggerEvent(el, eventName, data = {}, bubbles = true, cancelable = true) {
        const event = new CustomEvent(eventName, {detail: data, bubbles: bubbles, cancelable: cancelable});
        el.dispatchEvent(event);
        return !event.defaultPrevented;
    }

    /**
     * @returns {ContextMenuData}
     */
    getContextMenuDataFromShow() {
        return this.spies.events.show.args[0][1];
    }

    setClickEvent(itemClickEvent) {
        this.options.itemClickEvent = itemClickEvent;
    }

    /**
     * @returns {{copy: {name: string, icon: string}, paste: {name: string, icon: string}}}
     */
    static simpleMenuItems() {
        return {
            copy: {name: 'Copy', icon: 'copy'},
            paste: {name: 'Paste', icon: 'paste'}
        };
    }

    createContextMenu() {
        let $fixture = $('#qunit-fixture');
        // ensure `#qunit-fixture` exists when testing with karma runner
        if ($fixture.length === 0) {
            $('<div id="qunit-fixture">').appendTo('body');
            $fixture = $('#qunit-fixture');
        }

        $fixture.append("<div class='" + this.classname + "'>right click me!</div>");

        this.$contextmenu = $fixture.find('.' + this.classname);

        $.contextMenu(this.options);
    }

    defaultOptions(classname, items) {
        return {
            selector: '.' + classname,
            events: {
                show: this.spies.show,
                hide: this.spies.hide
            },
            callback: this.spies.callback,
            items: items
        };
    }
}
