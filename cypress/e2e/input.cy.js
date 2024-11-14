Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Inputs Validation', () => {  
    beforeEach(() => {
      cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
      cy.visit('https://practice.expandtesting.com/inputs');
    });

  
    it('Check the date input', () => {
  
      cy.log("Upload a exe file using file upload option");
     // cy.get('#input-date')
      //.invoke('attr', 'value', '01/12/2022').trigger('change');

      cy.get('input[name="input-date"]').type('2022-09-02')
      cy.get('input[name="input-date"]').trigger('input')
      cy.log("Validate the proper error message is displayed");
      
    });

    it('should type text into the text input', () => {
        cy.get('input[type="text"]').type('Sample Text').should('have.value', 'Sample Text');
      });
    
      it('should type a number into the number input', () => {
        cy.get('input[type="number"]').type('42').should('have.value', '42');
      });
    
      it('should select a date', () => {
        const date = '2024-12-25';
        cy.get('input[type="date"]').type(date).should('have.value', date);
      });
    
      it('should check a checkbox', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked');
      });
    
      it('should select an option from a dropdown', () => {
        cy.get('select').select('Option 2').should('have.value', 'option2');
      });
    
      it('should click the submit button and verify response', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.success-message').should('contain', 'Form submitted successfully');
      });
    

  });