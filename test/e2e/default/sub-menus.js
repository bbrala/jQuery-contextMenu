module.exports = {
    '@tags': ['sub-menus'],

    'The submenu opens': function (browser) {
        browser
            .url(browser.globals.test_settings.launch_url + 'sub-menus.html')
            .waitForElementPresent('.context-menu-one', 5000)
            .moveToElement('.context-menu-one', 5, 5)

            .mouseButtonClick('right')
            .assert.hidden('.item-command-charlie')
            .moveToElement('.item-submenu-sub-group', 5, 5)
            .moveToElement('.item-submenu-sub-group-2', 5, 5)
            .assert.visible('.item-command-charlie')
            .moveToElement('.item-command-charlie', 5, 5)
            .assert.attributeContains('.item-command-charlie', 'class', 'context-menu-hover')
            .end();
    },

    afterEach: function (browser, done) {
        browser
            .sauceEnd()
            .end();
        done();
    }
};
