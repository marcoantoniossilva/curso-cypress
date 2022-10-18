
const locators = {
    LOGIN: {
        USER: "[data-test=email]",
        PASSWORD: "[data-test=passwd]",
        BTN_LOGIN: ".btn"
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        EXTRACT: '[data-test=menu-extrato]',
        SETTINGS: '[data-test=menu-settings]',
        ACCOUNTS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        TRANSACTION: '[data-test=menu-movimentacao]'
    },
    ACCOUNTS: {
        NAME: '[data-test=nome]',
        BTN_SAVE: ".btn"
    },
    TRANSACTION: {
        DESCRIPTION: '[data-test=descricao]',
        VALUE: '[data-test=valor]',
        INTERESTED: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        ACCOUNT: '[data-test=conta]',
        BTN_SAVE: '.btn-primary'
    },
    EXTRACT: {
        REGISTERS: '.list-group > li',
        XP_DESCRIPTION_VALUE_FIND: '//span[contains(.,DESCRIPTION)]/following-sibling::small[contains(.,VALUE)]',
        FN_XP_REMOVE_ELEMENT: (description) => `//span[contains(.,'${description}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_EDIT_ELEMENT: (description) => `//span[contains(.,'${description}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_LINE: (description) => `//span[contains(.,'${description}')]/../../../..`
    },
    BALANCE: {
        FN_XP_ACCOUNT_VALUE_FIND: (account, value) => `//td[contains(.,'${account}')]/following-sibling::td[contains(.,'${value}')]`
    },
    MESSAGE: ".toast"

}

export default locators;