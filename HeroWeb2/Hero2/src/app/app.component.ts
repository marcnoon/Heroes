import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './bio/home/home.component';
import { BioComponent } from './bio/bio.component';
import { BioDetailsComponent } from './bio-details/bio-details.component';
import { AppRoutingModule } from './app.routes';
import { DeveloperService } from './developer.service'; // Import the DeveloperService
import { Subscription } from 'rxjs'; // Import Subscription to manage observable subscriptions
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HomeComponent, BioComponent, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Hero2';
  selectedDeveloperId: string = "1"; // Default to the first developer
  currentDeveloperId: string = "1"; // Default to the first developer
  private subscription!: Subscription;  // Subscription for the DeveloperService observable

  constructor(private router: Router, private route: ActivatedRoute, private developerService: DeveloperService) {} // Inject DeveloperService

  ngOnInit() {
    // Subscribe to route parameters for current developer ID
    this.route.params.subscribe(params => {
      // Note: the + symbol converts the string to a number.  Its a javascript and typescript trick/feature.
      //this.currentDeveloperId = params['id'] ? +params['id'] : "0"; // Get the current developer ID from the route params
      this.currentDeveloperId = params['id'] ? params['id'] : "0"; // Get the current developer ID from the route params
      console.log('Current Developer ID from route params:', this.currentDeveloperId);
    });

    // Subscribe to the selectedDeveloperId$ observable from DeveloperService
    this.subscription = this.developerService.selectedDeveloperId$.subscribe(id => {
      this.selectedDeveloperId = id || "0"; // Get the selected developer ID from the observable
      console.log('AppComponent: Selected Developer ID:', this.selectedDeveloperId);
    });
  }

  // Unsubscribe from the observable to prevent memory leaks
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToBio() {
    this.router.navigate(['/bio']);
  }

  navigateToDeveloperDetails(id: string) {
    this.selectedDeveloperId = id;
    console.log('Navigating to Developer ID:', this.selectedDeveloperId);
    this.router.navigate([`/bio/${id}`]);
  }

}
