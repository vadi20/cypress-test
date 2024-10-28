import "cypress-real-events";

describe('Hover Functionality and Hidden Element Detection', () => {

  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.visit('https://the-internet.herokuapp.com/hovers');
  });


  it('should reveal hidden options on hover and make them inaccessible otherwise', () => {
    cy.log("Hover over each image to reveal hidden options")
    cy.get('.figure').each(($figure, index) => {
      cy.log("Check the hover text is not visible")
      cy.wrap($figure).find('.figcaption').should('not.be.visible');
      cy.log("Hover over the element")
      cy.get(`:nth-child(${index+3}) > img`).realHover();
      //cy.get('.figcaption').eq(index).invoke('show')

      cy.log("Check the hover text is  visible")
      cy.wrap($figure).find('.figcaption').should('be.visible').and('contain', `name: user${index+1}`);
    });
  });

});
