/// <reference types = "cypress" />

describe("Work with basic elements",()=>{
    // Todos os testes que estão dentro deste grupo irão aproveitar
    // o código do hook abaixo que será executado antes de todos os testes
    before(()=>{
        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);
    });

    // beforeEach pode ser utilizado para executar um trecho de código antes de cada teste 
    beforeEach(()=>{
        cy.reload();
    });

    it("Text",()=>{
        // Procurando o texto 'Cuidado' dentro do 'body'
        cy.get('body').should('contain','Cuidado');

        // Procurando o texto 'Cuidado' dentro de um elemeno 'span'
        cy.get('span').should('contain','Cuidado');

        // Procurando o texto 'Cuidado' dentro de um elemento de classe 'facilAchar'
        cy.get('.facilAchar').should('contain','Cuidado');

        // Procurando o elemento de classe 'facilAchar' possui o texto completo parametrizado
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...');
    })

    it("Links",()=>{
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text','Voltou!');

        // Recarrega a página
        cy.reload();
        cy.get('#resultado').should('have.not.text','Voltou!');

        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text','Voltou!');
    
    })

    it.only("Text fields",()=>{
        // Inserindo conteúdo com 'type()'
        // mais detalhes do type: https://docs.cypress.io/api/commands/type
        cy.get('#formNome').type("Cypress Test");

        // Valores de input, são recuperados por 'value'
        cy.get('#formNome').should('have.value','Cypress Test');

        cy.get('#elementosForm\\:sugestoes')
            .type("TextArea")
            .should('have.value','TextArea');

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
        .type('???');

        // Escrevendo e apagando caracteres com eventos de tecla (backspace)
        // Outros eventos de teclas: selectAll, moveToStart, moveToEnd, del, 
        // backspace, esc, enter, rightArrow, leftArrow, upArrow, downArrow, 
        // home, end, insert, pageUp, pageDown, {, alt, option, ctrl, control, 
        // meta, command, cmd, shift.
        cy.get('[data-cy=dataSobrenome]')
            .type("Teste12345{backspace}{backspace}")
            .should('have.value','Teste123');

        // Clear() apaga o value de um input
        // {selectall} seleciona todo o conteudo do elemento
        // O segundo parâmetro do 'type' é um objeto que pode ter algumas
        // configurações, nesse caso foi um delay
        cy.get('#elementosForm\\:sugestoes')
        .clear()
        .type("Erro{selectall}acerto", {delay: 100})
        .should('have.value','acerto');
    })
})