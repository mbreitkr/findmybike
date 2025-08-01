import { HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of, throwError } from "rxjs";

import { BikesApiService } from "./bikes-api.service";
import { BikeSearchService } from "./bike-search.service";

import {
  mockBikeSummaries_amsterdam_all_p1,
  mockBikeSummaries_amsterdam_all_p2,
  mockBikeSummaries_edmonton_red_p1,
  mockBikeSummaries_edmonton_red_p2,
  mockBikeSummaries_nonexistentcitystring_all_p1,
} from "../testing/mocks/bike-search-results.mock";
import { BIKE_SEARCH_RESULTS_PER_PAGE } from "../../../core/constants/api.config";
import {
  mockBikeResultsCount_amsterdam_all,
  mockBikeResultsCount_edmonton_red,
  mockBikeResultsCount_nonexistentcitystring_all,
} from "../testing/mocks/bike-results-count.mock";
import { BikeSummary } from "../interfaces/bike.model";
import { mockBikesApiError_search_get_404 } from "../testing/mocks/bike-api-errors.mock";

describe("BikeSearchService", () => {
  let bikeSearchService: BikeSearchService;
  let bikesApiServiceSpy: jasmine.SpyObj<BikesApiService>;

  beforeEach(() => {
    bikesApiServiceSpy = jasmine.createSpyObj("BikesApiService", [
      "getBikesByCity",
      "getBikesResultCountByCity",
    ]);

    TestBed.configureTestingModule({
      providers: [
        BikeSearchService,
        { provide: BikesApiService, useValue: bikesApiServiceSpy },
      ],
    });

    bikeSearchService = TestBed.inject(BikeSearchService);
  });

  it("should be created", () => {
    expect(bikeSearchService).toBeTruthy();
  });

  it("should search for bikes of all colors and return the first page of results", () => {
    // SETUP
    const city = "Amsterdam";
    const color = "";
    const pageNumber = 1;
    const resultsPerPage = BIKE_SEARCH_RESULTS_PER_PAGE;
    const bikeResultsCount = mockBikeResultsCount_amsterdam_all.proximity;

    bikesApiServiceSpy.getBikesByCity.and.returnValue(
      of(mockBikeSummaries_amsterdam_all_p1),
    );
    bikesApiServiceSpy.getBikesResultCountByCity.and.returnValue(
      of(bikeResultsCount),
    );
    // EXECUTION
    bikeSearchService.searchBikes(city, color);
    // ASSERTION
    expect(bikesApiServiceSpy.getBikesByCity).toHaveBeenCalledWith(
      city,
      color,
      pageNumber,
      resultsPerPage,
    );
    expect(bikesApiServiceSpy.getBikesResultCountByCity).toHaveBeenCalledWith(
      city,
      color,
    );
    expect(bikeSearchService.bikeSearchResults()).toEqual(
      mockBikeSummaries_amsterdam_all_p1,
    );
    expect(bikeSearchService.searchResultCount()).toBe(bikeResultsCount);
    expect(bikeSearchService.searchResultPageSize()).toBe(resultsPerPage);
    expect(bikeSearchService.isSearchResultsLoading()).toBe(false);
    expect(bikeSearchService.isSearchResultsError()).toBe(false);
    expect(bikeSearchService.isSearchResultsEmpty()).toBe(false);
  });

  it("should search for bikes of all colors and return the second page of results", () => {
    // SETUP
    const city = "Amsterdam";
    const color = "";
    const pageNumber = 2;
    const resultsPerPage = BIKE_SEARCH_RESULTS_PER_PAGE;
    const bikeResultsCount = mockBikeResultsCount_amsterdam_all.proximity;

    bikesApiServiceSpy.getBikesByCity.and.returnValue(
      of(mockBikeSummaries_amsterdam_all_p2),
    );
    bikesApiServiceSpy.getBikesResultCountByCity.and.returnValue(
      of(bikeResultsCount),
    );
    // EXECUTION
    bikeSearchService.searchBikes(city, color, pageNumber);
    // ASSERTION
    expect(bikesApiServiceSpy.getBikesByCity).toHaveBeenCalledWith(
      city,
      color,
      pageNumber,
      resultsPerPage,
    );
    expect(bikesApiServiceSpy.getBikesResultCountByCity).toHaveBeenCalledWith(
      city,
      color,
    );
    expect(bikeSearchService.bikeSearchResults()).toEqual(
      mockBikeSummaries_amsterdam_all_p2,
    );
    expect(bikeSearchService.searchResultCount()).toBe(bikeResultsCount);
    expect(bikeSearchService.searchResultPageSize()).toBe(resultsPerPage);
    expect(bikeSearchService.isSearchResultsLoading()).toBe(false);
    expect(bikeSearchService.isSearchResultsError()).toBe(false);
    expect(bikeSearchService.isSearchResultsEmpty()).toBe(false);
  });

  it("should search for all red bikes and return the first page of results", () => {
    // SETUP
    const city = "Edmonton";
    const color = "red";
    const pageNumber = 1;
    const resultsPerPage = BIKE_SEARCH_RESULTS_PER_PAGE;
    const bikeResultsCount = mockBikeResultsCount_edmonton_red.proximity;

    bikesApiServiceSpy.getBikesByCity.and.returnValue(
      of(mockBikeSummaries_edmonton_red_p1),
    );
    bikesApiServiceSpy.getBikesResultCountByCity.and.returnValue(
      of(bikeResultsCount),
    );
    // EXECUTION
    bikeSearchService.searchBikes(city, color);
    // ASSERTION
    expect(bikesApiServiceSpy.getBikesByCity).toHaveBeenCalledWith(
      city,
      color,
      pageNumber,
      resultsPerPage,
    );
    expect(bikesApiServiceSpy.getBikesResultCountByCity).toHaveBeenCalledWith(
      city,
      color,
    );
    expect(bikeSearchService.bikeSearchResults()).toEqual(
      mockBikeSummaries_edmonton_red_p1,
    );
    expect(bikeSearchService.searchResultCount()).toBe(bikeResultsCount);
    expect(bikeSearchService.searchResultPageSize()).toBe(resultsPerPage);
    expect(bikeSearchService.isSearchResultsLoading()).toBe(false);
    expect(bikeSearchService.isSearchResultsError()).toBe(false);
    expect(bikeSearchService.isSearchResultsEmpty()).toBe(false);
  });

  it("should search for all red bikes and return the second page of results", () => {
    // SETUP
    const city = "Edmonton";
    const color = "red";
    const pageNumber = 2;
    const resultsPerPage = BIKE_SEARCH_RESULTS_PER_PAGE;
    const bikeResultsCount = mockBikeResultsCount_edmonton_red.proximity;

    bikesApiServiceSpy.getBikesByCity.and.returnValue(
      of(mockBikeSummaries_edmonton_red_p2),
    );
    bikesApiServiceSpy.getBikesResultCountByCity.and.returnValue(
      of(bikeResultsCount),
    );
    // EXECUTION
    bikeSearchService.searchBikes(city, color, pageNumber);
    // ASSERTION
    expect(bikesApiServiceSpy.getBikesByCity).toHaveBeenCalledWith(
      city,
      color,
      pageNumber,
      resultsPerPage,
    );
    expect(bikesApiServiceSpy.getBikesResultCountByCity).toHaveBeenCalledWith(
      city,
      color,
    );
    expect(bikeSearchService.bikeSearchResults()).toEqual(
      mockBikeSummaries_edmonton_red_p2,
    );
    expect(bikeSearchService.searchResultCount()).toBe(bikeResultsCount);
    expect(bikeSearchService.searchResultPageSize()).toBe(resultsPerPage);
    expect(bikeSearchService.isSearchResultsLoading()).toBe(false);
    expect(bikeSearchService.isSearchResultsError()).toBe(false);
    expect(bikeSearchService.isSearchResultsEmpty()).toBe(false);
  });

  it("should search for a non-matching city string and return no results", () => {
    // SETUP
    const city = "nonexistentcitystring";
    const color = "";
    const pageNumber = 1;
    const resultsPerPage = BIKE_SEARCH_RESULTS_PER_PAGE;
    const bikeResultsCount =
      mockBikeResultsCount_nonexistentcitystring_all.proximity;
    const bikeResults: BikeSummary[] = [];

    bikesApiServiceSpy.getBikesByCity.and.returnValue(
      of(mockBikeSummaries_nonexistentcitystring_all_p1),
    );
    bikesApiServiceSpy.getBikesResultCountByCity.and.returnValue(
      of(bikeResultsCount),
    );
    // EXECUTION
    bikeSearchService.searchBikes(city, color);
    // ASSERTION
    expect(bikesApiServiceSpy.getBikesByCity).toHaveBeenCalledWith(
      city,
      color,
      pageNumber,
      resultsPerPage,
    );
    expect(bikesApiServiceSpy.getBikesResultCountByCity).toHaveBeenCalledWith(
      city,
      color,
    );
    expect(bikeSearchService.bikeSearchResults()).toEqual(bikeResults);
    expect(bikeSearchService.searchResultCount()).toBe(bikeResultsCount);
    expect(bikeSearchService.isSearchResultsLoading()).toBe(false);
    expect(bikeSearchService.isSearchResultsEmpty()).toBe(true);
    expect(bikeSearchService.isSearchResultsError()).toBe(false);
  });

  it("should handle API errors gracefully", () => {
    // SETUP
    const city = "Amsterdam";
    const color = "";
    const pageNumber = 1;
    const resultsPerPage = BIKE_SEARCH_RESULTS_PER_PAGE;
    const bikeResultsCount = mockBikeResultsCount_amsterdam_all.proximity;
    const httpErrorResponsePayload = {
      status: mockBikesApiError_search_get_404.status,
      statusText: mockBikesApiError_search_get_404.statusText,
      url: mockBikesApiError_search_get_404.url,
      error: mockBikesApiError_search_get_404.error,
    };

    // TODO: Create generic helper function for suppressing specific console.error calls
    const originalConsoleError = console.error;
    spyOn(console, "error").and.callFake((...args) => {
      // Only suppress the specific HttpErrorResponse message
      if (
        args[0] instanceof HttpErrorResponse ||
        (typeof args[0] === "string" &&
          args[0].includes("Http failure response for"))
      ) {
        return;
      }
      originalConsoleError(...args);
    });

    bikesApiServiceSpy.getBikesByCity.and.returnValue(
      throwError(() => new HttpErrorResponse(httpErrorResponsePayload)),
    );
    bikesApiServiceSpy.getBikesResultCountByCity.and.returnValue(
      of(bikeResultsCount),
    );

    // EXECUTION
    bikeSearchService.searchBikes(city, color, pageNumber);

    // ASSERTION
    expect(bikesApiServiceSpy.getBikesByCity).toHaveBeenCalledWith(
      city,
      color,
      pageNumber,
      resultsPerPage,
    );
    expect(bikesApiServiceSpy.getBikesResultCountByCity).toHaveBeenCalledWith(
      city,
      color,
    );
    expect(bikeSearchService.bikeSearchResults()).toEqual([]);
    expect(bikeSearchService.searchResultCount()).toBe(0);
    expect(bikeSearchService.isSearchResultsLoading()).toBe(false);
    expect(bikeSearchService.isSearchResultsError()).toBe(true);
    expect(bikeSearchService.isSearchResultsEmpty()).toBe(false);
  });
});
