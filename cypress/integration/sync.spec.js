/// <reference types = "cypress" />

describe("", () => {
  // Todos os testes que estão dentro deste grupo irão aproveitar
  // o código do hook abaixo que será executado antes de todos os testes
  before(() => {
    const url = "https://www.wcaquino.me/cypress/componentes.html";
    cy.visit(url);
  });

  // beforeEach pode ser utilizado para executar um trecho de código antes de cada teste
  beforeEach(() => {
    cy.reload();
  });

  it("Deve aguardar elemento estar disponível", () => {
    // Verifica que o elemento de id '#novoCampo não exista
    cy.get("#novoCampo").should("not.exist");

    cy.get("#buttonDelay").click();

    // Verifica que o elemento de id '#novoCampo existe e escreve nele
    cy.get("#novoCampo").should("exist").type("Funciona");
  });

  it("Deve fazer retrys", () => {
    cy.get("#buttonDelay").click();

    // Verifica que o elemento de id '#novoCampo existe
    // O segundo should falha pois recebe null e ele recebe null pois
    // o primeiro garantiu que o elemento não existe, nesse caso todo o get
    // falha pois ele fica fazendo retrys até que todos os testes encadeados sejam
    // concluídos com sucesso ou que acabe o tempo
    cy.get("#novoCampo").should("not.exist").should("exist");
  });

  it("Uso do find()", () => {
    cy.get("#buttonList").click();

    //  OBS:  tanto o texto 'Item 1' quanto o texto 'Item 2' são acessíveis pelo
    // mesmo caminho (#lista li span)

    cy.get("#buttonList").click();

    // Pegando elementos que estão em uma li  que está em um elemento de id 'lista'
    // e que esses elementos estejam em um span
    cy.get("#lista li").find("span").should("contain", "Item 1");

    // Tentando achar o 'Item 2' pelo caminho parcial + find do último elemento
    // Vai falhar pois ao dar o primeiro comando "cy.get('#lista li')" só existirá
    // um elemento.
    cy.get("#lista li").find("span").should("contain", "Item 2");

    // SOLUÇÃO:
    cy.reload();
    cy.get("#buttonList").click();

    // Pega o 'Item 1 da mesma forma que antes'
    cy.get("#lista li").find("span").should("contain", "Item 1");

    // Pega o 'Item 2' pelo caminho completo, sem o find()
    cy.get("#lista li span").should("contain", "Item 2");
  });

  it("Usando timeout", () => {
    cy.get("#buttonDelay").click();

    // Timeout de 1s em um único teste
    cy.get("#novoCampo", { timeout: 1000 }).should("exist");

    // Para alterar o timeout de todos os testes, basta adicionar a propriedade
    // 'DefaultCommandTimeout: xxxx' no arquivo cypress.json, onde xxxx é o tempo
    // em milissegundos
  });

  it("Usando wait()", () => {
    cy.get("#buttonList").click();

    // Esperando o Item 2 ficar disponível
    // Sem o wait() dá erro pois o Item 2 só aparece depois de 3 segundos do Item 1
    // que também demora 3 segundos para aparecer, estrapolando o timeout padrão do cy

    // é preferível usar o timeout pois o wait segura a aplicação, mesmo que a condição
    // já seja satisfeira.
    cy.wait(5000);
    cy.get("#lista li span").should("contain", "Item 2");
  });

  it.only("Click retry", () => {
    // Com um clique, o botão assume o valor '11'
    cy.get("#buttonCount").click().should("have.value", "11");

    // Com um clique, o botão assume o valor '11' mas se eu esperar o '111', ele não
    // retenta o teste acionando o comando anterior ao should, como era esperado, ou seja
    // ele só retenta acionando o último comando ao should se este não alterar o HTML,
    // porém, o 'click()' está alterando o value do button
    cy.reload();
    cy.get("#buttonCount").click().should("have.value", "111");

    // Pra esse teste dar certo, seria necessário 2 cliques
    cy.reload();
    cy.get("#buttonCount").click().click().should("have.value", "111");
  });

  it.only("Should vs Then", () => {
    // Verificando tamanho da lista com promisses (then)
    cy.get("#buttonListDOM").click();
    //$elemento é um elemento capturado do HTML, ele começa com $ por convenção do jQuery
    cy.get("#lista li span").then(($elemento) => {
      // verifica-se os valores retornados com o uso do expect, que foi estudado
      // no arquivo 'asserts.spec.js'

      //Também consigo imprimir o elemento
      console.log($elemento);
      expect($elemento).to.have.length(1);
    });

    // Verificando tamanho da lista com should
    cy.reload();
    cy.get("#buttonListDOM").click();
    cy.get("#lista li span").should("have.length", 1);

    // Posso trocar o 'then' pelo 'should'
    cy.get("#lista li span").should(($elemento) => {
      // verifica-se os valores retornados com o uso do expect, que foi estudado
      // no arquivo 'asserts.spec.js'

      //Também consigo imprimir o elemento
      console.log($elemento);
      expect($elemento).to.have.length(1);
    });

    // Encadeando testes na promisse
    cy.get("#buttonListDOM")
      .then(($elemento) => {
        console.log($elemento);
        expect($elemento).to.have.length(1);
        expect($elemento).have.value("Listar DOM");

        //se usar return com then ele dá erro, se usar com o should, dá sucesso pois
        // o should sempre retorna o objeto que recebeu, nesse caso o $elemento
        // return 2;
      })
      .and("have.id", "buttonListDOM");

    // Retornando outro objeto depois dos testes com o then
    // como should não funcionaria pois ele sempre retorno o objeto de entrada
    cy.get("#buttonListDOM")
      .then(($elemento) => {
        console.log($elemento);
        expect($elemento).to.have.length(1);
        expect($elemento).have.value("Listar DOM");

        return 2;
      })
      .and("eq", 2)
      .and("not.have.id", "buttonListDOM");

    cy.get("#buttonListDOM").should(($elemento) => {
      console.log($elemento);
      expect($elemento).to.have.length(1); // Faz retentativas até ter este resultado

      cy.get("#buttonListDOM"); // Entra em loop infinito pois vai fazer as retentativas dando
      // o get no elemento de id 'buttonListDOM', não no de id 'buttonListDOM', se estivesse usando o
      // then, ele não entraria em loop
    });
  });
});
