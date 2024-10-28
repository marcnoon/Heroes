import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeveloperService } from '../developer.service';
import { Developer } from '../developer';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-bio-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './bio-details.component.html',
  styleUrls: ['./bio-details.component.scss']
})
export class BioDetailsComponent implements OnInit {
  dev!: Developer;

  constructor(private route: ActivatedRoute, private devService: DeveloperService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.devService.getDeveloperById(id).subscribe(dev => {
        this.dev = dev!;
        console.log('BioDetailsComponent Current Developer ID:', id);
      });
    });
  }
}
