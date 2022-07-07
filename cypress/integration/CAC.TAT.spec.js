/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach( () => {

        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {

        cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT')

    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {

        cy.clock()

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('Rafael@rafael.com')
        cy.get('#open-text-area').type('teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })
    
    it('Preenche os campos sem delay', () => {

        cy.clock()

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('Rafael@rafael.com')
        cy.get('#open-text-area')
        .type('oueasdoajfwefodffmlnfkllnefkjdfewhfgyetdwdhavsfqgwqepweyqwueyuqiwdbwhvqhvjvzjbiehruhjbchjvihebwygfkjbdsfhsjh', {delay: 0})

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.clock()

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('TESTE,teste.com')
        cy.get('#open-text-area')
        .type('teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')

    })

    Cypress._.times(5, function () {

    it('Verifica se campo numero aceita somente numeros', () => {

        cy.get('#phone').type('ABCDFGHIJKLMNOPQRSTUVXYZW')

        cy.get('#phone').should('be.empty')

        cy.get('#phone').type('999999999')

        cy.get('#phone').should('have.value', '999999999')
    })

})

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.clock()

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('Rafael@rafael.com')
        cy.get('#open-text-area').type('teste')

        cy.get('#phone-checkbox').check()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')

    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone',() => {

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('Rafael@rafael.com')  
        cy.get('#phone').type('999999999')

        cy.get('#firstName').should('have.value', 'Rafael')
        cy.get('#lastName').should('have.value', 'Sobrenome')
        cy.get('#email').should('have.value', 'Rafael@rafael.com')
        cy.get('#phone').should('have.value', '999999999')

        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#email').clear()
        cy.get('#phone').clear()

        cy.get('#firstName').should('have.value', '')
        cy.get('#lastName').should('have.value', '')
        cy.get('#email').should('have.value', '')
        cy.get('#phone').should('have.value', '')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{

        cy.clock()
        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')

    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })

    it('Seleciona um produto (YouTube) por seu texto', () => {

        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {

        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })

    it('Seleciona um produto (Blog) por seu índice', () => {

        cy.get('#product').select(1).should('have.value', 'blog')
        
    })

    it('Marca o tipo de atendimento "Feedback"', () => {

        cy.get('input[type = "radio"][value = "feedback"]').check()
          .should('have.value', 'feedback')

    })

    it('Marca cada tipo de atendimento', () => {

        cy.get('input[type = "radio"]').should('have.length', 3)
          .each(function($radio){

            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })

    })

    it('marca ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type = "checkbox"]').check().should('be.checked')

        cy.get("input[type = 'checkbox']").last().uncheck().should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', () => {

        cy.get('#file-upload').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function ($input){

            expect($input[0].files[0].name).to.equal('example.json')

        })

    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {

        cy.get('#file-upload').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: "drag-drop" })
        .should(function ($input){

            expect($input[0].files[0].name).to.equal('example.json')

        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function ($input){

            expect($input[0].files[0].name).to.equal('example.json')

        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {

        cy.get('#privacy a')
          .invoke('removeAttr', 'target')    
          .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {

    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')

    })

    it('Preenche a area de texto usando o comando invoke', () => {

        const longText = Cypress._.repeat('ABCDEFGHIJKLMNOPQRSTUVXYZ', 20)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)

    })

    it('Faz uma requisição HTTP', () => {

        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function (response){
            console.log(response)
                const {status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
        })
    })

    it.only('Desafio do gato', () => {

        cy.get('#cat').should('not.be.visible')
        .invoke('show')
        .should('be.visible')

    })
    
  })