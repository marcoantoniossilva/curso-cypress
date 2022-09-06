/// <reference types = "cypress" />

describe("Cypress basics", () => {
  it.only("Should visit a page and assert title", () => {
    const url = "https://wcaquino.me/cypress/componentes.html";

    // cy = Variável grobal do cypress
    // Visitando uma url
    cy.visit(url);

    //should é usado pois o cypress utiliza de promises para esse tipo de verificação
    //Verificando se o título da página é igual ao parametrizado
    cy.title().should("be.equal", "Campo de Treinamento");

    //Verificando se o título da página contém a string parametrizada
    cy.title().should("contain", "Treinamento");

    //Unindo os dois últimos testes
    cy.title()
      .should("be.equal", "Campo de Treinamento")
      .should("contain", "Treinamento");

    //Outra forma de encadear testes com 'and'
    cy.title()
      .should("be.equal", "Campo de Treinamento")
      .and("contain", "Treinamento");

    //imprimindo título com promisse
    cy.title().then((titulo) => {
      console.log(titulo);
    });

    //imprimindo título com promisse usando should() que também trata promisses
    cy.title().should((titulo) => {
      console.log(titulo);
    });

    // Escrevedo o titulo em um campo de texto
    cy.title().then((titulo) => {
      cy.get('#formNome').type(titulo);
    });


    // Guardando valores em variáveis
    let tituloSincronizado;

    cy.title().then((titulo) => {
      tituloSincronizado = titulo;
    });


    // Não funciona dessa forma
    //cy.get('[data-cy=dataSobrenome]').type(tituloSincronizado);

    cy.get('[data-cy=dataSobrenome]').then($elemento =>{
      $elemento.val(tituloSincronizado);
    });


    cy.get('#elementosForm\\:sugestoes').then($elemento =>{
      cy.wrap($elemento).type(tituloSincronizado);
    })
  });

  it("Should find and interect with an element", () => {
    const url = "https://wcaquino.me/cypress/componentes.html";

    // cy = Variável grobal do cypress
    // Visitando uma url
    cy.visit(url);

    //Pegando um elemento e verificando o seu 'value'
    cy.get("#buttonSimple").should("have.value", "Clique Me!");

    //Pegando um elemento e clicando nele
    //cy.get('#buttonSimple').click();

    //Pegando um elemento
    //verificando o seu 'value' é igual a 'Clique Me!'
    //clicando nele
    //verificando se o seu 'value' é igual a 'Obrigado!'
    cy.get("#buttonSimple")
      .should("have.value", "Clique Me!")
      .click()
      .should("have.value", "Obrigado!");

    //Usado para permitir a depuração no navegador a partir deste ponto
    //Informações são impressas no console
    cy.title().should("be.equal", "Campo de Treinamento").debug();

    cy.pause(); //Usado para permitir o acompanhamento passo-a-passo dos testes
    cy.title().should("be.equal", "Campo de Treinamento");
    cy.get("#buttonSimple").should("have.value", "Obrigado!");
  });
});
