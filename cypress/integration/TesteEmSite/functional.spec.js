/// <reference types = "cypress" />

import loc from "../../support/locators";
import "../../support/commandsContas";

describe("Should test at a functional level",()=>{
    // Todos os testes que estão dentro deste grupo irão aproveitar
    // o código do hook abaixo que será executado antes de todos os testes
    before(()=>{
        const url = 'https://barrigareact.wcaquino.me';
        cy.visit(url);

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            // Chama o comando personaizado para fazer login
            cy.login(this.dados.login.email,this.dados.login.senha);
        });

        // Chama o comando personaizado para resetar os dados do banco
        cy.resetApp();
    });

    it("Should create an account",()=>{

        cy.acessarMenuConta();

        cy.fixture("barrigaDataSite").as("dados").then(function (){
            cy.inserirConta(this.dados.conta.nomeConta);
        });

        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso');
        
    });

    it("Should update an account",()=>{

        cy.acessarMenuConta();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){

            // Recuperando o botão editar da conta criada e clicando
            cy.xpath(`//table//td[contains(.,'${this.dados.conta.nomeConta}')]/..//i[@class='far fa-edit']`)
                .click();
            // Limpando o campo e digitando o nome da conta + 2
            cy.get(loc.ACCOUNTS.NAME).type(`{selectAll}${this.dados.conta.nomeConta} 2`);
            
            // Poderia limpar o campo com clear também
            cy.get(loc.ACCOUNTS.NAME)
            .clear()
            .type(`${this.dados.conta.nomeConta} 2`);

            cy.get(loc.ACCOUNTS.BTN_SAVE).click();
            cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso');
        });

    });

    it("Should not create an account with same name.",()=>{

        cy.acessarMenuConta();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            cy.inserirConta(`${this.dados.conta.nomeConta} 2`);
        });

        cy.get(loc.MESSAGE).should('contain','code 400');

    });

    it("Should create a transaction",()=>{

        cy.acessarMenuMovimentacao();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            cy.inserirConta(`${this.dados.conta.nomeConta} 2`);
        });

        cy.get(loc.MESSAGE).should('contain','code 400');

    });
});
