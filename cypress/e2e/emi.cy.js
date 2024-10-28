Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Personal Loan Calculator Functionality', () => {

    beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
 
      cy.log("Launch the application URL");
      cy.visit('https://emicalculator.net/');
    });
  
    it('should calculate personal loan EMI with given inputs and verify chart details', () => {
      cy.log('Go to the "Personal Loan" tab');
      cy.get('#personal-loan').click();
  
      cy.log('Move "Personal Loan Amount" slider to 10L (1,000,000)');
      cy.get('#loanamountslider .ui-slider-handle').invoke('attr', 'style', 'left: 33.34%;').trigger("mousedown", { which: 1 , force: true}); 
      cy.wait(500);
      cy.get('#loanamount').should('have.value', '10,00,000'); 

  
      cy.log('Move "Interest Rate" slider to 12%');
      cy.get('#loaninterestslider .ui-slider-handle').invoke('attr', 'style', 'left: 35%;').trigger("mousedown", { which: 1, force: true }); 
      cy.wait(500);
  
      cy.log(' Move "Loan Tenure" slider to 5 years');
      cy.get('#loantermslider .ui-slider-handle').invoke('attr', 'style', 'left: 100%;').trigger("mousedown", { which: 1, force: true }); 
      cy.wait(500);
  
      cy.log(' Step 4: Change the Month from "Schedule showing EMI payments starting from" calendar widget');
      cy.get('#startmonthyear').click(); 
      cy.get('.datepicker-months tbody tr td').contains('Nov').click(); 
  
      cy.log('Step 5: Check availability of the bar chart');
      cy.get('#emibarchart')
        .should('be.visible')
        .within(() => {
            cy.log(' Step 6: Count number of bars available in the chart');
            cy.get('.highcharts-series rect') 
            .should('have.length.greaterThan', 0)
            .then(($bars) => {
              const barCount = $bars.length;
              cy.log('Number of bars:', barCount); 
            });
  
            cy.log(' Step 7: Read the values from any one bar tooltip');
            cy.get('.highcharts-series rect').first().trigger('mouseover');
  
            cy.log(' Verify tooltip appears and capture its value');
            cy.get('.highcharts-tooltip')
            .should('be.visible')
            .invoke('text')
            .then((tooltipText) => {
              cy.log('Tooltip value:', tooltipText);
            });
        });
    });
  });
  