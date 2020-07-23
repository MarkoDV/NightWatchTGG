/// <reference types="cypress" />

describe('Tax go global testing', ()=>{
    beforeEach(()=>{
        cy.fixture('tax-go-global-specs.json').as('tgg');
        cy.logtype();
    });
    it('Testing TAX SERVICES BUTTON', ()=>{
        cy.get('.d-lg-flex > .btn').click();
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/taxservice');
        });
        cy.contains('Tax Services');
    });
    it('Testing dashboard buttons', ()=>{
        cy.get(':nth-child(1) > .bg-white > .card-data > .justify-content-between > .btn').click();
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/salesmanagement?pagetype=sales');
        });
        cy.get('#search').invoke('attr','placeholder').should('contain', 'Type to search');
        cy.get('#search').type('Anything');
        cy.go('back');
        cy.get(':nth-child(2) > .bg-white > .card-data > .justify-content-between > .btn').click();
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/purchasemanagement?pagetype=purchase');
        });
        cy.go(-1);
        cy.get(':nth-child(3) > .bg-white > .card-data > .justify-content-between > .btn').click();
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/banking');
        });
        cy.go('back');
    });
    it('Should test other buttons', ()=>{
        cy.get('.switch-handle').click();
        cy.get('.col-xl-8 > .card > .card-footer > .text-primary').click();
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/salesmanagement?pagetype=purchase');
        });
        cy.go('back');
    });
    it('Should test other buttons II', ()=>{
        cy.get(':nth-child(2) > .z-depth-0 > .card-footer > .text-primary').click({force:true});
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/customer');
        });
        cy.go('back');
    });
    it('Should test other buttons III', ()=>{
        cy.get(':nth-child(3) > .z-depth-0 > .card-footer > .text-primary').click({force:true});
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/supplier');
        });
        cy.go('back');
    });
    it('Testing cypress handles modal', ()=>{
        cy.get('[ng-click="addNewContact(true)"] > .fas').click({force:true});
        cy.get('.modal').should('be.visible');
        cy.wait(2000);
        cy.get('.form-group > .btn').click();

    });
    it('Should explore dashboard with different viewports', ()=>{
        cy.viewport('macbook-15');
        cy.wait(1000);
        cy.viewport('macbook-13');
        cy.wait(1000);
        cy.viewport('macbook-11');
        cy.wait(1000);
        cy.viewport('ipad-2');
        cy.wait(1000);
        cy.viewport('ipad-mini');
        cy.wait(1000);
        cy.viewport('iphone-6');    
    });
    it.only('Testing menu and retail users', ()=>{
        cy.get('#sidebar-sm > .w-100 > .fas').click();
        cy.get(':nth-child(14) > .text-dark').click({force:true});
        cy.wait(1000);
        cy.location().should((loc)=>{
            expect(loc.href).to.equal('https://taxgoglobal.com/accounting-panel/employees');
        });
        cy.contains('Retail Xpress User Management');
        cy.get('#search').invoke('attr','placeholder').should('contain', 'Type to search');
        cy.get('#search').type('I am new User');
        cy.get('.col-md-12 > .btn').click();
        cy.get('#userfname').type('Kokot');
        cy.get('#userlname').type('Kokotovic');
        cy.get('#dob').type('1992-04-03');
        cy.get('#useremail').type('buba@gmail.com');
        cy.get('#userphone').type('0638171366');
        cy.get('#dentificationid').type('123123456456');
        cy.get('#userid').invoke('attr', 'ng-model').should('contain', 'emp.userid');
        cy.wait(2000);
        cy.get('#status').select('Suspend');
        cy.get('#status').should('contain', 'Suspend');
        cy.get('#retail_status').uncheck();
        cy.get('#payroll_status').uncheck();
        cy.get('#newRetailUser > .btn-danger > .fa').click();
        cy.get('#search').type('I am new User').clear();
        cy.get('#search').type('New new user');

    });
});