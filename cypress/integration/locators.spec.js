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

    // Documentação jquery selector = https://www.w3schools.com/jquery/jquery_ref_selectors.asp
    it("Using jQuery selector...",()=>{
        // Selector do cy
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]');

        // Outra forma de chegar no mesmo elemento
        //Selector do jQuery
        //table = pegar uma tabela
        // #tabelaUsuarios = de id = tabelaUsuarios
        // tbody = pegar um elemento tbody que seja descendente dele
        // > tr:eq(0) = pegar um tr (>) que seja descendente direto do tbody (:eq(0)) e que seja o primeiro
        // td:nth-child(3) pegar um td que seja descendente de um tr (nth-child(3)) e que seja o terceiro filho
        // > input pegar o input que seja descendente direto do elemento encontrado até a linha acima

        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input');

        // Outra forma de chegar no mesmo elemento
        // o * antes do = simboliza que quer o elemento que contém. EX: Contém 'Francisco' no onclick
        cy.get('[onclick=\'alert(\\\'Francisco\\\')\']');

        // Outra forma de chegar no mesmo elemento
        // o * antes do = simboliza que quer o elemento que contém. EX: Contém 'Francisco' no onclick
        cy.get('[onclick*=\'Francisco\']');

        // Chegando no input cuja escolaridade seja igual a 'Doutorado' que apareca pela primeira vez
        // td:contains(\'Doutorado\'):eq(0) = primeiro td que contenha 'Doutorado'
        // ~ td:eq(3) input = pega o input dentro do terceiro td que é irmão do anterior (~)
        cy.get('table#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) input');

    });
});