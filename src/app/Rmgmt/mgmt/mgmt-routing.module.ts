import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgmenuComponent } from 'src/app/Menu/pgmenu/pgmenu.component';
import { CustomersComponent } from 'src/app/Mgmt/CustomerMgmt/customers/customers.component';
import { NewcustomerComponent } from 'src/app/Mgmt/CustomerMgmt/newcustomer/newcustomer.component';
import { PaymentsComponent } from 'src/app/Mgmt/CustomerMgmt/payments/payments.component';
import { UpcomingrentsComponent } from 'src/app/Mgmt/CustomerMgmt/upcomingrents/upcomingrents.component';
import { HomeComponent } from 'src/app/Mgmt/home/home.component';
import { RoomsComponent } from 'src/app/RoomMgmt/rooms/rooms.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newcustomer', component: NewcustomerComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'upcomingrents', component: UpcomingrentsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'menu', component: PgmenuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MgmtRoutingModule { }
