import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MgmtModule } from './Rmgmt/mgmt/mgmt.module';
import { LoginComponent } from './Common/login/login.component';
import { AuthGuard } from './Common/login/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: "login", component: LoginComponent , data: { noHeader: true } },
  { path: "mgmt", loadChildren: () => (import('./Rmgmt/mgmt/mgmt.module')).then(m => MgmtModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
