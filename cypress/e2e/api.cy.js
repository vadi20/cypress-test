describe('POST /posts - Boundary and Invalid Data Handling', () => {

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
    it('should return an error for excessively long titles', () => {
      cy.log('Send a POST request with an excessively long title');
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
          title: 'a'.repeat(10001),
          body: 'This is a sample body content.',
          userId: 1
        },
        failOnStatusCode: false
      }).then((response) => {
        cy.log('Verify the response code and error message for long title');
        expect(response.status).to.be.oneOf([400, 422]); 
        expect(response.body).to.have.property('error');
      });
    });
  
    it('should return an error for unsupported special characters in title', () => {
      cy.log('Send a POST request with unsupported special characters in the title');
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
          title: '<>!@#$%^&*()_+{}|:>?/',
          body: 'This is a sample body content.',
          userId: 1
        },
        failOnStatusCode: false
      }).then((response) => {
        cy.log('Verify the response code and error message for unsupported characters');
        expect(response.status).to.be.oneOf([400, 422]); 
        expect(response.body).to.have.property('error');
      });
    });
  
    it('should return an error for missing userId field', () => {
      cy.log('Send a POST request without the userId field');
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
          title: 'Sample Title',
          body: 'This is a sample body content.'
        },
        failOnStatusCode: false
      }).then((response) => {
       cy.log('Verify the response code and error message for missing userId');
        expect(response.status).to.be.oneOf([400, 422]); 
        expect(response.body).to.have.property('error');
      });
    });
  
    it('should return an error for excessively long titles', () => {
        cy.log('Send a POST request with an title');
        cy.request({
          method: 'POST',
          url: apiUrl,
          body: {
            title: 'My test title',
            body: 'This is a sample body content.',
            userId: 1
          },
          failOnStatusCode: false
        }).then((response) => {
          cy.log('Verify the response code and error message for long title');
          expect(response.status).to.be.oneOf([201, 200]); 
        });
      });
  });
  