// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from "../support/locators";

Cypress.Commands.add('MeuComandoPersonalizado',(localizador,mensagem)=>{
    cy.get(localizador).click();
    cy.on('window:alert', mensagemAlert =>{
        expect(mensagemAlert).to.be.eq(mensagem);
    })
});

Cypress.Commands.add('login',(user,pass)=>{
    cy.get(loc.LOGIN.USER).type(user);
    cy.get(loc.LOGIN.PASSWORD).type(pass);

    cy.get(loc.LOGIN.BTN_LOGIN).click();

    cy.get(loc.MESSAGE).should('contain','Bem vindo');
});

Cypress.Commands.add('resetApp',() =>{
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.RESET).click();
});

Cypress.Commands.add('comandoGetToken',(user_email,user_pass)=>{
    cy.request({
        method: "POST",
        url: "/signin",
        body:{
            email:user_email,
            senha:user_pass,
            redirecionar: false
        }
    }).its('body.token')
        .should('not.be.empty')
        .then(token=>{
            return token;
        });
});

Cypress.Commands.add('comandoResetApp',(token)=>{
    cy.request({
        method: "GET",
        url: "/reset",
        headers: {
            Authorization: `JWT ${token}`
        }
    }).its('status').should('be.equal',200);  
});