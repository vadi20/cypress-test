describe('File Upload Validation', () => {
  const unsupportedFilePath = 'cypress/fixtures/unsupported-file.exe';
  const largeFilePath = 'cypress/fixtures/large-file-10mb.txt';

  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.visit('https://the-internet.herokuapp.com/upload');
  });

  it('Test scenario to chect if input exists ', () => {
    cy.log("Check if input feilds exists");
    cy.get('#file-upload').should('exist');
    cy.get('#drag-drop-upload').should('exist');
    cy.get('#file-submit').should('exist');
  })


  it('should display an error for unsupported file type (.exe) for manual upload', () => {

    cy.log("Upload a exe file using file upload option");
    cy.get('#file-upload')
      .selectFile(unsupportedFilePath)
      .get('#file-submit')
      .click()
    
    cy.log("Validate the proper error message is displayed");
    cy.get('h3').invoke('text')
    .then((text) => {
      expect(text).to.be.oneOf(['File type not supported','Invalid file type'])
    })
    //.should('have.any.text',('File Uploaded!','Invalid file type'))
  });

  it('should display an error for unsupported file type (.exe) for drag and drop', () => {

    cy.log("Upload a exe file using file drag-drop option");
    cy.get('#drag-drop-upload')
    .selectFile(unsupportedFilePath, { action: 'drag-drop' })
    .get('#file-submit')
    .click();

    cy.log("Validate the proper error message is displayed");
    cy.get('h3').invoke('text')
    .then((text) => {
      expect(text).to.be.oneOf(['File type not supported','Invalid file type'])
    })
  });

  it('should display an error for large file size (10MB) for manual upload', () => {
    cy.log("Upload a large file using file upload option");
    cy.get('#file-upload')
      .selectFile(largeFilePath)
      .get('#file-submit')
      .click()

    cy.log("Validate the proper error message is displayed");
    cy.get('h3').invoke('text')
    .then((text) => {
      expect(text).to.be.oneOf(['File size too large','File exceeds maximum size of 10MB'])
    })
  });

  it('should display an error for large file size (10MB) for drag-drop', () => {

    cy.log("Upload a large file using file drag-drop option");
    cy.get('#drag-drop-upload').selectFile(largeFilePath, { action: 'drag-drop' });
    cy.get('#file-submit').click();

    cy.log("Validate the proper error message is displayed");
    cy.get('h3').invoke('text')
    .then((text) => {
      expect(text).to.be.oneOf(['File size too large','File exceeds maximum size of 10MB'])
    })
  });
});