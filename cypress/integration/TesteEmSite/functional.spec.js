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
            let desc = this.dados.movimentacao.descricao;
            let vl = this.dados.movimentacao.valor;
            let conta = this.dados.movimentacao.conta;
            cy.inserirMovimentacao(
                desc,
                vl,
                this.dados.movimentacao.interessado,conta);

            // Validações
            // Validando mensagem de sucesso
            cy.get(loc.MESSAGE).should('contain','sucesso');
            // Validando que a lista de movimentações agora contém 7 registros
            cy.get(loc.EXTRACT.REGISTERS).should('have.length',7);

            // Validando que a movimentação consta na lista com xpath
            // Pra isso, valida que um span contenha a descricao da movimentação
            // e o irmão que contenha o valor
            cy.xpath(
                loc.EXTRACT.XP_DESCRIPTION_VALUE_FIND
                    .replace('DESCRIPTION',`${desc}`)
                    .replace('VALUE',`${vl}`)
                ).should('exist');

        });
    });

    it("Should get balance.",()=>{

        cy.get(loc.MENU.HOME).click();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            let conta = this.dados.movimentacao.conta;
            let vl = this.dados.movimentacao.valor;
            cy.xpath(loc.BALANCE.FN_XP_ACCOUNT_VALUE_FIND(conta,vl)).should('exist');
        });

    });
});
