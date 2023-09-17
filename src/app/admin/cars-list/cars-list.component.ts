import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/shared/cars';
import { Order } from 'src/app/shared/orders';
import { ServerService } from 'src/app/shared/server.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  cars: Car[] = [];
  orders: Order[] = [];

  constructor(private serverService: ServerService,
              private router: Router) { }

  ngOnInit() {
    this.loadCars();
    this.loadOrders();
  }

  loadCars() {
    return this.serverService.getCars().subscribe((data: Car[]) => {
      this.cars = data;
    });
  }

  loadOrders() {
    return this.serverService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  deleteCar(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.serverService.deleteCar(id).subscribe((data) => {
        this.loadCars();
      });

    }
  }

  addCar() {
    this.router.navigate(['cars-create']);
  }
}
