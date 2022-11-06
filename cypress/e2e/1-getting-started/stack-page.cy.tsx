describe("test stack add", function () {
  it("Тест пустой строки", function () {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="stack"]').click();
    cy.contains("Добавить").should("be.disabled");
  });

  it("Тест добавление элемента в стек", function () {
    cy.get("input").type("5");
    cy.contains("Добавить").click();
    cy.clock();
    cy.tick(500);
    cy.get('[data-testid="cyrcle"]:last').contains("5");
    cy.get('[data-testid="cyrcle"]:last').should(
      "have.css",
      "border-color",
      "rgb(210, 82, 225)"
    );
    cy.tick(500);
    cy.get('[data-testid="cyrcle"]:last').should(
      "have.css",
      "border-color",
      "rgb(0, 50, 255)"
    );
    cy.get("input").type("7");
    cy.contains("Добавить").click();
    cy.tick(500);
    cy.get("input").type("8");
    cy.contains("Добавить").click();
    cy.tick(500);
    cy.get("input").type("9");
    cy.contains("Добавить").click();
  });
});

describe("test stack delete", function () {
  before(() => {
    cy.clock();
  });

  it("Тест удаление элемента из стека", function () {
    cy.contains("Удалить").click();
    cy.get('[data-testid="cyrcle"]:last').should(
      "have.css",
      "border-color",
      "rgb(210, 82, 225)"
    );
    cy.tick(1000);
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis).to.have.length(3);
    });
  });
});


describe("test stack clear", function () {
  it("Тест очистка стека", function () {
    cy.contains("Очистить").click();
    cy.get('[data-testid="cyrcle"]:last').should('length', '0')
  });
});