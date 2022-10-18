/// <reference types = "cypress" />

import loc from "../../support/locators";
import "../../support/commandsContas";
import buildEnv from "../../support/buildEnv"

describe("Should test at a functional level", () => {

    beforeEach(() => {
        const url = 'https://barrigareact.wcaquino.me';
        cy.visit(url);
        buildEnv();
        cy.login('email@errado', 'senha errada');
        cy.get(loc.MENU.HOME).click();
    });

    after(() => {
        cy.clearLocalStorage();
    });


    it("Should create an account", () => {

        cy.route({
            method: "POST",
            url: "/contas",
            response: {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 1000
            }
        }).as('postContas');

        cy.acessarMenuConta();

        cy.route({
            method: "GET",
            url: "/contas",
            response: [{
                id: 1,
                nome: "Conta para alterar",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: "Conta falsa mesmo nome",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 1
            }]
        }).as('getContasUpdated');

        cy.inserirConta('Conta de teste');

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');

    });

    it("Should update an account", () => {
        cy.route({
            method: "PUT",
            url: "/contas/**",
            response: {
                id: 1,
                nome: "Conta falsa alterada",
                visivel: true,
                usuario_id: 1000
            }
        }).as('putContas');

        cy.acessarMenuConta();

        cy.route({
            method: "GET",
            url: "/contas",
            response: [{
                id: 1,
                nome: "Conta falsa alterada",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: "Conta falsa mesmo nome",
                visivel: true,
                usuario_id: 1
            }]
        }).as('getContasUpdated');

        cy.xpath(`//table//td[contains(.,'Conta para alterar')]/..//i[@class='far fa-edit']`)
            .click();

        // Recuperando o botão editar da conta criada e clicando
        // Limpando o campo e digitando o nome da conta + 2
        cy.get(loc.ACCOUNTS.NAME)
            .clear()
            .type('Conta falsa alterada');

        cy.get(loc.ACCOUNTS.BTN_SAVE).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso');

    });

    it("Should not create an account with same name.", () => {

        cy.route({
            method: "POST",
            url: "/contas",
            response: {
                error: "Já existe uma conta com esse nome!"
            },
            status: 400
        }).as('postContasMesmoNome');

        cy.acessarMenuConta();

        cy.inserirConta('Conta falsa mesmo nome');

        cy.get(loc.MESSAGE).should('contain', 'code 400');

    });

    it("Should create a transaction", () => {



        cy.acessarMenuMovimentacao();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function () {
            let desc = this.dados.movimentacao.descricao;
            let vl = this.dados.movimentacao.valor;
            let contaFalsa = this.dados.movimentacao.conta;

            cy.route({
                method: "GET",
                url: "/extrato/**",
                response: [
                    { conta: "Conta com movimentacao", id: 1343473, descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null, tipo: "DESP", data_transacao: "2022-10-12T03:00:00.000Z", data_pagamento: "2022-10-12T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 1438660, usuario_id: 33074, transferencia_id: null, parcelamento_id: null },
                    { conta: "Conta para saldo", id: 1343474, descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null, tipo: "REC", data_transacao: "2022-10-12T03:00:00.000Z", data_pagamento: "2022-10-12T03:00:00.000Z", valor: "3500.00", status: false, conta_id: 1438661, usuario_id: 33074, transferencia_id: null, parcelamento_id: null },
                    { conta: "Conta para saldo", id: 1343475, descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null, tipo: "DESP", data_transacao: "2022-10-12T03:00:00.000Z", data_pagamento: "2022-10-12T03:00:00.000Z", valor: "-1000.00", status: true, conta_id: 1438661, usuario_id: 33074, transferencia_id: null, parcelamento_id: null },
                    { conta: "Conta para saldo", id: 1343476, descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null, tipo: "REC", data_transacao: "2022-10-12T03:00:00.000Z", data_pagamento: "2022-10-12T03:00:00.000Z", valor: "1534.00", status: true, conta_id: 1438661, usuario_id: 33074, transferencia_id: null, parcelamento_id: null },
                    { conta: "Conta para extrato", id: 1343477, descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null, tipo: "DESP", data_transacao: "2022-10-12T03:00:00.000Z", data_pagamento: "2022-10-12T03:00:00.000Z", valor: "-220.00", status: true, conta_id: 1438662, usuario_id: 33074, transferencia_id: null, parcelamento_id: null },
                    { conta: "Conta para alterar", id: 1351706, descricao: "Movimentacao 12, calculo saldo", envolvido: "CCC", observacao: null, tipo: "REC", data_transacao: "2022-10-17T03:00:00.000Z", data_pagamento: "2022-10-17T03:00:00.000Z", valor: "125.00", status: false, conta_id: 1438657, usuario_id: 33074, transferencia_id: null, parcelamento_id: null },
                    { conta: contaFalsa, id: 1351706, descricao: desc, envolvido: this.dados.movimentacao.interessado, observacao: null, tipo: "REC", data_transacao: "2022-10-17T03:00:00.000Z", data_pagamento: "2022-10-17T03:00:00.000Z", valor: vl, status: false, conta_id: 1438657, usuario_id: 33074, transferencia_id: null, parcelamento_id: null }
                ]
            })

            cy.route({
                method: "POST",
                url: "/transacoes",
                response: {
                    id: 1351706,
                    descricao: desc,
                    envolvido: "CCC",
                    observacao: null,
                    tipo: "REC",
                    data_transacao: "2022-10-17T03:00:00.000Z",
                    data_pagamento: "2022-10-17T03:00:00.000Z",
                    valor: vl,
                    status: false,
                    conta_id: 1438657,
                    usuario_id: 33074,
                    transferencia_id: null,
                    parcelamento_id: null
                },
                status: 201
            }).as('postCriarTransacao');

            cy.inserirMovimentacao(
                desc,
                vl,
                this.dados.movimentacao.interessado, contaFalsa);

            // Validações
            // Validando mensagem de sucesso
            cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!');
            // Validando que a lista de movimentações agora contém 7 registros
            cy.get(loc.EXTRACT.REGISTERS).should('have.length', 7);

            // Validando que a movimentação consta na lista com xpath
            // Pra isso, valida que um span contenha a descricao da movimentação
            // e o irmão que contenha o valor
            cy.xpath(
                loc.EXTRACT.XP_DESCRIPTION_VALUE_FIND
                    .replace('DESCRIPTION', `${desc}`)
                    .replace('VALUE', `${vl}`)
            ).should('exist');

        });
    });

    // Poderia criar comando como os anteriores, mas como era curto, não criei
    it("Should get balance.", () => {



        cy.get(loc.MENU.HOME).click();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function () {
            let conta = this.dados.saldo.contaParaSaldo;
            let vl = this.dados.saldo.valor;
            let mvAltSaldo = this.dados.movimentacao.movParaAlterarSaldo;
            let novoValor = this.dados.saldo.novoValor;


            cy.route({
                method: "GET",
                url: "/transacoes/**",
                response: {
                    conta: conta,
                    id: 1343474,
                    descricao: mvAltSaldo,
                    envolvido: "CCC",
                    observacao: null,
                    tipo: "REC",
                    data_transacao: "2022-10-12T03:00:00.000Z",
                    data_pagamento: "2022-10-12T03:00:00.000Z",
                    valor: vl,
                    status: false,
                    conta_id: 1438661,
                    usuario_id: 33074,
                    transferencia_id: null,
                    parcelamento_id: null
                },
                status: 200
            }).as('getExtrato');

            cy.route({
                method: "PUT",
                url: "/transacoes/**",
                response: {
                    conta: conta,
                    id: 1343474,
                    descricao: mvAltSaldo,
                    envolvido: "CCC",
                    observacao: null,
                    tipo: "REC",
                    data_transacao: "2022-10-12T03:00:00.000Z",
                    data_pagamento: "2022-10-12T03:00:00.000Z",
                    valor: novoValor,
                    status: false,
                    conta_id: 1438661,
                    usuario_id: 33074,
                    transferencia_id: null,
                    parcelamento_id: null
                },
                status: 200
            }).as('put');

            cy.route({
                method: "GET",
                url: "/saldo",
                response: [{
                    conta_id: 999,
                    conta: "Conta false 1",
                    saldo: "100.00"
                },
                {
                    conta_id: 888,
                    conta: "Conta falsa 2",
                    saldo: "200.00"
                },
                {
                    conta_id: 777,
                    conta: "Conta falsa 3",
                    saldo: "123456789.99"
                },
                {
                    conta_id: 666,
                    conta: "Conta para movimentacoes",
                    saldo: "534.00"
                },
                {
                    conta_id: 555,
                    conta: "Conta para saldo",
                    saldo: "4034"
                }]
            }).as('saldoFinal');

            // chama o locator com parametro dinamico
            cy.xpath(loc.BALANCE.FN_XP_ACCOUNT_VALUE_FIND(conta, vl)).should('exist');


            // Editando um movimento para alterar o saldo
            cy.get(loc.MENU.EXTRACT).click();
            cy.xpath(loc.EXTRACT.FN_XP_EDIT_ELEMENT(mvAltSaldo)).click();
            cy.get(loc.TRANSACTION.DESCRIPTION).should('have.value', mvAltSaldo);
            cy.get(loc.TRANSACTION.STATUS).click();
            cy.get(loc.TRANSACTION.BTN_SAVE).click();
            cy.get(loc.MESSAGE).should('contain', 'Movimentação alterada com sucesso!');
            cy.get(loc.MENU.HOME).click();



            cy.xpath(loc.BALANCE.FN_XP_ACCOUNT_VALUE_FIND(conta, novoValor)).should('exist');
        });
    });

    // Poderia criar comando como os anteriores, mas como era curto, não criei
    it("Should remove a transaction.", () => {

        cy.route({
            method: "DELETE",
            url: "/transacoes/**",
            status: 204,
            response: {}
        }).as('deleteTransaction');

        cy.get(loc.MENU.EXTRACT).click();

        // Carrega as informações do arquivo 'barrigaDataSite'
        cy.fixture("barrigaDataSite").as("dados").then(function () {
            let descricao = this.dados.movimentacao.nomeMovimentacaoExclucao;
            cy.xpath(loc.EXTRACT.FN_XP_REMOVE_ELEMENT(descricao)).click();
        });

        // Validando mensagem de sucesso
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!');

    });

    it("Should validate data to create an account", () => {

        // Stub para validar dados (forma 3)
        const reqStub = cy.stub();

        cy.route({
            method: "POST",
            url: "/contas",
            response: {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 1000
            },
            //Validando dados no onRequest (forma 2)
            // onRequest: req => {
            //     expect(req.request.body.nome).to.be.not.empty;
            //     expect(req.request.headers).to.have.property('Authorization');
            // }

            //Validando com Stub (forma 3)
            onRequest: reqStub
        }).as('postContas');

        cy.acessarMenuConta();

        cy.route({
            method: "GET",
            url: "/contas",
            response: [{
                id: 1,
                nome: "Conta para alterar",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: "Conta falsa mesmo nome",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 1
            }]
        }).as('getContasUpdated');

        cy.inserirConta('Nova conta');

        // Validando dado 'nome' (forma 1)
        //cy.wait('@postContas').its('request.body.nome').should('not.be.empty');

        //Validando com stub (continuação da Forma 3)
        cy.wait('@postContas').then(() => {
            expect(reqStub.args[0][0].request.body.nome).to.be.not.empty;
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization');
        });

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');

    });
});
