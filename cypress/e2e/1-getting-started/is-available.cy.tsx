describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="recursion"]').click();
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="fibonacci"]').click();
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="sorting"]').click();
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="stack"]').click();
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="queue"]').click();
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="list"]').click();
    cy.get('a[href*="/"]').click();
  });
}); 

