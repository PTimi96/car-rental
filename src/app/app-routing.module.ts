import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { CarsCreateComponent } from './admin/cars-create/cars-create.component';
import { CarsEditComponent } from './admin/cars-edit/cars-edit.component';
import { CarsListComponent } from './admin/cars-list/cars-list.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';

const routes: Routes = [
  {path: '', component: SearchComponent, pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, pathMatch:'full'},
  {path: 'cars-list', component: CarsListComponent},
  {path: 'cars-create', component: CarsCreateComponent},
  {path: 'cars-edit/:id', component: CarsEditComponent},
  {path: 'manage-booking', component: ManageBookingComponent, pathMatch: 'full'},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
