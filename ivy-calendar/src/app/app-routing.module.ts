import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  { path: 'authentication', loadChildren: () => import('../modules/authentication/authentication.module').then(m => m.AuthenticationModule)},

  { path: 'dashboard', loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)}

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
