import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './bio/home/home.component';
import { BioComponent } from './bio/bio.component';
import { BioDetailsComponent } from './bio-details/bio-details.component';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HomeComponent, BioComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Hero2';
  selectedDeveloperId: number = 1; // Default to the first developer
  currentDeveloperId: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentDeveloperId = params['id'] ? +params['id'] : null;
      console.log('Current Developer ID:', this.currentDeveloperId);
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToBio() {
    this.router.navigate(['/bio']);
  }

  navigateToDeveloperDetails(id: number) {
    this.selectedDeveloperId = id;
    console.log('Selected Developer ID:', this.selectedDeveloperId);
    this.router.navigate([`/bio/${id}`]);
  }

}
