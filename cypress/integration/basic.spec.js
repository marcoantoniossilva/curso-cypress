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
});
