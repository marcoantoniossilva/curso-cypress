import loc from "./locators";

Cypress.Commands.add("acessarMenuConta",()=>{
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.ACCOUNTS).click();
});

Cypress.Commands.add("inserirConta",conta=>{
    // Carrega as informações do arquivo 'barrigaDataSite'
    cy.get(loc.ACCOUNTS.NAME).type(conta);
    cy.get(loc.ACCOUNTS.BTN_SAVE).click();
});

Cypress.Commands.add("acessarMenuMovimentacao",()=>{
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.TRANSACTION).click();
});

Cypress.Commands.add("inserirMovimentacao",(descricao,valor,interessado,conta)=>{
    // Carrega as informações do arquivo 'barrigaDataSite'
    cy.get(loc.TRANSACTION.DESCRIPTION).type(descricao);
    cy.get(loc.TRANSACTION.VALUE).type(valor);
    cy.get(loc.TRANSACTION.INTERESTED).type(interessado);
    cy.get(loc.TRANSACTION.ACCOUNT).select(conta);
    cy.get(loc.TRANSACTION.STATUS).click();

    cy.get(loc.TRANSACTION.BTN_SAVE).click();
});

