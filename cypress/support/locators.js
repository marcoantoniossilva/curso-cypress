
const locators = {
    LOGIN: {
        USER: "[data-test=email]",
        PASSWORD: "[data-test=passwd]",
        BTN_LOGIN: ".btn"
    },
    MENU: {
        HOME: '[data-test=menu-home]',
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
        STATUS:'[data-test=status]',
        ACCOUNT: '[data-test=conta]',
        BTN_SAVE: '.btn-primary'
    },
    EXTRACT:{
        REGISTERS: '.list-group > li',
        XP_DESCRIPTION_VALUE_FIND: '//span[contains(.,DESCRIPTION)]/following-sibling::small[contains(.,VALUE)]'
    },
    BALANCE:{
        FN_XP_ACCOUNT_VALUE_FIND: (conta, valor) => `//td[contains(.,'${conta}')]/following-sibling::td[contains(.,'${valor}')]`
    },
    MESSAGE: ".toast"

}

export default locators;