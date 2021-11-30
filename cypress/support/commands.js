// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

var faker = require('faker');

Cypress.Commands.add('toCreateAccount', () => {
    let email = faker.internet.email()
    cy.get('#page a.login')
        .click()
    cy.title().should('eq', 'Login - My Store')
    cy.url().should('eq', 'http://automationpractice.com/index.php?controller=authentication&back=my-account')
    cy.get('input#email_create')
        .should('be.visible')
        .type(email)
    cy.get('i.icon-user.left')
        .click()
    cy.url().should('eq', 'http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation')
    cy.get('#noSlide h1')
        .should('have.text', 'Create an account')
    cy.wrap(email).as('email')
})

Cypress.Commands.add('fillFields', () => {
    cy.get('#id_gender1').check()
    cy.get('input#customer_firstname')
        .type(faker.name.firstName())
    cy.get('input#customer_lastname')
        .type(faker.name.lastName())
    cy.get('input#passwd')
        .type(faker.internet.password())
    cy.get('select#days')
        .select('28')
    cy.get('select#months')
        .select('12')
    cy.get('select#years')
        .select('1993')
    cy.get('input#company')
        .type(faker.company.companyName())
    cy.get('input#address1')
        .type(faker.address.streetName())
    cy.get('input#city')
        .type(faker.address.city())
    cy.get('select#id_state')
        .select(6)
    cy.get('input#postcode')
        .type('00008')
    cy.get('input#phone_mobile')
        .type(faker.phone.phoneNumberFormat())
    cy.get('input#phone')
        .type(faker.phone.phoneNumberFormat())
    cy.get('button#submitAccount')
        .click()
})

Cypress.Commands.add('checkAccountData', () => {
    cy.url().should('eq', 'http://automationpractice.com/index.php?controller=my-account')
    cy.get('#center_column h1')
        .should('have.text', 'My account')
    cy.get('#center_column p')
        .should('have.text', 'Welcome to your account. Here you can manage all of your personal information and orders.')
    cy.get('#center_column .row.addresses-lists')
        .should('be.exist')
    cy.get('a[title=Home]')
        .should('be.visible')
})