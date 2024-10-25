import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './bio/home/home.component';
import { BioComponent } from './bio/bio.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bio', component: BioComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect to home by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }