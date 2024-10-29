import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './bio/home/home.component';
import { BioComponent } from './bio/bio.component';
import { BioDetailsComponent } from './bio-details/bio-details.component';
import { BioCreateComponent } from './bio-create/bio-create.component'; // Import BioCreateComponent

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bio', component: BioComponent },
  { path: 'bio/:id', component: BioDetailsComponent },
  { path: 'bio-create', component: BioCreateComponent }, // Remove :id from the route
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect to home by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
