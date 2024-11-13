Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('File Upload Validation', () => {
    const unsupportedFilePath = 'cypress/fixtures/unsupported-file.exe';
    const validFilePath = 'cypress/fixtures/package.txt';
  
    beforeEach(() => {
      cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
      cy.visit('https://practice.expandtesting.com/upload');
    });
  
    it('Test scenario to chect if input exists ', () => {
      cy.log("Check if input feilds exists");
      cy.get('#fileInput').should('exist');
      cy.get('#fileSubmit').should('exist');
    });
  
    it('should display an error for file size more than 500k', () => {
  
      cy.log("Upload a exe file using file upload option");
      cy.get('#fileInput')
        .selectFile(unsupportedFilePath)
        .get('#fileSubmit')
        .click()
      
      cy.log("Validate the proper error message is displayed");
      cy.get('#flash')//.invoke('text')
        .find('b')
        .should("have.text", "File too large, please select a file less than 500KB")
    });

    it('File upload should be successful', () => {
  
        cy.log("Upload a exe file using file upload option");
        cy.get('#fileInput')
          .selectFile(validFilePath)
          .get('#fileSubmit')
          .click()
        
        cy.log("Validate the proper message is displayed");
        cy.get('h1')//.invoke('text')
        .should("have.text", "File Uploaded!")
    });

    it('Validate to check if filename is shown in text', () => {
  
        cy.log("Upload a exe file using file upload option");
        cy.get('#fileInput')
          .selectFile(validFilePath)
          
        cy.log("Validate the proper message is displayed");

        
        cy.get('#fileInput').invoke('val')
        .then((val) => {
            expect(val).to.eq('C:\\fakepath\\package.txt')
        })
    });

    it('Validate error message if file is not provided', () => {
  
        cy.log("Upload a exe file using file upload option");
        
        cy.get('#fileSubmit')
        .click()
        
        cy.log("Validate the proper message is displayed");
        cy.get('#fileInput').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please select a file.')
        })
    });

  });