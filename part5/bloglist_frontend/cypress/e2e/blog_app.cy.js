describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "mauro",
      username: "mauro",
      password: "mauro",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    const user2 = {
      name: "mauro2",
      username: "mauro2",
      password: "mauro2",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mauro");
      cy.get("#password").type("mauro");
      cy.get("#login-button").click();

      cy.contains("mauro logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mauro");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Error: invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "mauro logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mauro", password: "mauro" });
    });

    it("a new blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("titelvanblog");
      cy.get("#author").type("auteurvanblog");
      cy.get("#url").type("urlvanblog");
      cy.get("#submit-button").click();
      cy.contains("titelvanblog");
    });

    describe("And several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "titel1",
          author: "anderauteurvanblog",
          url: "anderurlvanblog",
        });
        cy.createBlog({
          title: "titel2",
          author: "ander2auteurvanblog",
          url: "ander2urlvanblog",
        });
        cy.createBlog({
          title: "titel3",
          author: "ander3auteurvanblog",
          url: "ander3urlvanblog",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("titel1 anderauteurvanblog").contains("view").click();

        cy.contains("likes").contains("like").click();

        cy.contains("likes").contains("1");
      });

      it("a blog can be deleted", function () {
        cy.contains("titel1 anderauteurvanblog").contains("view").click();

        cy.contains("remove").click();

        cy.get("html").should("not.contain", "titel1 anderauteurvanblog");
      });

      it("delete button only for author visible", function () {
        cy.login({ username: "mauro2", password: "mauro2" });

        cy.contains("titel1").parent().as("blog1");
        cy.get("@blog1").contains("view").click();
        cy.get("@blog1").should("not.contain", "remove");
      });

      it("the blogs are ordered according to likes descending", function () {
        cy.contains("titel1").parent().as("blog1");
        cy.contains("titel2").parent().as("blog2");
        cy.contains("titel3").parent().as("blog3");

        cy.get("@blog1").contains("view").click();
        cy.get("@blog2").contains("view").click();
        cy.get("@blog3").contains("view").click();

        cy.get("@blog1").contains("like").as("like1");
        cy.get("@blog2").contains("like").as("like2");
        cy.get("@blog3").contains("like").as("like3");

        cy.get("@like1").click();
        cy.wait(500);
        cy.get("@like1").click();
        cy.wait(500);
        cy.get("@like1").click();
        cy.wait(500);
        cy.get("@like1").click();
        cy.wait(500);
        cy.get("@blog1").contains("hide").click();
        cy.wait(500);

        cy.get("@like2").click();
        cy.wait(500);
        cy.get("@like2").click();
        cy.wait(500);
        cy.get("@blog2").contains("hide").click();
        cy.wait(500);

        cy.get("@like3").click();
        cy.wait(500);
        cy.get("@like3").click();
        cy.wait(500);
        cy.get("@like3").click();
        cy.wait(500);
        cy.get("@blog3").contains("hide").click();
        cy.wait(500);

        cy.get(".blog").eq(0).contains("likes 4");
        cy.get(".blog").eq(1).contains("likes 3");
        cy.get(".blog").eq(2).contains("likes 2");
      });
    });
  });
});
