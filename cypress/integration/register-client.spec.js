/// <reference types="cypress"/>


beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit('http://automationpractice.com/index.php');
    cy.title().should('eq', 'My Store')
})

describe('Register customer on the website', () => {
    it('Registration successfully: When entering the data correctly, then the account data must be displayed.', () => {
        cy.toCreateAccount()
        cy.fillFields()
        cy.checkAccountData()
    });

    it('Email already registered: When entering an email already registered, then an message stating that the email has already been registered', () => {
        cy.toCreateAccount()
        cy.fillFields()
        cy.checkAccountData()

        cy.get('.logout')
            .click()
        cy.get('@email').then(email => {
            cy.get('input#email_create')
                .should('be.visible')
                .type(email)
            cy.get('i.icon-user.left')
                .click()
        })
        cy.get('#create_account_error li')
            .should('have.text', 'An account using this email address has already been registered. Please enter a valid password or request a new one. ')

    });

    it('Missing mandatory data: When submitting the registration without the mandatory data, then an informational message requesting the required data must  be displayed.', () => {
        cy.toCreateAccount()
        cy.get('button#submitAccount')
            .click()
        cy.get('.alert.alert-danger ol li')
            .should('be.visible')
        cy.get('.alert.alert-danger ol li')
            .should('have.length', 8)
    });

    it('Missing email: When submitting the registration without the field email, then an informational message requesting the email must be displayed.', () => {
        cy.get('#page a.login')
            .click()
        cy.get('i.icon-user.left')
            .click()
        cy.get('#create_account_error li')
            .should('have.text', 'Invalid email address.')
        cy.get('#create-account_form h3')
            .should('have.text', 'Create an account')
    });
});
