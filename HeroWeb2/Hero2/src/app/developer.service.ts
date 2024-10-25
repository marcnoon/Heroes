import { Injectable } from '@angular/core';
import { Developer } from './developer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private selectedDeveloperIdSubject = new BehaviorSubject<number>(1); // Default to the first developer
  selectedDeveloperId$ = this.selectedDeveloperIdSubject.asObservable();

  constructor() { }

  getAllDevelopers(): Developer[] {
    return [
      {id: 1, firstName: "John", lastName: "Doe", language: "Python", startYear: 2015 },
      {id: 2, firstName: "Jane", lastName: "Smith", language: "Java", startYear: 2016 },
      {id: 3, firstName: "Jim", lastName: "Brown", language: "C#", startYear: 2017 },
      {id: 4, firstName: "Jack", lastName: "White", language: "JavaScript", startYear: 2018 }
    ];
  }

  getDeveloperById(id: number): Developer | undefined{
    return this.getAllDevelopers().find(dev => dev.id === id)!;
  }

  setSelectedDeveloperId(id: number) {
    this.selectedDeveloperIdSubject.next(id);
  }

  getSelectedDeveloperId() {
    return this.selectedDeveloperIdSubject.getValue();
  }

}
