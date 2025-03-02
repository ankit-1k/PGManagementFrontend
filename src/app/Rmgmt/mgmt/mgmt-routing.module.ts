import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from 'src/app/Mgmt/CustomerMgmt/customers/customers.component';
import { NewcustomerComponent } from 'src/app/Mgmt/CustomerMgmt/newcustomer/newcustomer.component';
import { UpcomingrentsComponent } from 'src/app/Mgmt/CustomerMgmt/upcomingrents/upcomingrents.component';
import { HomeComponent } from 'src/app/Mgmt/home/home.component';
import { RoomsComponent } from 'src/app/RoomMgmt/rooms/rooms.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newcustomer', component: NewcustomerComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'upcomingrents', component: UpcomingrentsComponent },
  { path: 'rooms', component: RoomsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MgmtRoutingModule { }
