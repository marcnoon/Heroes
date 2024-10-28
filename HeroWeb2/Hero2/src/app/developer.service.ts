import { Injectable } from '@angular/core';
import { Developer } from './developer';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  // BehaviorSubject to hold the selected developer ID, defaulting to 1 (the first developer)
  private selectedDeveloperIdSubject = new BehaviorSubject<number>(1);
  // Observable for the selected developer ID that components can subscribe to
  selectedDeveloperId$: Observable<number> = this.selectedDeveloperIdSubject.asObservable();

  // Constructor
  constructor() {}

  // Method to return all developers
  getAllDevelopers(): Developer[] {
    return [
      { id: 1, firstName: "John", lastName: "Doe", language: "Python", startYear: 2015 },
      { id: 2, firstName: "Jane", lastName: "Smith", language: "Java", startYear: 2016 },
      { id: 3, firstName: "Jim", lastName: "Brown", language: "C#", startYear: 2017 },
      { id: 4, firstName: "Jack", lastName: "White", language: "JavaScript", startYear: 2018 }
    ];
  }

  // Method to return a developer by ID
  getDeveloperById(id: number): Developer | undefined {
    return this.getAllDevelopers().find(dev => dev.id === id);
  }

  // Method to set the selected developer ID
  setSelectedDeveloperId(id: number) {
    console.log('DeveloperService: Setting selected developer ID to', id);
    this.selectedDeveloperIdSubject.next(id);  // Notify all subscribers of the new selected developer ID
  }

  // Method to get the current selected developer ID (useful for non-observable scenarios)
  getSelectedDeveloperId(): number {
    return this.selectedDeveloperIdSubject.getValue();  // Get the current value of the selected developer ID
  }
}
