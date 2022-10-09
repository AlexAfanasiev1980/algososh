describe("test queue", function () {
  it("Тест пустой строки", function () {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="queue"]').click();
    cy.contains("Добавить").should("be.disabled");
  });
});

describe("test queue", function () {
  before(() => {
    cy.clock();
    cy.visit("http://localhost:3000");
    cy.get('a[href*="queue"]').click();
  });

  it("Тест добавление элемента в очередь", function () {
    cy.get("input").type("5");
    cy.contains("Добавить").click();
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      cy.get($lis.eq(0)).should(
        "have.css",
        "border-color",
        "rgb(210, 82, 225)"
      );
    })
    cy.tick(500);
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis.eq(0)).to.contain("5");
      cy.get($lis.eq(0)).should(
        "have.css",
        "border-color",
        "rgb(0, 50, 255)"
      );
    });
    cy.get("input").type("6");
    cy.contains("Добавить").click();
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      cy.get($lis.eq(1)).should(
        "have.css",
        "border-color",
        "rgb(210, 82, 225)"
      );
    })
    cy.tick(500);
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis.eq(0)).to.contain("5");
      expect($lis.eq(1)).to.contain("6");
      cy.get($lis.eq(1)).should(
        "have.css",
        "border-color",
        "rgb(0, 50, 255)"
      );
    });

    cy.get('[data-testid="item"]').within(($lis) => {
      expect($lis.eq(0)).to.contain("head");
      expect($lis.eq(1)).to.contain("tail");
    });
    
    cy.get("input").type("7");
    cy.contains("Добавить").click();
    cy.tick(500);
  });
});

describe("test queue", function () {
  it("Удаление элемента из очереди", function () {
    cy.clock();
    cy.contains("Удалить").click();
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis.eq(0)).to.contain("5");
      cy.get($lis.eq(0)).should(
        "have.css",
        "border-color",
        "rgb(210, 82, 225)"
      );
    });

    cy.tick(500)
    .then(() => {
      cy.get('[data-testid="cyrcle"]').within(($lis) => {
        expect($lis.eq(0)).to.contain("");
        cy.get($lis.eq(0)).should(
          "have.css",
          "border-color",
          "rgb(0, 50, 255)"
        );
      });
    })

    cy.get('[data-testid="item"]').within(($lis) => {
      expect($lis.eq(1)).to.contain("head");
    });
  });

  it("Очистка очереди", function () {
    cy.clock();
    cy.contains("Очистить").click();
    cy.tick(500)
    cy.get('[data-testid="cyrcle"]').within(($lis) => {
      expect($lis.eq(0)).to.contain("");
      expect($lis.eq(1)).to.contain("");
      expect($lis.eq(2)).to.contain("");
      expect($lis.eq(3)).to.contain("");
      expect($lis.eq(4)).to.contain("");
      expect($lis.eq(5)).to.contain("");
      expect($lis.eq(6)).to.contain("");
    });
    cy.get('[data-testid="item"]').within(($lis) => {
      expect($lis.eq(0)).to.contain("head");
    });
  })
});
