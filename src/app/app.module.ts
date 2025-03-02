import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';  
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { StepsModule } from 'primeng/steps';

// components
import { HeaderComponent } from './Common/header/header.component';
import { HomeComponent } from './Mgmt/home/home.component';
import { LoginComponent } from './Common/login/login.component';
import { NewcustomerComponent } from './Mgmt/CustomerMgmt/newcustomer/newcustomer.component';
import { CustomersComponent } from './Mgmt/CustomerMgmt/customers/customers.component';
import { UpcomingrentsComponent } from './Mgmt/CustomerMgmt/upcomingrents/upcomingrents.component';
import { RoomsComponent } from './RoomMgmt/rooms/rooms.component';
import { PaymentsComponent } from './Mgmt/CustomerMgmt/payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NewcustomerComponent,
    CustomersComponent,
    UpcomingrentsComponent,
    RoomsComponent,
    PaymentsComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,HttpClientModule,
    FormsModule,
    ButtonModule, 
    SidebarModule, 
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    ToastModule,
    BlockUIModule,
    PanelModule,
    RippleModule,
    InputSwitchModule,
    TabViewModule,
    DialogModule,
    KnobModule,
    InputTextareaModule,
    PaginatorModule,
    ProgressBarModule,
    CarouselModule,
    AccordionModule,
    ImageModule,
    ToolbarModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    InputNumberModule,
    CommonModule ,
    OverlayPanelModule,
    AutoCompleteModule,
    MenuModule,
    TieredMenuModule,
    StepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
