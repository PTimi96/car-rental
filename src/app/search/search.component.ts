import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CarsCardComponent } from './cars-card/cars-card.component';
import { BookingService } from './booking.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CarsCardComponent,
    JsonPipe
  ],
})
export class SearchComponent implements OnInit {
  @Input() orderDetails = { rentStartDate: '', rentEndDate: '' };

  minDate: Date;
  maxDate: Date;
  listCars: boolean = false;
  range: FormGroup;

  constructor(private fb: FormBuilder,
              private bookingService: BookingService) {

    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 0, 1);
    this.minDate = new Date();
  }

  listHideCars(value) {
    this.listCars = value;
    this.bookingService.saveStartDate(this.orderDetails);
    this.bookingService.saveEndDate(this.orderDetails);

  }

  ngOnInit() {
    this.range = this.fb.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    })
  }
}
