/// <reference types="cypress" />

describe('Sidebar menu exploring', ()=>{
    beforeEach(()=>{
        cy.fixture('tax-go-global-specs.json').as('tgg');
        cy.logtype();
    });
    it('Should test Merchant Account', ()=>{
        cy.get('#sidebar-sm > .w-100 > .fas').click();
        cy.get(':nth-child(13) > .text-dark').click({force:true});
        cy.wait(1000);
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/merchant');
        });
        cy.contains('Merchant Account Management');
        cy.get(':nth-child(4) > .center > [title="View"] > .m-1').click();
        cy.contains('Merchant Account - view');
        cy.wait(2000);
        cy.go('back');
        cy.get(':nth-child(4) > .center > [title="Edit"] > .m-1').click();
        cy.contains('Merchant Account - Edit');
        cy.wait(2000);
        cy.go('back');
        cy.get(':nth-child(4) > .center > [data-original-title="delete"] > .m-1').click();
        cy.get('.sweet-alert').should('be.visible').and('contain.text', 'Do you want to delete the account?');
        cy.get('.sweet-alert').invoke('css', 'height', '478px');
        cy.wait(2000);
        cy.get('.cancel').click();
        cy.get('.lead').should('contain.text', 'Your file is safe :)');
        cy.get('.confirm').click();
        cy.wait(3000);
        cy.get('.sweet-alert').should('not.be.visible');

    });
    it('Should select options', ()=>{
        cy.get('#sidebar-sm > .w-100 > .fas').click();
        cy.get(':nth-child(13) > .text-dark').click({force:true});
        cy.wait(1000);
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/merchant');
        });
        cy.get('#defaultMerchant')
          .select('Ghjknx')
          .invoke('val')
          .should('deep.equal', 'ghj');
        cy.wait(3000);
        cy.get('#defaultMerchant')
          .select('Niall O Connell')
          .invoke('val')
          .should('deep.equal', '254856987');
        cy.get('.btn-danger').click();
        cy.contains('Dashboard');
    });
    it('Should explore req res', ()=>{
            cy.request('GET', 'https://taxgoglobal.com/accounting-panel/merchant')
              .then((response)=>{
                  expect(response).to.have.property('status', 200);
                  expect(response).to.have.property('duration');
                  expect(response.headers).to.have.property('content-type', 'text/html');
              });
    });
    it('Testing add/create new merchant, with braintree option', ()=>{
        cy.get('#sidebar-sm > .w-100 > .fas').click();
        cy.get(':nth-child(13) > .text-dark').click({force:true});
        cy.wait(1000);
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/merchant');
        });
        cy.get('.btn-purple').click();
        cy.wait(2000);
        cy.get('#accType').select('Braintree')
        .invoke('val')
        .should('deep.equal', 'braintree');
        cy.wait(2000);
        cy.get('#accname1').type('Moreno');
        cy.get('#merchantID').type('abc123');
        cy.get('#merchantPrivate').type('efghi');
        cy.get('#merchantPublic').type('publicum');
        cy.get('#type').type('cash');
        cy.wait(4000);
        cy.get('.ng-scope > .btn').click()
    });
    it.only('Testing add/create new merchant with smartpay option', ()=>{
        cy.get('#sidebar-sm > .w-100 > .fas').click();
        cy.get(':nth-child(13) > .text-dark').click({force:true});
        cy.wait(1000);
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/merchant');
        });
        cy.get('.btn-purple').click();
        cy.wait(2000);
        cy.get('#accType').select('Smart Pay')
        .invoke('val')
        .should('deep.equal', 'smartpay');
        cy.wait(2000);
        cy.get('#accname').type('Rubio');
        cy.get('#POSRegisterID').type('Posterior');
        cy.get('#POSBusinessName').type('Anterior');
        cy.get('#POSVendorName').type('Lateral');
        cy.wait(4000);
        cy.get('.ng-scope > .float-right > span').click();
    });
});