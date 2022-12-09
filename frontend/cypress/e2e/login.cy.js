
describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    it('test auth', () => {
        Cypress.env('EXTERNAL_API')
        cy.get('#typeEmailX-2').type(Cypress.env('username')    );
        cy.get('#typePasswordX-2').type(Cypress.env('password'));

        cy.wait(2000);
        cy.get('#recaptcha *> iframe')
            .then($iframe => {
                const $body = $iframe.contents().find('body');
                cy.wrap($body)
                    .find('.recaptcha-checkbox-border')
                    .should('be.visible')
                    .click();
            });

cy.get('.btn').click();
    })




});
