describe("Footer E2E Tests", () => {
  it("should not render the footer on the login/register page", () => {
    cy.visit("/auth");
    cy.get("footer").should("not.exist");
  });

  it("should display the footer correctly on different screen sizes", () => {
    cy.visit("/welcome");

    cy.viewport(1280, 800);
    cy.get("footer").should("be.visible");

    cy.viewport("iphone-6");
    cy.get("footer").should("be.visible");
  });
});
