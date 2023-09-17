import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/shared/server.service';

@Component({
  selector: 'app-cars-edit',
  templateUrl: './cars-edit.component.html',
  styleUrls: ['./cars-edit.component.scss']
})
export class CarsEditComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  carData: any = {};

  constructor(private serverService: ServerService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.serverService.getCar(this.id).subscribe((data: {}) => {
      this.carData = data;
    })
  }

  updateCar() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.serverService.updateCar(this.id, this.carData).subscribe(data => {
        this.router.navigate(['/cars-list'])
      })
    }
  }
}
