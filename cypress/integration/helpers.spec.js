/// <reference types = "cypress" />

describe("Helpers...",()=>{

    it("Wrap",()=>{
        const obj = {nome: 'User', idade: 20};
        expect(obj).to.have.property('nome');

        // cy.wrap encapsula um objeto js para ser usado como um objeto do cypress
        cy.wrap(obj).should('have.property','nome');

        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);

        cy.get('#formNome').then($el =>{
            //$el.type("não funciona");
            $el.val('Funciona via jQuery');

            cy.wrap($el).type("Funciona via cypress com wrap")
        });


        const promise = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(10);
            },500);
        });

        cy.get('#buttonSimple').then(()=>
            console.log("Encontrei o primeiro botão")
        )

        // Promise normal não é gerenciada pelo Cy, neste exemplo a 
        // promise é impressa antes dos comandos 'console.log'
        promise.then(num=>console.log(num));

        // Com wrap() o cy passa a gerenciar a promise e impreme entre
        // os comandos 'console.log'
        cy.wrap(promise).then(ret=>{console.log(ret)});

        cy.get('#buttonList').then(()=>
            console.log("Encontrei o segundo botão")
        );

        cy.wrap(1).then(num =>{
            return 2;
        }).should('eq',2);

    });

    it("Its...",()=>{
        const obj = {nome: 'User', idade: 20};
        cy.wrap(obj).should('have.property','nome',"User");
        
        // Método its() pega apenas parte do objeto, neste exemplo, apenas 'nome'
        cy.wrap(obj).its('nome').should('be.equal','User')
    
        // Pegando apenas o objeto interior 'endereço'
        const obj2 = {nome: 'User', idade: 20, endereco:{rua: 'Rua A'}};
        cy.wrap(obj2).its('endereco').should('have.property','rua')

        // Encadeando chamadas de its
        cy.wrap(obj2).its('endereco').its('rua').should('contain','A');

        // Também poderia ser assim
        cy.wrap(obj2).its('endereco.rua').should('contain','A');


        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);
        cy.title().its('length').should('be.equal',20);
    });

    it.only("Invoke...",()=>{
        // Função que só retorna 1
        const getValue = () => 1;

        // Colocando função dentro de um objeto (a função passa a ser o valor de 
        // uma propriedade do objeto), usando o wrap para encapsular o objeto para
        // ser gerenciado pelo cy, usando invoke para chamar a função e usando o should
        // para comparar o retorno da função.
        cy.wrap({func: getValue}).invoke('func').should('be.equal',1);

        const soma = (a,b) => a+b;

        // chamando uma função e passando valores
        cy.wrap({func: soma}).invoke('func',2,5).should('be.equal',7);


        const url = 'https://www.wcaquino.me/cypress/componentes.html';
        cy.visit(url);

        // Chamando a função val() para passar o valor a ser escrito no campo
        cy.get('#formNome').invoke('val', 'Texto via invoke');

        // Recuperando objeto window e chamando funcao
        cy.window().invoke('alert',"Chamando função alert");

        cy.get("#resultado")
            .invoke('html','<input type="button", value="hacked"/>');

    });

});