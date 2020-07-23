/// <reference types="cypress" />

describe('Tax go global testing', ()=>{
    beforeEach(()=>{
        cy.visit('/');
        cy.fixture('user.json').as('tgg')
    });
    it('Should begin with main plane', ()=>{
        cy.contains('h5', 'PRODUCT/SERVICES');
        cy.get('.no-margin-bottom').eq(1).should('contain','SALES');
        cy.get('.no-margin-bottom').eq(3).should('contain.text', 'QUICK ENTRIES');
    });
    it.skip('Should verify the href, do not click', ()=>{
        cy.get('.btn-warning')
          .should('have.prop', 'href')
          .and('equal','https://taxgoglobal.com/taxgoregistration');
        cy.get('.btn-warning').eq(7).should('not.be.visible');
        cy.get('.btn-warning').eq(7).invoke('removeAttr', 'target').click({force:true});
    });
    it('requires email', ()=>{
        cy.visit('/accounting-panel/');
        cy.get('.join-btn').click();
        cy.get('#loader')
          .invoke('css', 'display','none');
        cy.get('.toast-message').should('contain', 'Enter email address');
    });
    it('require password', ()=>{
        cy.visit('/accounting-panel/');
        cy.get('input[type="text"]').type('test@gmail.com');
        cy.get('.join-btn').click();
        cy.get('#loader2').should('not.be.visible');
        cy.get('.toast-message').should('contain', 'Enter password');
        cy.get('.col-lg-6 > :nth-child(3) > .d-flex').should('contain','New to Tax GO');
    });
    it('Should require valid email and password; explore accounting-panel', ()=>{
        cy.visit('/accounting-panel/');
        cy.get('@tgg').then((data)=>{
            cy.get('input[type="text"]').type(data.email);
            cy.get('input[type="password"]').type(data.password);
            cy.get('.join-btn').click();
        cy.location().should((loc)=>{
            expect(loc.hash).to.be.empty;
            expect(loc.protocol).to.eq('https:');
            expect(loc.pathname).to.eq('/accounting-panel/dashboard');
        });
      });
    });
    it('Should test dashboard', ()=>{
        cy.logtype();
        cy.get(':nth-child(2) > .bg-white > .card-data > .justify-content-between > .btn').click();
        cy.location().should((loc)=>{
           expect(loc.pathname).to.eq('/accounting-panel/purchasemanagement');
        });
        cy.get('.tr_col > :nth-child(3)').should('contain','Invoice No');
        cy.get('.tr_col > :nth-child(5)').should('contain', 'Supplier');
        cy.get('#datatable-responsive th').last().should('contain','Action');
        cy.get('input[type="checkbox"]').first().check().should('be.checked');
        cy.get(':nth-child(4) > th > #check2').check().should('be.checked');
        cy.get(':nth-child(4) > th > #check2').uncheck().should('not.be.checked');
        cy.get(':nth-child(9) > :nth-child(9) > .btn-rounded > a').click();
        cy.contains('h5', 'Invoice: PI-19');
        cy.get('.mb-1 > :nth-child(2) > .form-control').select('Record Payment')
        cy.get('.mb-1 > :nth-child(2) > .form-control').should('contain','Record Payment');     
    });
    it('Iterate through an array like structure, arrays / objects with a length property', ()=>{
        cy.logtype();
        cy.get('.list-unstyled > li').should('have.length', 25);
        cy.get('.list-unstyled > li').last().should('have.length.gte',1);
        cy.get(':nth-child(11) > .pl-2').should('contain.text', 'Ledger Accounts ').click();
        cy.get('#derp6 > :nth-child(1) > .list-group-item-info').should('be.visible');
        cy.get('#derp6 > :nth-child(2) > .list-group-item-info').should('be.visible')
          .and('contain', 'Default Ledgers');
        cy.get(':nth-child(11) > .pl-2').click();
        cy.get('#derp6 > :nth-child(1) > .list-group-item-info').should('not.be.visible');
    });
    it('Should logout work and clear values', ()=>{
        cy.logtype();
        cy.get('.fa-sign-out-alt').click();
        cy.location().should((loc)=>{
            expect(loc.hash).to.be.empty;
            expect(loc.protocol).to.eq('https:');
            expect(loc.pathname).to.eq('/accounting-panel/');
            });
    cy.get('input[type="text"]').type('Clear this email')
      .should('have.value','Clear this email')
      .clear()
      .should('have.value', '');
    });
});