describe('Validate Form Input Edge Case with Special Characters and SQL Injection Attempt', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  it('Test scenario to chect if input exists ', () => {
    cy.log("Check if the input feilds exists");
    cy.get('#username').should('exist');
    cy.get('#password').should('exist');
    cy.get('button[type="submit"]').should('exist');
  })


  it('Test scenario to handle special characters for usename', () => {
    cy.log("Input special characters into password field");
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('<>@!#$%^&*()_+{}|:>?/');

    cy.log("Submit the form");
    cy.get('button[type="submit"]').click();

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'Your password is invalid!');

    cy.log("Ensure the URL doesn't change to indicate no login occurred");
    cy.url().should('include', '/login');
  })

  it('Test scenario to handle special characters for password ', () => {
    cy.log("Input special characters into username field");
    cy.get('#username').type('<>@!#$%^&*()_+{}|:>?/');
    cy.get('#password').type('SuperSecretPassword!');
    
    cy.log("Submit the form");
    cy.get('button[type="submit"]').click();

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'Your username is invalid!');

    cy.log("Ensure the URL doesn't change to indicate no login occurred");
    cy.url().should('include', '/login');
  })

  it('Test scenario to handle special characters for password with enter key', () => {
    cy.log("Input special characters into username field");
    cy.get('#username').type('<>@!#$%^&*()_+{}|:>?/');
    cy.get('#password').type('SuperSecretPassword!{enter}');
    
    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'Your username is invalid!');

    cy.log("Ensure the URL doesn't change to indicate no login occurred");
    cy.url().should('include', '/login');
  })

  it('Test scenario to handle special characters for usename and password ', () => {
    cy.log("Input special characters into username and password fields");
    cy.get('#username').type('<>@!#$%^&*()_+{}|:>?/');
    cy.get('#password').type('<>@!#$%^&*()_+{}|:>?/');
    
    cy.log("Submit the form");
    cy.get('button[type="submit"]').click();

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'Your username is invalid!');

    cy.log("Ensure the URL doesn't change to indicate no login occurred");
    cy.url().should('include', '/login');
  })
  it('should handle SQL injection attempts safely in username fields', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type("' OR '1'='1'");
    
    cy.log("Submit the form");
    cy.get('button[type="submit"]').click();

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'Your password is invalid!');
    
    cy.log("Ensure the URL doesn't change to indicate no login occurred");
    cy.url().should('include', '/login');
  })
  it('should handle SQL injection attempts safely in password fields', () => {
    cy.get('#username').type("' OR '1'='1'");
    cy.get('#password').type('SuperSecretPassword!');
    
    cy.log("Submit the form");
    cy.get('button[type="submit"]').click();

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'Your username is invalid!');
    
    cy.log("Ensure the URL doesn't change to indicate no login occurred");
    cy.url().should('include', '/login');
  })
  it('should handle SQL injection attempts safely in username and password fields', () => {
    cy.get('#username').type("' OR '1'='1'");
    cy.get('#password').type("' OR '1'='1'");
    
    cy.log("Submit the form");
    cy.get('button[type="submit"]').click();

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'Your username is invalid!');
    
    cy.log("Ensure the URL doesn't change to indicate no login occurred");
    cy.url().should('include', '/login');
  })

  it('Test scenario to handle valid login', () => {
    cy.log("Input special characters into password field");
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');

    cy.log("Submit the form");
    cy.get('button[type="submit"]').click();

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'You logged into a secure area!');

    cy.log("Ensure the URL does change to indicate  login occurred");
    cy.url().should('include', '/secure');
  })

  it('Test scenario to handle valid login Enter key with ', () => {
    cy.log("Input special characters into password field");
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!{enter}');

    cy.log("Verify that an error message is displayed");
    cy.get('#flash')
      .should('be.visible')
      .and('contain', 'You logged into a secure area!');

    cy.log("Ensure the URL does change to indicate  login occurred");
    cy.url().should('include', '/secure');
  })

})
