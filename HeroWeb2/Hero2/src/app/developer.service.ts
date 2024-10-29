import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Developer } from '../app/developer'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = 'https://dev-bios-api-dot-cog01hprmn542jqme4w772bk1dxpr.uc.r.appspot.com/developers/all';  // URL to web api
  private apiAddUrl = 'https://dev-bios-api-dot-cog01hprmn542jqme4w772bk1dxpr.uc.r.appspot.com/developers/add';  // URL to web api

  private selectedDeveloperIdSubject = new BehaviorSubject<string | null>(null); // Initialize with null
  selectedDeveloperId$ = this.selectedDeveloperIdSubject.asObservable(); // Observable for selected developer ID
  private dirty = false; // Dirty flag to indicate if the list should be fetched from the API

  constructor(private httpClient: HttpClient) {}

  // Method to get the current selected developer ID (useful for non-observable scenarios)
  getSelectedDeveloperId(): string | null {
    return this.selectedDeveloperIdSubject.getValue(); // Get the current value of the selected developer ID
  }

  // Method to set the selected developer ID
  setSelectedDeveloperId(id: string | null): void {
    this.selectedDeveloperIdSubject.next(id);
  }

  // Method to add a new developer
  addDeveloper(dev: Developer): Observable<Developer> {
    return this.httpClient.post<Developer>(this.apiAddUrl, dev)
      .pipe(
        map((data: Developer) => {
          this.dirty = true; // Set the dirty flag to true when a new developer is added
          return data;
        }),
        catchError(error => {
          console.error(error);
          throw error;
        })
      );
  }

  // Method to get all developers
  getAllDevelopers(): Observable<Developer[]> {
    if (this.dirty) {
      // Fetch from API if the dirty flag is true
      return this.httpClient.get<Developer[]>(`${this.apiUrl}`)
        .pipe(
          map((data: Developer[]) => {
            localStorage.setItem('developers', JSON.stringify(data)); // Update local storage
            this.dirty = false; // Reset the dirty flag
            return data;
          }),
          catchError(error => {
            console.error(error);
            throw error;
          })
        );
    } else {
      // Fetch from local storage if the dirty flag is false
      const storedDevelopers = localStorage.getItem('developers');
      if (storedDevelopers) {
        return new Observable<Developer[]>(observer => {
          observer.next(JSON.parse(storedDevelopers));
          observer.complete();
        });
      } else {
        // Fallback to API if local storage is empty
        return this.httpClient.get<Developer[]>(`${this.apiUrl}`)
          .pipe(
            map((data: Developer[]) => {
              localStorage.setItem('developers', JSON.stringify(data)); // Update local storage
              return data;
            }),
            catchError(error => {
              console.error(error);
              throw error;
            })
          );
      }
    }
  }
}