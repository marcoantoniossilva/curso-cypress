/// <reference types = "cypress" />

describe("Should test at a functional level", () => {

    let token;

    before(() => {
        cy.comandoGetToken('mm@mm', '1234')
            .then(tkn => {
                token = tkn;
            });
    });

    beforeEach(() => {
        cy.comandoResetApp(token);
    });


    it("Should create an account", () => {
        cy.request({
            headers: {
                Authorization: `JWT ${token}`
            },
            method: "POST",
            url: "/contas",
            body: {
                nome: "Conta via REST10"
            }
        }).as('resposta');

        cy.get('@resposta').then(resp => {
            expect(resp.status).to.be.equal(201);
            expect(resp.body).to.have.property("id");
            expect(resp.body).to.have.property("nome", "Conta via REST10");
        });
    });

    it("Should update an account", () => {
        cy.getContaIdByName(token, "Conta para alterar")
            .then(contaId => {
                cy.request({
                    headers: {
                        Authorization: `JWT ${token}`
                    },
                    method: "PUT",
                    url: `/contas/${contaId}`,
                    body: {
                        nome: "Novo nome da conta alterado via REST"
                    }
                }).as('resposta');

                cy.get('@resposta').then(resp => {
                    expect(resp.status).to.be.equal(200);
                    expect(resp.body).to.have.property("nome", "Novo nome da conta alterado via REST");
                });
            });
    });

    it("Should not create an account with same name.", () => {
        cy.request({
            headers: {
                Authorization: `JWT ${token}`
            },
            method: "POST",
            url: "/contas",
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).as('resposta');

        cy.get('@resposta').then(resp => {
            expect(resp.status).to.be.equal(400);
            expect(resp.body.error).to.be.equal("Já existe uma conta com esse nome!");
        });
    });

    it("Should create a transaction", () => {
        cy.getContaIdByName(token, "Conta para movimentacoes")
            .then((contaId) => {
                cy.request({
                    headers: {
                        Authorization: `JWT ${token}`
                    },
                    method: "POST",
                    url: "/transacoes",
                    body: {
                        conta_id: contaId,
                        data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                        descricao: "Movimentacao 1, calculo saldo",
                        envolvido: "CCC",
                        status: true,
                        tipo: "REC",
                        valor: "52.23",
                    }
                }).as('resposta');

                cy.get('@resposta').its('status').should('be.equal', 201);
                cy.get('@resposta').its('body.id').should('exist');
            });
    });

    it("Should get balance.", () => {
        cy.request({
            headers: {
                Authorization: `JWT ${token}`
            },
            method: "GET",
            url: "/saldo"
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(conta => {
                if (conta.conta === 'Conta para saldo') {
                    saldoConta = conta.saldo;
                }
            });
            expect(saldoConta).to.be.equal('534.00');
        });

        cy.getTransacaoByDescricao(token, 'Movimentacao 1, calculo saldo').then(transacao => {
            cy.request({
                // Se não enviar o token no cabeçalho da requisição, ele consegue preencher por
                // conta do método sobrescrito 'request' em ../support/commands.js

                // headers: {
                //     Authorization: `JWT ${token}`
                // },
                method: "PUT",
                url: `/transacoes/${transacao.id}`,
                body: {
                    status: true,
                    conta_id: transacao.conta_id,
                    data_pagamento: Cypress.moment(transacao.data_pagamento).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment(transacao.data_transacao).format('DD/MM/YYYY'),
                    descricao: transacao.descricao,
                    envolvido: transacao.envolvido,
                    valor: transacao.valor
                }
            }).its('status').should('be.equal', 200);
        });

        cy.request({
            headers: {
                Authorization: `JWT ${token}`
            },
            method: "GET",
            url: "/saldo"
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(conta => {
                if (conta.conta === 'Conta para saldo') {
                    saldoConta = conta.saldo;
                }
            });
            expect(saldoConta).to.be.equal('4034.00');
        });
    });

    it("Should remove a transaction.", () => {
        cy.getTransacaoByDescricao(token, 'Movimentacao para exclusao').then(transacao => {
            cy.request({
                headers: {
                    Authorization: `JWT ${token}`
                },
                method: "DELETE",
                url: `/transacoes/${transacao.id}`,
            }).its('status').should('be.equal', 204);
        });
    });

});
