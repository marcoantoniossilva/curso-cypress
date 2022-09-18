/// <reference types = "cypress" />

describe("Should test at a functional level",()=>{
    // Todos os testes que estão dentro deste grupo irão aproveitar
    // o código do hook abaixo que será executado antes de todos os testes
    before(()=>{
        const url = 'https://barrigareact.wcaquino.me';
        cy.visit(url);

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            cy.get('.input-group > .form-control').type(this.dados.login.email);
            cy.get(':nth-child(2) > .form-control').type(this.dados.login.senha);

            cy.get('.btn').click();

            cy.get('.toast').should('contain','Bem vindo');
        });
    });

    it("Should create an account",()=>{

        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/contas"]').click();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            cy.get('.form-control').type(this.dados.conta.nomeConta);
        });

        cy.get('.btn').click();
        cy.get('.toast-success > .toast-message').should('contain','sucesso');
        
    });
});
