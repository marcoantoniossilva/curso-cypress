/// <reference types = "cypress" />

describe("Should test at a functional level",()=>{

    let token;

    before(()=>{
        cy.comandoGetToken('mm@mm','1234')
            .then(tkn =>{
                token = tkn;
        });
    });

    beforeEach(()=>{
        cy.comandoResetApp(token);
    });


    it("Should create an account",()=>{
        cy.request({
            headers: {
                Authorization: `JWT ${token}`
            },
            method: "POST",
            url: "/contas",
            body:{
                nome:"Conta via REST10"
            }
        }).as('resposta');

        cy.get('@resposta').then(resp =>{
            expect(resp.status).to.be.equal(201);
            expect(resp.body).to.have.property("id");
            expect(resp.body).to.have.property("nome","Conta via REST10");
        });
    });

    it.only("Should update an account",()=>{
        cy.request({
            headers: {
                Authorization: `JWT ${token}`
            },
            method: "GET",
            url: "/contas/",
            qs:{
                nome:"Conta para alterar"
            }
        }).then(res =>{
            cy.request({
                headers: {
                    Authorization: `JWT ${token}`
                },
                method: "PUT",
                url: `/contas/${res.body[0].id}`,
                body:{
                    nome:"Novo nome da conta alterado via REST"
                }
            }).as('resposta');
    
            cy.get('@resposta').then(resp =>{
                expect(resp.status).to.be.equal(200);
                expect(resp.body).to.have.property("nome","Novo nome da conta alterado via REST");
            });
        });
    });

    it("Should not create an account with same name.",()=>{

    });

    it("Should create a transaction",()=>{

    });

    it("Should get balance.",()=>{

    });

    it("Should remove a transaction.",()=>{


    });
});
