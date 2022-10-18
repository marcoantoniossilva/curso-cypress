const buildEnv = () => {
    cy.server();
    cy.route({
        method: "POST",
        url: "/signin",
        response: {
            id: 1,
            nome: "Usuario falso",
            token: "umastringmuitograndequenaodeveriaseraceitomasnaverdadevai"
        }
    }).as('signin');

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
        }
            ,
        {
            conta_id: 555,
            conta: "Conta para saldo",
            saldo: "534.00"
        }]
    }).as('saldo');

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
            nome: "Conta para movimentacoes",
            visivel: true,
            usuario_id: 1
        }]
    }).as('getContas');

    cy.route({
        method: "GET",
        url: "/extrato/**",
        response: [{
            conta: "Conta com movimentacao",
            id: 1343473,
            descricao: "Movimentacao para exclusao",
            envolvido: "BBB",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2022-10-12T03:00:00.000Z",
            data_pagamento: "2022-10-12T03:00:00.000Z",
            valor: "-1500.00",
            status: true,
            conta_id: 1438660,
            usuario_id: 33074,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para saldo",
            id: 1343474,
            descricao: "Movimentacao 1, calculo saldo",
            envolvido: "CCC",
            observacao: null,
            tipo: "REC",
            data_transacao: "2022-10-12T03:00:00.000Z",
            data_pagamento: "2022-10-12T03:00:00.000Z",
            valor: "3500.00",
            status: false,
            conta_id: 1438661,
            usuario_id: 33074,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para saldo",
            id: 1343475,
            descricao: "Movimentacao 2, calculo saldo",
            envolvido: "DDD",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2022-10-12T03:00:00.000Z",
            data_pagamento: "2022-10-12T03:00:00.000Z",
            valor: "-1000.00",
            status: true,
            conta_id: 1438661,
            usuario_id: 33074,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para saldo",
            id: 1343476,
            descricao: "Movimentacao 3, calculo saldo",
            envolvido: "EEE",
            observacao: null,
            tipo: "REC",
            data_transacao: "2022-10-12T03:00:00.000Z",
            data_pagamento: "2022-10-12T03:00:00.000Z",
            valor: "1534.00",
            status: true,
            conta_id: 1438661,
            usuario_id: 33074,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para extrato",
            id: 1343477,
            descricao: "Movimentacao para extrato",
            envolvido: "FFF",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2022-10-12T03:00:00.000Z",
            data_pagamento: "2022-10-12T03:00:00.000Z",
            valor: "-220.00",
            status: true,
            conta_id: 1438662,
            usuario_id: 33074,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para alterar",
            id: 1351706,
            descricao: "Movimentacao 12, calculo saldo",
            envolvido: "CCC",
            observacao: null,
            tipo: "REC",
            data_transacao: "2022-10-17T03:00:00.000Z",
            data_pagamento: "2022-10-17T03:00:00.000Z",
            valor: "534.00",
            status: false,
            conta_id: 1438657,
            usuario_id: 33074,
            transferencia_id: null,
            parcelamento_id: null
        }]
    })
}

export default buildEnv;