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

    it.only('Using Xpath',()=>{

        // Pegando o input cujo valor do onclick contanha o valor 'Francisco'
        cy.xpath('//input[contains(@onclick,\'Francisco\')]');

        // Pegando o input de texto lateral ao anterior
        // table[@id=\'tabelaUsuarios\'] = Tabela cujo id = 'tabelaUsuarios'
        // //td[contains(.,\'Francisco\') = td que contenha 'Francisco' em qualquer lugar
        // /../ = subiu um nível de onde estava
        // input[@type=\'text\'] = input cujo tipo seta de texto
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(.,'Francisco')]/..//input[@type='text']");
    
        // Pegando o radio lateral à segunda vez que aparecer 'Doutorado em um td'
        // Foi adicionado () para 'agrupar' os resultados até aí para que fosse possível
        // recuperar o segundo registro com o comando [2]
        cy.xpath("(//table[@id='tabelaUsuarios']//td[contains(.,'Doutorado')])[2]/..//input[@type='radio']");
        
        // Qualquer elemento cuja propriedade data-test seja igual à 'data2'
        cy.xpath('//*[@data-test=\'data2\']');

        // Recuperando e digtando em campo de texto que contenha em sua linha
        // uma celula com valor 'Usuario A' e outra com valor 'Mestrado'

        // /following-sibling::td = pega o irmão - que seja td e contenha 'Mestrado'
        // em algum lugar - do ojbeto encontrado até esse ponto.
        cy.xpath("//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']")
            .type('Encontrou');

    });
});