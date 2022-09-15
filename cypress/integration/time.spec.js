/// <reference types = "cypress" />

describe("Clock tests",()=>{
    // Todos os testes que estão dentro deste grupo irão aproveitar
    // o código do hook abaixo que será executado antes de todos os testes
    before(()=>{
        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);
    });

    it("Going back to the past",()=>{
        // cy.get('#buttonNow').click();
        // cy.get('#resultado > span').should('contain','14/09/2022');

        // Voltaria para 01/01/1970 mas como nosso fuso é -3, volta pra 31/12/1969
        // cy.clock();

        // cy.get('#buttonNow').click();
        // cy.get('#resultado > span').should('contain','31/12/1969');

        // Informando a data que o clock deve assumir
        const dataMarcante = new Date(2008,5,24);
        cy.clock(dataMarcante.getTime());

        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain','24/06/2008');
    });

    it("Goes to the future",()=>{
        cy.get('#buttonTimePassed').click();

        cy.get('#resultado > span');
    })
});