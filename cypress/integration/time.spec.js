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

        cy.get('#resultado > span').should('contain','166');

        // Verifica se o valor em ms é maior que 1663370626359
        // O invoke('text') recupera o texto do #resultado > span
        // O .should('gt', 1663370626359) verifica se ele é maior que 1663370626359
        // gt = greater than
        cy.get('#resultado > span').invoke('text').should('gt', 1663370626359);


        // Resetando o tempo
        cy.clock();
        cy.get('#buttonTimePassed').click();
        // Verifica se o valor em ms é menor ou = a zero
        // lte = less than equal
        cy.get('#resultado > span').invoke('text').should('lte', 0);

        // Avançando o tempo em 5000 ms
        cy.tick(5000);
        cy.get('#buttonTimePassed').click();
        // Verifica se o valor em ms é maior ou = a 5000
        // gte = greater than equal
        cy.get('#resultado > span').invoke('text').should('gte', 5000);
    })
});