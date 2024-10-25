import { Component, Input, OnInit } from '@angular/core';
import { Developer } from '../developer';
import { CommonModule } from '@angular/common';
import { DeveloperService } from '../developer.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  constructor(private devService: DeveloperService) {}
  @Input() devs: Developer[] = []; // Corrected to an array of Developer

  ngOnInit() {
    console.log('BioComponent ngOnInit');
    this.loadDeveloper(); // Call loadDeveloper in ngOnInit
  }

  loadDeveloper() {
    this.devs = this.devService.getAllDevelopers();
  }

  selectDeveloper(id: number) {
    console.log('Selected Developer ID:', id);
    // Additional logic to handle developer selection can be added here
  }
}
