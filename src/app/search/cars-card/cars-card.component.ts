import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/cars';
import { ServerService } from 'src/app/shared/server.service';
import { BookingService } from '../booking.service';
import { Order } from 'src/app/shared/orders';

@Component({
  selector: 'app-cars-card',
  templateUrl: './cars-card.component.html',
  styleUrls: ['./cars-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CarsCardComponent implements OnInit {

  cars: Car[] = [];

  constructor(private serverService: ServerService,
              private bookingService: BookingService) {
  }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    return this.serverService.getCars().subscribe((cars: Car[]) => {
      this.serverService.getOrders().subscribe((carOrders: Order[]) => {
        cars.forEach(car => {
          const carIsFree: boolean = carOrders.every(order => order.carId !== car.id);
          if (carIsFree) {
            this.cars.push(car);
          }
          else {
            const activeOrders: Order[] = carOrders.filter(order => order.carId === car.id);
            let carIsRentable: boolean = false;
            activeOrders.forEach(order => {
              const rentStartDate = new Date(order.rentStartDate).valueOf();
              const rentEndDate = new Date(order.rentEndDate).valueOf();
              const startDate = new Date(this.bookingService.startDate).valueOf();
              const endDate = new Date(this.bookingService.endDate).valueOf();
              if ((startDate < rentStartDate
                && endDate < rentStartDate)
                || (startDate > rentEndDate)
              ) {
                carIsRentable = true;

              } else {
                carIsRentable = false;
              }
            })
            if (carIsRentable) {
              this.cars.push(car);
            }
          }
        })
      });
    });
  }

  bookTheCar(car: Car) {
    this.bookingService.bookingCar(car);
    window.alert('The car has been successfully added to the cart!');
  }

}
