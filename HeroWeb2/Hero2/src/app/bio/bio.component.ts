import { Component, OnInit } from '@angular/core';
import { Developer } from '../developer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  constructor() {}
  devs!: Developer[]; // Corrected to an array of Developer

  ngOnInit() {
    console.log('BioComponent ngOnInit');
    this.loadDeveloper(); // Call loadDeveloper in ngOnInit
  }

  loadDeveloper() {
    this.devs = [
      { firstName: "John", lastName: "Doe", language: "Python", startYear: 2015 },
      { firstName: "Jane", lastName: "Smith", language: "Java", startYear: 2016 },
      { firstName: "Jim", lastName: "Brown", language: "C#", startYear: 2017 },
      { firstName: "Jack", lastName: "White", language: "JavaScript", startYear: 2018 }
    ];
  }
   
}