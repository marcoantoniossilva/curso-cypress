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
        DESCRIPTION: '[data-test=descricao]',
        VALUE: '[data-test=valor]',
        INTERESTED: '[data-test=envolvido]',
        BTN_SAVE: '.btn-primary'
    },
    EXTRACT:{
        REGISTERS: '.list-group > li',
        XP_VALUE_FIND: '//span[contains(.,VALUE_FIND)]'
    },
    MESSAGE: ".toast"

}

export default locators;