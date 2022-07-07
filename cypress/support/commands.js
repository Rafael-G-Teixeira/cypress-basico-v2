
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (){

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Sobrenome')
    cy.get('#email').type('Rafael@rafael.com')
    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click()

})
