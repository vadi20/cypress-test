describe('Infinite scroll', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.visit('https://the-internet.herokuapp.com/infinite_scroll');
  });
  it('should handle scrolling with simulated network lag and disconnection', () => {
    
    cy.log("Begin scrolling to trigger content loading");
    cy.scrollTo('bottom');

    cy.log("Simulate network lag by intercepting requests and adding a delay for 3s");
    cy.intercept('GET', '**/infinite_scroll/**', (req) => {
      req.on('response', (res) => {
        res.setDelay(3000);  
      });
    }).as('loadContent');

    cy.log("wait for content to load and scroll again");
    cy.wait('@loadContent');

    cy.get('.jscroll-added')
      .should('exist')
      .and('be.visible');

    cy.log("Simulate the interrupt the network then reconnect");
    cy.intercept('GET', '**/infinite_scroll/**', { forceNetworkError: true , message:'interrupt'}).as('networkError');
    
    cy.log("Trigger another scroll to hit the network error");
    cy.scrollTo('bottom');
    cy.wait('@networkError');

    cy.log("Verify that the error does not cause the page to crash and shows expected error handling")
    cy.get('body').should('not.contain', 'Network Error');

    cy.log("Re-enable network by stopping forced network error and checking content continues to load")
    cy.intercept('GET', '**/infinite_scroll/**').as('reconnected');

    //cy.intercept('GET', '**/infinite_scroll/**',(req) => {
    //  req.on('response', (res) => {
    //    res.setDelay(5000);  
    //  });
    //}).as('reconnected');

    cy.log("Trigger scroll after reconnecting network");
    cy.scrollTo('bottom');
    cy.wait('@reconnected');

    cy.log("Check that new content has loaded");
    cy.get('.jscroll-added')
      .last()
      .should('be.visible');
  });
})