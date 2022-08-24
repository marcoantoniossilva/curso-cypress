/// <reference types = "cypress" />

describe("Cypress basics", () => {
  it("Should visit a page and assert title", () => {
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

    //TODO imprimir log no console
    //TODO escrever o log em um campo de texto
  });

  it("Should find and interect with an element", ()=>{
    const url = "https://wcaquino.me/cypress/componentes.html";

    // cy = Variável grobal do cypress
    // Visitando uma url
    cy.visit(url);

    //Pegando um elemento e verificando o seu 'value'
    cy.get('#buttonSimple').should('have.value',"Clique Me!");

    //Pegando um elemento e clicando nele
    //cy.get('#buttonSimple').click();

    //Pegando um elemento
    //verificando o seu 'value' é igual a 'Clique Me!'
    //clicando nele
    //verificando se o seu 'value' é igual a 'Obrigado!'
    cy.get('#buttonSimple')
      .should('have.value',"Clique Me!")
      .click()
      .should('have.value',"Obrigado!");

  })
});
