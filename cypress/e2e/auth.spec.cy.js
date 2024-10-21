// cypress/e2e/auth.spec.js

it('Login with valid credentials and testing logout', () => {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.wait(500)
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click()
    cy.get('#loginEmail').type('berate01275@stud.noroff.no', {
        delay: 50,
        force: true,
    })
    cy.get('#loginPassword').type('frontenddev2024')
    cy.wait(500)
    cy.get('#loginForm > .modal-footer > .btn-success').click()
    cy.get('.text-end > .btn-outline-warning').click()
})

it('Login with invalid credentials', () => {
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal(
            'Either your username was not found or your password is incorrect'
        )
    })
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.wait(500)
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click()
    cy.get('#loginEmail').type('ihasifoshaf@stud.noroff.no', {
        delay: 50,
        force: true,
    })
    cy.get('#loginPassword').type('SOJFOSJOHGHSUHDEBYb81726e')
    cy.wait(500)
    cy.get('#loginForm > .modal-footer > .btn-success').click()
})
