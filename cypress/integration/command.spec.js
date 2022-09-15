/// <reference types = "cypress" />

describe("Work with alerts",()=>{
    // Todos os testes que estão dentro deste grupo irão aproveitar
    // o código do hook abaixo que será executado antes de todos os testes
    before(()=>{
        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);
    });

    it("Normal alert",()=>{
        cy.get('#alert').click();
        cy.on('window:alert', mensagem =>{
            expect(mensagem).to.be.eq('Alert Simples');
        })
    });

    it("Alert with personalized command",()=>{
        cy.MeuComandoPersonalizado('#alert','Alert Simples');
    });

});