import { Component, input } from "@angular/core";
import { Params, RouterLink } from "@angular/router";

@Component({
  selector: "app-back-button",
  imports: [RouterLink],
  templateUrl: "./back-button.component.html",
  styleUrl: "./back-button.component.scss",
})
export class BackButtonComponent {
  routeLink = input<string | (string | number)[]>("/");
  queryParams = input<Params>({});

  printQueryParams() {
    console.log(this.queryParams());
  }
}
