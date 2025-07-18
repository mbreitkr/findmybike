import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BikeSearchResultCardComponent } from "./bike-search-result-card.component";

import {
  mockBikeSummaries_amsterdam_all_p1,
  mockBikeSummaries_edmonton_red_p2,
} from "../../testing/mocks/bike-search-results.mock";
import { provideRouter, RouterLink } from "@angular/router";

describe("BikeSearchResultCardComponent", () => {
  let fixture: ComponentFixture<BikeSearchResultCardComponent>;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikeSearchResultCardComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(BikeSearchResultCardComponent);
    debugEl = fixture.debugElement;
  });

  it("should display details of the correct inputted bike search result", async () => {
    // SETUP
    const bikeSummary = mockBikeSummaries_amsterdam_all_p1[0];
    const title = "2022 Gazelle Paris C7+ Hmb";
    const status = "Stolen";
    const serial = "GZ61885614";
    const manufacturer = "Gazelle";
    const lastKnownLocation = "Haarlem, 2012HK, NL";
    const imgUrl =
      "https://files.bikeindex.org/uploads/Pu/915328/small_PXL_20241227_155806282.jpg";

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    await fixture.whenStable();
    fixture.detectChanges();

    const titleEl = debugEl.query(By.css("h2")).nativeElement;
    const statusValueEl = debugEl.query(
      By.css("[data-testid='status-value']"),
    ).nativeElement;
    const serialValueEl = debugEl.query(
      By.css("[data-testid='serial-value']"),
    ).nativeElement;
    const manufacturerValueEl = debugEl.query(
      By.css("[data-testid='manufacturer-value']"),
    ).nativeElement;
    const lastLocationValueEl = debugEl.query(
      By.css("[data-testid='last-location-value']"),
    ).nativeElement;
    const imageEl = debugEl.query(By.css("img")).nativeElement;

    // ASSERTION
    expect(titleEl?.textContent).toContain(title);
    expect(statusValueEl?.textContent).toContain(status);
    expect(serialValueEl?.textContent).toContain(serial);
    expect(manufacturerValueEl?.textContent).toContain(manufacturer);
    expect(lastLocationValueEl?.textContent).toContain(lastKnownLocation);
    expect(imageEl?.src).toBe(imgUrl);
  });

  it("should use a fallback image if a thumb image isn't present", async () => {
    // SETUP
    const bikeSummary = mockBikeSummaries_amsterdam_all_p1[3]; // has null for thumb image
    const imageUrl = "img/placeholder_300x300@2x.png";

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    const imageEl = debugEl.query(By.css("img")).nativeElement;
    expect(imageEl?.src).toContain(imageUrl);
  });

  it("should set the routerLink on the button to the correct details page path", async () => {
    // SETUP
    const bikeSummary = mockBikeSummaries_amsterdam_all_p1[0];
    const detailsPagePath = `/details/${bikeSummary.id}`;

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    const detailsLinkEl = debugEl.query(
      By.css("[data-testid='bike-search-result-details-link']"),
    );
    expect(detailsLinkEl.attributes["href"]?.split("?")[0]).toBe(
      detailsPagePath,
    );
  });

  it("should set the correct query parameters on the details page link", async () => {
    // SETUP
    const bikeSummary = mockBikeSummaries_edmonton_red_p2[0];
    const queryParams = { city: "Edmonton", page: 2, color: "red" };

    // EXECUTION
    fixture.componentRef.setInput("bikeSearchResult", bikeSummary);
    fixture.componentRef.setInput("lastSearchedCity", queryParams.city);
    fixture.componentRef.setInput("lastSearchedColor", queryParams.color);
    fixture.componentRef.setInput("currentPageIndex", queryParams.page - 1);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    const detailsLinkEl = debugEl.query(
      By.css("[data-testid='bike-search-result-details-link']"),
    );
    const routerLinkInstance = detailsLinkEl.injector.get(RouterLink);
    expect(routerLinkInstance.queryParams).toEqual(queryParams);
  });
});
