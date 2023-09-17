import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from '../search/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../shared/cars';
import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit{
  @Input() orderDetails = { id: 0, carId: 0, fullName: '', email: '', adress: '', city: '', zip: 0, phoneNumber: 0, rentStartDate: '', rentEndDate: ''};
  
  checkoutForm: FormGroup;
  cars = this.bookingService.getCars();
  items: Car[];
  days;

  constructor(private bookingService: BookingService,
              private router: Router,
              private serverService: ServerService,
              private fb: FormBuilder){

  }
  addOrder(dataOrder: any) {
    this.orderDetails.rentStartDate = this.bookingService.startDate;
    this.orderDetails.rentEndDate = this.bookingService.endDate;
    this.orderDetails.carId = this.bookingService.car.id;
    this.serverService.createOrder(this.orderDetails).subscribe((data: {}) => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.bookingService.loadBooking();
    this.items= this.bookingService.getCars();
    const startDay= new Date( this.bookingService.startDate).valueOf();
    const endDay= new Date(this.bookingService.endDate).valueOf();
    this.days= (endDay - startDay)/ 86400000;
    this.checkoutForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      adr: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1000)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  get fname() {
    return this.checkoutForm.get('fname');
  }
  get email() {
    return this.checkoutForm.get('email');
  }
  get adr() {
    return this.checkoutForm.get('adr');
  }
  get city() {
    return this.checkoutForm.get('city');
  }
  get zip() {
    return this.checkoutForm.get('zip');
  }
  get phoneNumber() {
    return this.checkoutForm.get('phoneNumber');
  }

  $Preview_onClick(form: FormGroup) {
    if (form.invalid) {
      return form.markAllAsTouched();
    } else {
      window.alert("Booking is completed!  Hope to see you soon in our office! :)");
      this.bookingService.clearBooking(this.cars);
    }
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
  }
}
