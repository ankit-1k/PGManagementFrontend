import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Common/login/login.component';
import { AuthGuard } from './Common/login/auth/auth.guard';
import { SuperadminGuard } from './guards/superadmin.guard';
// , canActivate: [AuthGuard]
const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: "login", component: LoginComponent, data: { noHeader: true } },
  { path: "mgmt", loadChildren: () => import('./Rmgmt/mgmt/mgmt.module').then(m => m.MgmtModule) },
  { path: "admin", loadChildren: () => import('./SuperAdmin/superadmin/superadmin.module').then(m => m.SuperAdminModule), canActivate: [SuperadminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
