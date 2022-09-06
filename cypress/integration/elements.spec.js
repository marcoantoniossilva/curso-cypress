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

    it("Text fields",()=>{
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

        //Pegando elemento que possui a propriedade 'data-cy' e que seu valor
        // seja 'dataSobrenome'
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

    it("RadioButton", ()=>{

        // Clica no radio 'Feminino' e verifica que ele está checado
        cy.get('#formSexoFem')
            .click()
            .should('be.checked');

        // Verifica que o radio 'Masculino' NÃO está checado
        cy.get('#formSexoMasc')
            .should('not.be.checked');


        // Verifica que possui 2 elementos no radio formSexo

        //Pegando elemento que possui a propriedade 'name' e que seu valor
        // seja 'formSexo'
        cy.get("[name='formSexo']").should('have.length',2);
    })

    it("Checkbox",()=>{

        cy.get('#formComidaPizza')
            .click()
            .should('be.checked');

        // Possui 4 elementos que possui o valor 'formComidaFavorita' para
        // a propriedade 'name', por isso passamos um objeto com a
        // configuração 'multiple:true' como argumento para o método 'click()'
        cy.get('[name=formComidaFavorita]')
            .click({multiple:true});

        // 'formComidaPizza' não deve estar marcado
        cy.get('#formComidaPizza')
            .should('not.be.checked');
    })

    
    it("ComboBox",()=>{

        // Selecionando a opção 'Superior' (do jeito que visalizados) e verificando se
        // a opção selecionada é a 'Superior' (do jeito que fica no value do option, 
        // ou seja 'superior')
        cy.get('[data-test=dataEscolaridade]')
            .select('Superior')
            .should('have.value','superior');

        // Selecionando a opção '2º Grau Completo' do jeito que fica no value do option, 
        // ou seja 'superior')
        cy.get('[data-test=dataEscolaridade]')
        .select('2graucomp')
        .should('have.value','2graucomp');


        // Verificando o tamanho do combo
        cy.get('[data-test=dataEscolaridade] option').should('have.length',8);

        // Validando que o combo possua os valores 'Superior' e 'Mestrado'
        cy.get('[data-test=dataEscolaridade] option').then($arr=>{
            const values = [];
            $arr.each(function(){
                values.push(this.innerHTML);
            });
            expect(values).to.include.members(["Superior","Mestrado"]);
        })
    })

    it.only("Combo múltiplo",()=>{

        // Selecionando duas opções do combo múltiplo do jeito que fica no value do option.
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao','Corrida']);

        // Validando que o combo possua algumas opções

        // Não funciona
        //cy.get('[data-testid=dataEsportes]')
        //    .should('have.value','natacao','Corrida', 'nada');

        cy.get('[data-testid=dataEsportes]').then($elemento =>{
            expect($elemento.val()).to.be.deep.eq(['natacao','Corrida']);
            expect($elemento.val()).to.have.length(2);
        });

        // Validando que o combo possua algumas opções através do invoke
        // eql = deep equal
        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql',['natacao','Corrida']);
    })
})