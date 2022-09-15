/// <reference types = "cypress" />

describe("Dinamic tests",()=>{
    // Todos os testes que estão dentro deste grupo irão aproveitar
    // o código do hook abaixo que será executado antes de todos os testes
    before(()=>{
        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);
    });

    beforeEach(()=>{
        cy.reload();
    });

    const foods = ['Carne','Frango','Pizza','Vegetariano'];

    foods.forEach(food=>{

        it(`Cadastro com comida ${food}`,()=>{
            cy.get('#formNome').type("José");
            cy.get('#formSobrenome').type("da Silva");
            cy.get(`[name=formSexo][value=M]`).click();
            // Recuperando checkbox pelos valores dos labels
            // Chaga no label que contém um valor parametrizado e volta no irmão anterior
            // que seja um input(/preceding-sibling::input)
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click();
            cy.get('#formEscolaridade').select("Doutorado");
            cy.get('#formEsportes').select("Corrida");
    
            cy.get('#formCadastrar').click();
            // Verifica se está cadastrado
            cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!');
        });

    });

    it.only("Deve selecionar todos usando a each",()=>{
        cy.get('#formNome').type("José");
        cy.get('#formSobrenome').type("da Silva");
        cy.get(`[name=formSexo][value=M]`).click();

        // Para cada elemento encontrado no elemento de nome 'formComidaFavorita'
        // que no caso é o checkbox, ele vai fazer uma ação que no caso é o click
        // em cada um com esceção ao 'Vegetariano'
        cy.get('[name=formComidaFavorita]').each($elemento=>{
            if($elemento.val() != "vegetariano"){
                cy.wrap($elemento).click();
            }
        });
        cy.get('#formEscolaridade').select("Doutorado");
        cy.get('#formEsportes').select("Corrida");

        cy.MeuComandoPersonalizado('#formCadastrar','Tem certeza que voce eh vegetariano?');
    });

});