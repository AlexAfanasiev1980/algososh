describe('test string', function() {
  it('Тест пустой строки', function() {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="recursion"]').click();
    cy.contains('Развернуть').should('be.disabled')
  })

  it('Тест на разворот', function() {
    cy.get('input').type('Привет');
    cy.contains('Развернуть').click();
    cy.clock();
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis).to.have.length(6)
      expect($lis.eq(0)).to.contain('П')
      cy.get($lis.eq(0), {timeout: 300}).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($lis.eq(1)).to.contain('р')
      cy.get($lis.eq(1), {timeout: 300}).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($lis.eq(2)).to.contain('и')
      cy.get($lis.eq(2), {timeout: 300}).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($lis.eq(3)).to.contain('в')
      cy.get($lis.eq(3), {timeout: 300}).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($lis.eq(4)).to.contain('е')
      cy.get($lis.eq(4), {timeout: 300}).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($lis.eq(5)).to.contain('т')
      cy.get($lis.eq(5), {timeout: 300}).should('have.css', 'border-color', 'rgb(210, 82, 225)');
    })

cy.tick(1000);

    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis).to.have.length(6)
      expect($lis.eq(0)).to.contain('т')
      cy.get($lis.eq(0), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(1)).to.contain('р')
      cy.get($lis.eq(1), {timeout: 300}).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($lis.eq(2)).to.contain('и')
      cy.get($lis.eq(2), {timeout: 300}).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($lis.eq(3)).to.contain('в')
      cy.get($lis.eq(3), {timeout: 300}).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($lis.eq(4)).to.contain('е')
      cy.get($lis.eq(4), {timeout: 300}).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($lis.eq(5)).to.contain('П')
      cy.get($lis.eq(5), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    })

    cy.tick(1000);

    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis).to.have.length(6)
      expect($lis.eq(0)).to.contain('т')
      cy.get($lis.eq(0), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(1)).to.contain('е')
      cy.get($lis.eq(1), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(2)).to.contain('и')
      cy.get($lis.eq(2), {timeout: 300}).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($lis.eq(3)).to.contain('в')
      cy.get($lis.eq(3), {timeout: 300}).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($lis.eq(4)).to.contain('р')
      cy.get($lis.eq(4), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(5)).to.contain('П')
      cy.get($lis.eq(5), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    })

    cy.tick(1000);

    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis).to.have.length(6)
      expect($lis.eq(0)).to.contain('т')
      cy.get($lis.eq(0), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(1)).to.contain('е')
      cy.get($lis.eq(1), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(2)).to.contain('в')
      cy.get($lis.eq(2), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(3)).to.contain('и')
      cy.get($lis.eq(3), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(4)).to.contain('р')
      cy.get($lis.eq(4), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($lis.eq(5)).to.contain('П')
      cy.get($lis.eq(5), {timeout: 300}).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    })

    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  

})