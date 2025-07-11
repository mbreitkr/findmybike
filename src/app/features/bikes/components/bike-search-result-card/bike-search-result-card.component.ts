import { Component, computed, input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BikeSummary } from "../../interfaces/bike.model";
import { replaceEmptyBikeDetails } from "../../utils/bikeHelper";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-bike-search-result-card",
  imports: [CommonModule, RouterLink],
  templateUrl: "./bike-search-result-card.component.html",
  styleUrl: "./bike-search-result-card.component.scss",
})
export class BikeSearchResultCardComponent {
  bikeSearchResult = input.required<BikeSummary>();
  lastSearchedCity = input("");
  lastSearchedColor = input("");
  currentPageIndex = input(0);

  currentResultPage = computed(() => this.currentPageIndex() + 1);
  detailQueryParams = computed(() => {
    const params: Record<string, string | number> = {};
    if (this.lastSearchedCity() !== "")
      params["city"] = this.lastSearchedCity();
    if (this.lastSearchedColor() !== "")
      params["color"] = this.lastSearchedColor();
    if (this.currentResultPage()) params["page"] = this.currentResultPage();
    return params;
  });

  // BUG: Convert getters to computed signals
  get bikeImage(): string {
    return this.bikeSearchResult().thumb ?? "img/placeholder_300x300@2x.png";
  }

  get lastKnownLocation(): string {
    return (
      this.bikeSearchResult().stolen_location ??
      this.bikeSearchResult().location_found ??
      "Unknown"
    );
  }

  get serialNumber(): string {
    return replaceEmptyBikeDetails(this.bikeSearchResult().serial);
  }

  openDetailsPage(): void {
    window.open(`/details/${this.bikeSearchResult().id}`);
  }
}
