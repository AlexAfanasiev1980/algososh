describe("test fibonacci", function () {
  it("Тест пустой строки", function () {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="fibonacci"]').click();
    cy.contains("Рассчитать").should("be.disabled");
  });
});

describe("test fibonacci 2", function () {
  before(() => {
    cy.clock();
    cy.visit("http://localhost:3000");
    cy.get('a[href*="fibonacci"]').click();
  });

  it("Тест на корректность чисел", function () {
    cy.get("input").type("8");
    cy.contains("Рассчитать").click();
    cy.tick(20000);
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis).to.have.length(9)
      expect($lis.eq(0)).to.contain('1')
      expect($lis.eq(1)).to.contain('1')
      expect($lis.eq(2)).to.contain('2')
      expect($lis.eq(3)).to.contain('3')
      expect($lis.eq(4)).to.contain('5')
      expect($lis.eq(5)).to.contain('8')
      expect($lis.eq(6)).to.contain('13')
      expect($lis.eq(7)).to.contain('21')
      expect($lis.eq(8)).to.contain('34')
    });
  });
});
