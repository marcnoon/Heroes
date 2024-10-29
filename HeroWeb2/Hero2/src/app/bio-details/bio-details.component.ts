import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeveloperService } from '../developer.service';
import { Developer } from '../developer';

@Component({
  selector: 'app-bio-details',
  standalone: true,
  imports: [CommonModule], // Add HttpClientModule here
  templateUrl: './bio-details.component.html',
  styleUrls: ['./bio-details.component.scss']
})
export class BioDetailsComponent implements OnInit {
  dev!: Developer;
  selectedDevelopers: Developer[] = [];  // Array to store selected developers

  constructor(private route: ActivatedRoute, private devService: DeveloperService) {}

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     const id = params.get('id')!;
  //     this.devService.getDeveloperById(id).subscribe(dev => {
  //       this.dev = dev!;
  //       console.log('BioDetailsComponent Current Developer ID:', id);
  //     });
  //   });
  // }

  ngOnInit() {
    // Load selected developers from local storage
    const storedDevelopers = localStorage.getItem('selectedDevelopers');
    if (storedDevelopers) {
      this.selectedDevelopers = JSON.parse(storedDevelopers);
    }
  }

}
