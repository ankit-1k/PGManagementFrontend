import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './superadmin-routing.module';
import { SuperadminComponent } from './superadmin.component';
import { TabViewModule } from 'primeng/tabview';
import { SalesComponent } from '../sales/sales.component';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PaidComponent } from '../paid/paid.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';  
import { SettingsComponent } from '../settings/settings.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SuperadminComponent, SalesComponent, PaidComponent, SettingsComponent],
  imports: [
    CommonModule, 
    SuperAdminRoutingModule,
    TabViewModule,
    ChartModule,
    FormsModule,
    DropdownModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,    
  ]
})
export class SuperAdminModule {}
