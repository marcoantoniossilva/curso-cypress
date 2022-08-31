
/// <reference types = "cypress" />

describe("",()=>{
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

    it("Deve aguardar elemento estar disponível",()=>{
        // Verifica que o elemento de id '#novoCampo não exista
        cy.get('#novoCampo')
            .should('not.exist');
        
        cy.get('#buttonDelay')
            .click();
        
        // Verifica que o elemento de id '#novoCampo existe e escreve nele
        cy.get('#novoCampo')
            .should('exist')
            .type('Funciona');
    });

    it("Deve fazer retrys",()=>{
        cy.get('#buttonDelay')
            .click();
        
        // Verifica que o elemento de id '#novoCampo existe
        // O segundo should falha pois recebe null e ele recebe null pois
        // o primeiro garantiu que o elemento não existe, nesse caso todo o get
        // falha pois ele fica fazendo retrys até que todos os testes encadeados sejam
        // concluídos com sucesso ou que acabe o tempo
        cy.get('#novoCampo')
            .should('not.exist')
            .should('exist');
    });

    it("Uso do find()",()=>{
        cy.get('#buttonList')
            .click();

        //  OBS:  tanto o texto 'Item 1' quanto o texto 'Item 2' são acessíveis pelo
        // mesmo caminho (#lista li span)

        cy.get('#buttonList')
            .click();

        // Pegando elementos que estão em uma li  que está em um elemento de id 'lista'
        // e que esses elementos estejam em um span
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1');

        // Tentando achar o 'Item 2' pelo caminho parcial + find do último elemento
        // Vai falhar pois ao dar o primeiro comando "cy.get('#lista li')" só existirá
        // um elemento.
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 2');


        // SOLUÇÃO:
        cy.reload();
        cy.get('#buttonList')
            .click();

        // Pega o 'Item 1 da mesma forma que antes'
        cy.get('#lista li')
        .find('span')
        .should('contain','Item 1');

        // Pega o 'Item 2' pelo caminho completo, sem o find()
        cy.get('#lista li span')
            .should('contain','Item 2');
    });

    it("Usando timeout",()=>{
        cy.get('#buttonDelay')
            .click();

        // Timeout de 1s em um único teste
        cy.get('#novoCampo', {timeout:1000})
            .should('exist');

        // Para alterar o timeout de todos os testes, basta adicionar a propriedade
        // 'DefaultCommandTimeout: xxxx' no arquivo cypress.json, onde xxxx é o tempo
        // em milissegundos
    });

    it.only("Usando wait()",()=>{
        cy.get('#buttonList')
            .click();


        // Esperando o Item 2 ficar disponível
        // Sem o wait() dá erro pois o Item 2 só aparece depois de 3 segundos do Item 1
        // que também demora 3 segundos para aparecer, estrapolando o timeout padrão do cy

        // é preferível usar o timeout pois o wait segura a aplicação, mesmo que a condição
        // já seja satisfeira.
        cy.wait(5000);
        cy.get('#lista li span')
            .should('contain','Item 2');
    });
    
})
