/// <reference types = "cypress" />

describe("Work with popup",()=>{


    it("Deve testar popup diretamente",()=>{
        const url = 'https://www.wcaquino.me/cypress/frame.html';
        cy.visit(url);

        cy.get('#otherButton').click();

        cy.on('window:alert',msg=>{
            expect(msg).to.be.eq('Click OK!');
        })
    });

    it("Deve verificar se o popup foi invocado",()=>{
        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);

        // criando mock para o metodo open (usado para abrir popup)
        cy.window().then(win=>{
            cy.stub(win,'open').as("janelaAberta")
        });

        cy.get('#buttonPopUp').click();

        // O @ faz o cy buscar o elemento pelo alias (criado anteriormente)
        // Verifica se a função do stub (open) foi invocada
        cy.get('@janelaAberta').should('be.called');
    });

    describe.only("With links",()=>{

        beforeEach(()=>{
            const url = 'https://www.wcaquino.me/cypress/componentes.html';
            cy.visit(url);
        });

        it('Check popup url',()=>{
            cy.contains('Popup2')
                .should('have.prop','href')
                .and('equal','https://www.wcaquino.me/cypress/frame.html');
        });


        it('Should access popup dinamically',()=>{
            cy.contains('Popup2').then($a=>{
                // Recuperando valor do href via jQuery
                const href = $a.prop('href');
                cy.visit(href);

                cy.get('#tfield').type('Funciona!');
            });
        });

        it('Should force link on same page',()=>{
            // removeAttr é um método do jQuery para remover um atributo
            // o atributo target=_blank faz abrir em outra página
            cy.contains('Popup2')
                .invoke('removeAttr','target')
                .click();

            cy.get('#tfield').type('Funciona!');
        });

    });

});