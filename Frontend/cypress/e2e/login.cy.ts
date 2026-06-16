describe("Login E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/auth");
  });

  it("should store user data for persistence", () => {
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();

    cy.window().its("localStorage").invoke("getItem", "user").should("not.be.null");
    cy.reload();
    cy.window().its("localStorage").invoke("getItem", "user").should("not.be.null");
  });

  it("should verify the login form works correctly", () => {
    cy.get('[data-cy="login-email"]').type("admin@gmail.com");
    cy.get('[data-cy="login-password"]').type("Admin123*");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/auth");
  });
});
