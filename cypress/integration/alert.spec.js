/// <reference types = "cypress" />

describe("Work with alerts",()=>{
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

    it("Alert",()=>{

        cy.get('#alert').click();

        // cy.on pega eventos ocorridos na tela
        cy.on('window:alert', mensagem =>{
            console.log(mensagem);

            expect(mensagem).to.be.eq('Alert Simples');
        })

    });

    it.only("Alert with mock",()=>{

        // criando o mock com cy.stub
        // as() dá um nome ao mock
        const stub = cy.stub().as('alerta');

        

        // cy.on pega eventos ocorridos na tela
        cy.on('window:alert', stub);

        
        cy.get('#alert').click().then(()=>{
            // Espera que a primeira chamada do stub ([0]) tenha sido
            // chamada com o parẫmetro 'Alert Simples'
            expect(stub.getCall([0])).to.be.calledWith('Alert Simples');
        })
    });

    it.only("Confirm",()=>{

        // Cadastrando assertivas

        cy.on('window:confirm', mensagem =>{
            expect(mensagem).to.be.eq('Confirm Simples');
        });

        
        cy.on('window:alert', mensagem =>{
            expect(mensagem).to.be.eq('Confirmado');
        });

        // Clicando
        cy.get('#confirm').click();
    });

    it.only("Deny",()=>{

        // Cadastrando assertivas

        cy.on('window:confirm', mensagem =>{
            expect(mensagem).to.be.eq('Confirm Simples');

            // O return false diz pro cy que eu quero testar o fluxo de clicar
            // em cancelar do confirm
            return false;
        });

        
        cy.on('window:alert', mensagem =>{
            expect(mensagem).to.be.eq('Negado');
        });

        // Clicando
        cy.get('#confirm').click();
    });

    it.only("Prompt",()=>{

        // cy.window gerencia todas as funções do window
        cy.window().then(wind =>{
            // Criando um mock da função 'promp' do window
            // o returns informa o que deve ser digitado no prompt
            cy.stub(wind,'prompt').returns('42');
        });


        cy.on('window:confirm', mensagem =>{
            expect(mensagem).to.be.eq('Era 42?');
        });

        cy.on('window:alert', mensagem =>{
            expect(mensagem).to.be.eq(':D');
        });

        // Clicando
        cy.get('#prompt').click();
    });


    it.only("Desafio validando alguns campos",()=>{

        const stub = cy.stub().as('alerta');
        
        cy.on('window:alert', stub);
        
        cy.get('#formCadastrar').click().then(()=>{
            expect(stub.getCall([0])).to.be.calledWith('Nome eh obrigatorio');
        });

        cy.get('#formNome').type('Marco');

        cy.get('#formCadastrar').click().then(()=>{
            expect(stub.getCall([1])).to.be.calledWith('Sobrenome eh obrigatorio');
        });

        cy.get('[data-cy=dataSobrenome]').type('Antonio');

        cy.get('#formCadastrar').click().then(()=>{
            expect(stub.getCall([2])).to.be.calledWith('Sexo eh obrigatorio');
        });

        cy.get('#formSexoMasc').click()

        cy.get('#formCadastrar').click().then(()=>{
            cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!');
        });
    });
});