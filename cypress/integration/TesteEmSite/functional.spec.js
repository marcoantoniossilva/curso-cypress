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
    });

    beforeEach(()=>{
        cy.get(loc.MENU.HOME).click();

        // Chama o comando personaizado para resetar os dados do banco
        cy.resetApp();
    });


    it("Should create an account",()=>{

        cy.acessarMenuConta();

        cy.fixture("barrigaDataSite").as("dados").then(function (){
            cy.inserirConta(this.dados.conta.nomeNovaConta);
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
            cy.get(loc.ACCOUNTS.NAME).type(`{selectAll}${this.dados.conta.novoNomeConta}`);
            
            // Poderia limpar o campo com clear também
            cy.get(loc.ACCOUNTS.NAME)
            .clear()
            .type(`${this.dados.conta.novoNomeConta}`);

            cy.get(loc.ACCOUNTS.BTN_SAVE).click();
            cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso');
        });

    });

    it("Should not create an account with same name.",()=>{

        cy.acessarMenuConta();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            cy.inserirConta(`${this.dados.conta.nomeContaRepetida}`);
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
            cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!');
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

    // Poderia criar comando como os anteriores, mas como era curto, não criei
    it("Should get balance.",()=>{

        cy.get(loc.MENU.HOME).click();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            let conta = this.dados.saldo.contaParaSaldo;
            let vl = this.dados.saldo.valor;
            let mvAltSaldo = this.dados.movimentacao.movParaAlterarSaldo;
            let novoValor = this.dados.saldo.novoValor;
            // chama o locator com parametro dinamico
            cy.xpath(loc.BALANCE.FN_XP_ACCOUNT_VALUE_FIND(conta,vl)).should('exist');


            // Editando um movimento para alterar o saldo
            cy.get(loc.MENU.EXTRACT).click();
            cy.xpath(loc.EXTRACT.FN_XP_EDIT_ELEMENT(mvAltSaldo)).click();
            cy.get(loc.TRANSACTION.DESCRIPTION).should('have.value',mvAltSaldo);
            cy.get(loc.TRANSACTION.STATUS).click();
            cy.get(loc.TRANSACTION.BTN_SAVE).click();
            cy.get(loc.MESSAGE).should('contain','Movimentação alterada com sucesso!');
            cy.get(loc.MENU.HOME).click();
            cy.xpath(loc.BALANCE.FN_XP_ACCOUNT_VALUE_FIND(conta,novoValor)).should('exist');
        });
    });

    // Poderia criar comando como os anteriores, mas como era curto, não criei
    it("Should remove a transaction.",()=>{

        cy.get(loc.MENU.EXTRACT).click();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function (){
            let descricao = this.dados.movimentacao.nomeMovimentacaoExclucao;
            cy.xpath(loc.EXTRACT.FN_XP_REMOVE_ELEMENT(descricao)).click();
        });

        // Validando mensagem de sucesso
        cy.get(loc.MESSAGE).should('contain','Movimentação removida com sucesso!');

    });
});
