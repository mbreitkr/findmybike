import { BIKE_INDEX_V3_API_BASE_URL } from "../../src/app/core/constants/api.config";

describe("Complete bike search to details workflow", () => {
  it("should complete full workflow from search to details and back to search", () => {
    cy.fixture("bikes/search-to-details-workflow").then((workflows) => {
      // Setup
      const workflow = workflows.amsterdam_happy_path_scenario;
      cy.intercept(
        "GET",
        `${BIKE_INDEX_V3_API_BASE_URL}/search**`,
        workflow.searchResults,
      ).as("searchResults");
      cy.intercept(
        "GET",
        `${BIKE_INDEX_V3_API_BASE_URL}/search/count**`,
        workflow.searchCount,
      ).as("searchResultsCount");
      cy.intercept(
        "GET",
        `${BIKE_INDEX_V3_API_BASE_URL}/bikes/${workflow.bikeDetails.bike.id}**`,
        workflow.bikeDetails,
      ).as("bikeDetails");
      cy.visit("/");

      // Search page tests
      cy.get("[data-testid='bike-search-city-input']").should("be.visible");
      cy.get("[data-testid='bike-search-city-input']").type(`Amsterdam{enter}`);
      cy.wait(["@searchResults", "@searchResultsCount"]);

      cy.get("[data-testid='bike-search-results']").should("be.visible");
      cy.get("[data-testid='bike-search-result-card']").should(
        "have.lengthOf",
        workflow.searchResults.bikes.length,
      );

      // Navigate to details page
      cy.get("[data-testid='bike-search-result-details-link']").first().click();
      cy.url().should("include", `/details/${workflow.bikeDetails.bike.id}`);
      cy.wait("@bikeDetails");

      // Details page tests
      cy.get("[data-testid='bike-details']").should("be.visible");
      cy.get("[data-testid='bike-details-title']").should(
        "contain",
        workflow.bikeDetails.bike.title,
      );
      if (workflow.bikeDetails.bike.large_img) {
        cy.get("[data-testid='bike-details-image']").should("be.visible");
      } else {
        cy.get("[data-testid='bike-details-image']")
          .should("have.attr", "src")
          .and("include", "placeholder");
      }

      // Test navigation back to search results
      cy.get('[data-testid="back-button-link"]').click();
      cy.url().should("include", "/search?city=Amsterdam&page=1");
      cy.get('[data-testid="bike-search-city-input"]').should("be.visible");
    });
  });
  it("should handle search with no results gracefully", () => {
    cy.fixture("bikes/search-to-details-workflow").then((workflows) => {
      const workflow = workflows.no_results_scenario;

      cy.intercept(
        "GET",
        `${BIKE_INDEX_V3_API_BASE_URL}/search**`,
        workflow.searchResults,
      ).as("searchResults");
      cy.intercept(
        "GET",
        `${BIKE_INDEX_V3_API_BASE_URL}/search/count**`,
        workflow.searchCount,
      ).as("searchResultsCount");

      cy.visit("/search");

      // Non-existent city search tests
      cy.get("[data-testid='bike-search-city-input']").should("be.visible");
      cy.get("[data-testid='bike-search-city-input']").type(
        `wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww{enter}`,
      );
      cy.wait(["@searchResults", "@searchResultsCount"]);

      cy.get('[data-testid="bike-search-no-results-message"]').should(
        "be.visible",
      );
      cy.get('[data-testid="bike-search-results"]').should("not.exist");
    });
  });

  it("should handle API errors gracefully", () => {
    cy.fixture("bikes/search-to-details-workflow").then((workflows) => {
      const workflow = workflows.api_error_scenario;

      cy.intercept(
        "GET",
        `${BIKE_INDEX_V3_API_BASE_URL}/search**`,
        workflow.searchError,
      ).as("searchResultsError");
      cy.intercept(
        "GET",
        `${BIKE_INDEX_V3_API_BASE_URL}/search/count**`,
        workflow.searchCount,
      ).as("searchResultsCount");

      cy.visit("/search");

      // API error tests
      cy.get("[data-testid='bike-search-city-input']").should("be.visible");
      cy.get("[data-testid='bike-search-city-input']").type(`Amsterdam{enter}`);
      cy.wait(["@searchResultsError", "@searchResultsCount"]);

      cy.get('[data-testid="bike-search-results-error"]').should("be.visible");
      cy.get('[data-testid="bike-search-results"]').should("not.exist");
    });
  });
});
