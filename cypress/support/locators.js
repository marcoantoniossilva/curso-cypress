const locators = {
    LOGIN: {
        USER: "[data-test=email]",
        PASSWORD: "[data-test=passwd]",
        BTN_LOGIN: ".btn"
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        ACCOUNTS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        TRANSACTION: '[data-test=menu-movimentacao] > .fas'
    },
    ACCOUNTS:{
        NAME: '[data-test=nome]',
        BTN_SAVE: ".btn"
    },
    TRANSACTION:{
        DESCRIPTION: '[data-test=menu-movimentacao] > .fas',
        VALUE: '[data-test=valor]',
        INTERESTED: '[data-test=envolvido]',
        BTN_SAVE: '.btn-primary'
    },

    MESSAGE: ".toast"

}

export default locators;