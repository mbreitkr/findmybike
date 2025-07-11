import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Params, provideRouter, RouterLink } from "@angular/router";

import { BackButtonComponent } from "./back-button.component";

describe("BackButtonComponent", () => {
  let fixture: ComponentFixture<BackButtonComponent>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    debugEl = fixture.debugElement;
  });

  it("should render a link with the default url and no query params", () => {
    // SETUP
    const url = "/";
    const queryParams: Params = {};

    // EXECUTION
    fixture.detectChanges();

    // ASSERTION
    const backLinkEl = debugEl.query(By.css("a"));
    const routerLinkInstance = backLinkEl.injector.get(RouterLink);

    expect(backLinkEl.attributes["href"]).toBe(url);
    expect(routerLinkInstance.queryParams).toEqual(queryParams);
  });

  it("should render a link with the provided string url", async () => {
    // SETUP
    const url = "/search";

    // EXECUTION
    fixture.componentRef.setInput("routeLink", url);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    const backLinkEl = debugEl.query(By.css("a"));
    expect(backLinkEl.attributes["href"]).toBe(url);
  });

  it("should render a link with the provided array url", async () => {
    // SETUP
    const url = "/details";
    const routeParam = 1945;
    const routeLink = [url, routeParam];
    const expectedHref = `${url}/${routeParam}`;

    // EXECUTION
    fixture.componentRef.setInput("routeLink", routeLink);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    const backLinkEl = debugEl.query(By.css("a"));
    expect(backLinkEl.attributes["href"]).toBe(expectedHref);
  });

  it("should render a link with the provided query params", async () => {
    // SETUP
    const queryParams = { city: "Edmonton", page: 2, color: "red" };

    // EXECUTION
    fixture.componentRef.setInput("queryParams", queryParams);
    await fixture.whenStable();
    fixture.detectChanges();

    // ASSERTION
    const backLinkEl = debugEl.query(By.css("a"));
    const routerLinkInstance = backLinkEl.injector.get(RouterLink);
    expect(routerLinkInstance.queryParams).toEqual(queryParams);
  });
});
