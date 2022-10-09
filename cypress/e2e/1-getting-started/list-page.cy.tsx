describe("test list", function () {
  it("Тест пустой строки", function () {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="list"]').click();
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
  });

  it("Тест добавление элемента в head", function () {
    cy.clock();
    cy.get("input:first").type("5");
    cy.contains("Добавить в head").click();
    cy.get('[data-testid="cyrcle_head"]')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1000);
    cy.get('[data-testid="cyrcle"]:first').should(
      "have.css",
      "border-color",
      "rgb(127, 224, 81)"
    );
    cy.get('[data-testid="cyrcle"]:first').contains("5");
    cy.get('[data-testid="cyrcle_head"]:first').contains("head");
    cy.tick(1500);
    cy.get('[data-testid="cyrcle"]:first').should(
      "have.css",
      "border-color",
      "rgb(0, 50, 255)"
    );
  });

  it("Тест добавление элемента в tail", function () {
    cy.clock();
    cy.get("input:first").type("7");
    cy.contains("Добавить в tail").click();
    cy.get('[data-testid="cyrcle_head"]')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(500);
    cy.get('[data-testid="cyrcle"]:last').should(
      "have.css",
      "border-color",
      "rgb(127, 224, 81)"
    );
    cy.get('[data-testid="cyrcle"]:last').contains("7");
    cy.get('[data-testid="cyrcle_tail"]:last').contains("tail");
    cy.tick(1500);
    cy.get('[data-testid="cyrcle"]:last').should(
      "have.css",
      "border-color",
      "rgb(0, 50, 255)"
    );
  });

  it("Тест добавление элемента по индексу", function () {
    cy.clock();
    cy.get("input:first").type("8");
    cy.get("input:last").type("1");
    cy.contains("Добавить по индексу").click();
    cy.get('[data-testid="item"]')
      .find('[data-testid="cyrcle_head"]')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get('[data-testid="cyrcle_head"]')
      .find('[data-testid="cyrcle"]')
      .contains("8");
    cy.tick(500);
    cy.get('[data-testid="item"]:first')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get('[data-testid="item"]')
      .eq(1)
      .find('[data-testid="cyrcle_head"]')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1000);
    cy.get('[data-testid="item"]')
      .eq(1)
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(127, 224, 81)");
    cy.get('[data-testid="item"]')
      .eq(1)
      .find('[data-testid="cyrcle"]')
      .contains("8");
    cy.tick(1500);
    cy.get('[data-testid="item"]').within(($lis) => {
      cy.get($lis.eq(0))
        .find('[data-testid="cyrcle"]')
        .should("have.css", "border-color", "rgb(0, 50, 255)");
      cy.get($lis.eq(1))
        .find('[data-testid="cyrcle"]')
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    });
  });

  it("Тест удаление элемента из head", function () {
    cy.clock();
    cy.contains("Удалить из head").click();
    cy.get('[data-testid="cyrcle_tail"]')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get('[data-testid="item"]:first')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="item"]:first')
    .find('[data-testid="cyrcle"]:first')
      .find('p')
      .should('not.text', '5');
    cy.tick(1000);
    cy.get('[data-testid="item"]:first')
    .find('[data-testid="cyrcle"]')
    .find('p')
    .should('text', '8');
    cy.get('[data-testid="item"]:first')
    .find('[data-testid="cyrcle_head"]')
    .contains("head")
  });

  it("Тест удаление элемента из tail", function () {
    cy.clock();
    cy.contains("Удалить из tail").click();
    cy.get('[data-testid="cyrcle_tail"]')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get('[data-testid="item"]:last')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="item"]:last')
    .find('[data-testid="cyrcle"]:first')
      .find('p')
      .should('not.text', '7');
    cy.tick(1000);
    cy.get('[data-testid="item"]:last')
    .find('[data-testid="cyrcle_tail"]')
    .contains("tail")
  });

  it("Тест удаление элемента по индексу", function () {
    cy.clock();
    cy.get("input:last").type("1");
    cy.contains("Удалить по индексу").click();
    cy.tick(1000);
    cy.get('[data-testid="item"]:first')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1000);
    cy.get('[data-testid="item"]').eq(1)
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1500);
    cy.get('[data-testid="item"]').eq(1)
      .find('[data-testid="cyrcle"]:first')
      .find('p')
      .should('not.visible');
      cy.get('[data-testid="item"]').eq(1)
      .find('[data-testid="cyrcle"]:first')
      .should("have.css", "border-color", "rgb(0, 50, 255)");
      cy.get('[data-testid="item"]').eq(1)
      .find('[data-testid="cyrcle_tail"]')
      .find('[data-testid="cyrcle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1000);
    cy.get('[data-testid="item"]').eq(0)
    .find('[data-testid="cyrcle"]')
    .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="item"]').eq(1)
    .find('[data-testid="cyrcle"]:first')
    .find('p')
    .should('be.visible');
  });
});
