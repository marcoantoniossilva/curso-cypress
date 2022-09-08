/// <reference types = "cypress" />

describe("Work with iframes",()=>{

    it("Deve preencher campo dentro de iframe",()=>{
        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);

        cy.get('#frame1').then(iframe=>{
            // contenrs pega os filhos dos elementos
            // find busca por uma tag
            const body = iframe.contents().find('body');

            //wrap faz o cy gerenciar o objeto
            cy.wrap(body).find('#tfield')
                .type('Funcionou!')
                .should('have.value',"Funcionou!")
        });

        // Eventos de alert, prompt e confirm dentros de iframe não são
        // gerenciados pelo cy, pois está fora do escopo dele. Para testar
        // estes eventos, deve ser criado um teste específico para o arquivo
        // do iframe, como pode ser observado no teste abaixo.
    });

    it("Deve testar iframe separadamente",()=>{
        const url = 'https://www.wcaquino.me/cypress/frame.html';
        cy.visit(url);

        cy.get('#otherButton').click();

        cy.on('window:alert',msg=>{
            expect(msg).to.be.eq('Click OK!');
        })
    });
});