import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../shared/cars';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Order } from '../shared/orders';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getCars(): Observable<Car[]> {
    return this.http
      .get<Car[]>(this.apiURL + '/cars')
      .pipe(retry(1), catchError(this.handleError));
  }

  getCar(id: any): Observable<Car> {
    return this.http
      .get<Car>(this.apiURL + '/cars/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  createCar(car: any): Observable<Car> {
    return this.http
      .post<Car>(
        this.apiURL + '/cars',
        JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateCar(id: any, car: any): Observable<Car> {
    return this.http
      .put<Car>(
        this.apiURL + '/cars/' + id,
        JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCar(id: any) {
    return this.http
      .delete<Car>(this.apiURL + '/cars/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createOrder(order: any): Observable<Order> {
    return this.http
      .post<Order>(
        this.apiURL + '/orders',
        JSON.stringify(order),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.apiURL + '/orders')
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
