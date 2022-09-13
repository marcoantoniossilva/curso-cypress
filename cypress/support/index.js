// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

require('cypress-xpath')

// Alterando a ordem de prioridade dos locators
// Dessa forma, o ID fica sendo a estratégia preferida
// para localizar um elemento.
// Pode usar também um atributo personalisável ex: data-marco
// mais detalhes: https://docs.cypress.io/api/cypress-api/selector-playground-api#Get-Selector
Cypress.SelectorPlayground.defaults({
    selectorPriority: [
        'id',
        'class',
        'attributes',
        'data-cy',
        'data-test',
        'data-testid',
        'tag',
        'nth-child']
});