
Cypress.Commands.add('logtype',()=>{
    cy.visit('/accounting-panel/');
    cy.get('@tgg').then((data)=>{
        cy.get('input[type="text"]').type(data.email);
        cy.get('input[type="password"]').type(data.password);
        cy.get('.join-btn').should('contain.text', 'Sign in').click();
});
});

