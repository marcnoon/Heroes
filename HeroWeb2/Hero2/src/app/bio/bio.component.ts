import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Developer } from '../developer';
import { CommonModule } from '@angular/common';
import { DeveloperService } from '../developer.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit, OnDestroy {
  @Input() devs: Developer[] = [];  // Array of Developer
  selectedDeveloperId: string | null = null;  // Hold the currently selected developer ID
  private subscription!: Subscription;  // Store the subscription
  selectedDevelopers: Developer[] = [];  // Array to store selected developers
  private readonly STORAGE_KEY = 'selectedDevelopers';
  private readonly TIMESTAMP_KEY = 'selectedDevelopersTimestamp';
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(private devService: DeveloperService, private httpClient: HttpClient) {}

  ngOnInit() {
    console.log('BioComponent ngOnInit');

    // Load all developers when the component initializes
    this.loadDeveloper();

    // Subscribe to the selected developer ID from the DeveloperService
    this.subscription = this.devService.selectedDeveloperId$.subscribe(id => {
      this.selectedDeveloperId = id;
      console.log('ngOnInit bio component: Selected Developer ID:', id);
    });

    // Load selected developers from local storage if not expired
    const storedDevelopers = localStorage.getItem(this.STORAGE_KEY);
    const storedTimestamp = localStorage.getItem(this.TIMESTAMP_KEY);
    const now = new Date().getTime();

    if (storedDevelopers && storedTimestamp && (now - parseInt(storedTimestamp, 10)) < this.CACHE_DURATION) {
      this.selectedDevelopers = JSON.parse(storedDevelopers);
    } else {
      // Clear expired data
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.TIMESTAMP_KEY);
    }    
  }

  // Unsubscribe to prevent memory leaks
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Load all developers from the service
  loadDeveloper() {
    this.devService.getAllDevelopers().subscribe(devs => {
      this.devs = devs;
    });
  }

  // When a developer is selected, update the selectedDeveloperId in the service
  selectDeveloper(id: string) {
    console.log('Selected Developer ID:', id);
    this.devService.setSelectedDeveloperId(id);  // Update the developer ID in the service
  }

  // Toggle selection of a developer
  toggleDeveloperSelection(dev: Developer) {
    const index = this.selectedDevelopers.findIndex(d => d.id === dev.id);
    if (index > -1) {
      // Developer is already selected, remove it
      this.selectedDevelopers.splice(index, 1);
    } else {
      // Developer is not selected, add it
      this.selectedDevelopers.push(dev);
    }
    // Update local storage with timestamp
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.selectedDevelopers));
    localStorage.setItem(this.TIMESTAMP_KEY, new Date().getTime().toString());
  }  

  // Generate a nicely formatted description of the developer for the tooltip
  getDeveloperDescription(dev: Developer): string {
    return `${dev.firstName} ${dev.lastName}\nLanguage: ${dev.favoriteLanguage}\nStart Year: ${dev.yearStarted}`;
  }

  // Check if a developer is selected
  isDeveloperSelected(dev: Developer): boolean {
    return this.selectedDevelopers.some(d => d.id === dev.id);
  }  
  
}
