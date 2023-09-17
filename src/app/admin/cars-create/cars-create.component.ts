import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../../shared/server.service';
import { Car } from 'src/app/shared/cars';

@Component({
  selector: 'app-cars-create',
  templateUrl: './cars-create.component.html',
  styleUrls: ['./cars-create.component.scss'],
})

export class CarsCreateComponent {
  @Input() carDetails: Car;


  constructor(public serverService: ServerService,
              private router: Router) { }


  addCar(dataCar: any) {
    this.serverService.createCar(this.carDetails).subscribe((data: {}) => {
      this.router.navigate(['/cars-list']);
    });
  }
}
