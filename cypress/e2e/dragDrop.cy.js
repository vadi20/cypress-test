
describe('Drag and Drop functionality test', () => {

    beforeEach(() => {
      cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
      cy.visit('https://practice.expandtesting.com/drag-and-drop');
    });
  
  
    it('Drag and drop from A to B', () => {
      cy.log("Hover over each image to reveal hidden options")
      cy.get('div.column')
      .then($cols => [...$cols].map(col => col.innerText.trim()))
      .should('deep.eq', ['A', 'B'])
      
      const dataTransfer = new DataTransfer;
      
      cy.get("#column-a")
      .trigger('dragstart', {dataTransfer})
      
      cy.get("#column-b")
      .trigger('dragenter')
      .trigger('dragover', {dataTransfer})
      .trigger('drop', {dataTransfer})
      
      cy.get("#column-a")
      .trigger('dragend')
      
      cy.get('div.column')
      .then($cols => [...$cols].map(col => col.innerText.trim()))
      .should('deep.eq', ['B', 'A'])
      
      cy.get("#column-a").should('have.css', 'opacity', '1')
      cy.get("#column-b").should('have.css', 'opacity', '1')
    });

    it('Drag and drop from B to A', () => {
        cy.log("Hover over each image to reveal hidden options")
        cy.get('div.column')
        .then($cols => [...$cols].map(col => col.innerText.trim()))
        .should('deep.eq', ['A', 'B'])
        
        const dataTransfer = new DataTransfer;
        
        cy.get("#column-b")
        .trigger('dragstart', {dataTransfer})
        
        cy.get("#column-a")
        .trigger('dragenter')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        
        cy.get("#column-b")
        .trigger('dragend')
        
        cy.get('div.column')
        .then($cols => [...$cols].map(col => col.innerText.trim()))
        .should('deep.eq', ['B', 'A'])
        
        cy.get("#column-a").should('have.css', 'opacity', '1')
        cy.get("#column-b").should('have.css', 'opacity', '1')
      });


      it('Drag and drop from B to A and back to A to B', () => {
        cy.log("Hover over each image to reveal hidden options")
        cy.get('div.column')
        .then($cols => [...$cols].map(col => col.innerText.trim()))
        .should('deep.eq', ['A', 'B'])
        
        const dataTransfer = new DataTransfer;
        
        cy.get("#column-b")
        .trigger('dragstart', {dataTransfer})
        
        cy.get("#column-a")
        .trigger('dragenter')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        
        cy.get("#column-b")
        .trigger('dragend')
        
        cy.get('div.column')
        .then($cols => [...$cols].map(col => col.innerText.trim()))
        .should('deep.eq', ['B', 'A'])

        cy.get("#column-b")
        .trigger('dragstart', {dataTransfer})
        
        cy.get("#column-a")
        .trigger('dragenter')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        
        cy.get("#column-b")
        .trigger('dragend')
        
        cy.get('div.column')
        .then($cols => [...$cols].map(col => col.innerText.trim()))
        .should('deep.eq', ['A', 'B'])
        
        cy.get("#column-a").should('have.css', 'opacity', '1')
        cy.get("#column-b").should('have.css', 'opacity', '1')
      });
  
  });