/// <reference types = "cypress" />

describe("Fixtures tests",()=>{
    it("Get data form fixture file",()=>{
        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);

        // Carrega as informações do arquivo 'userData'
        cy.fixture("userData").as("usuario").then(function (){

            // Preenchendo as informações
            cy.get('#formNome').type(this.usuario.nome);
            cy.get('#formSobrenome').type(this.usuario.sobrenome);
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click();
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click();
            cy.get('#formEscolaridade').select(this.usuario.escolaridade);
            cy.get('#formEsportes').select(this.usuario.esportes);

        });

        cy.get('#formCadastrar').click();

        // Verifica se está cadastrado
        cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!');
    });
});