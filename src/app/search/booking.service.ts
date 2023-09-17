import { Injectable, Input } from '@angular/core';
import { Car } from '../shared/cars';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  @Input() orderDetails = { id: 0, carId: 0, fullName: '', email: '', adress: '', city: '', zip: 0, rentStartDate: '', rentEndDate: '' };

  items: Car[] = [];
  car: Car;
  startDate: string;
  endDate: string;

  bookingCar(car: Car) {
    const foundCar = this.items.find(item => item.id === car.id);
    if (!foundCar) {
      const cloneCar = { ...car };
      this.items.push(cloneCar);
      this.car = cloneCar;
    }
    this.saveBooking();
  }

  getCars() {
    return this.items;
  }

  loadBooking() {
    this.items = JSON.parse(localStorage.getItem("booked_items")) ?? [];
  }

  saveBooking() {
    localStorage.setItem('booked_items', JSON.stringify(this.items));
  }

  clearBooking(items) {
    this.items = [];
    localStorage.removeItem('booked_items')
  }

  removeBooking(item) {
    const index = this.items.findIndex(o => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveBooking();
    }
  }

  saveStartDate(orderDetails) {
    this.startDate = orderDetails.rentStartDate.toLocaleDateString();
  }

  saveEndDate(orderDetails) {
    this.endDate = orderDetails.rentEndDate.toLocaleDateString();
  }

}
