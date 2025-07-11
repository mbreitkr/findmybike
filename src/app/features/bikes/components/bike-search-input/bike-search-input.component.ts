import { Component, effect, input, OnInit, output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { BikeSearchFormValues } from "../../interfaces/bike-search-form.model";

interface BikeSearchForm {
  city: FormControl<string>;
}

@Component({
  selector: "app-bike-search-input",
  imports: [ReactiveFormsModule],
  templateUrl: "./bike-search-input.component.html",
  styleUrl: "./bike-search-input.component.scss",
})
export class BikeSearchInputComponent implements OnInit {
  isLoading = input(false);
  lastSearchedCity = input("");
  searchSubmit = output<BikeSearchFormValues>();

  searchForm = new FormGroup<BikeSearchForm>({
    city: new FormControl("", {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    // Form rehydration
    this.searchForm.patchValue({
      city: this.lastSearchedCity() || "",
    });
  }

  constructor() {
    effect(() => {
      const isLoading = this.isLoading();
      if (!isLoading) {
        this.searchForm.enable();
      } else {
        this.searchForm.disable();
      }
    });
  }

  onSubmit(): void {
    const formValues = this.searchForm.getRawValue();
    // TODO: Clean up logic once bike color filter is added back in
    if (this.searchForm.valid)
      this.searchSubmit.emit({ city: formValues.city, color: "" });
  }
}
