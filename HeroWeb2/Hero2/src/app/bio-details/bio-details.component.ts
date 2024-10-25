  import { CommonModule } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { Developer } from '../developer';
  import { DeveloperService } from '../developer.service';

  @Component({
    selector: 'app-bio-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './bio-details.component.html',
    styleUrl: './bio-details.component.scss'
  })
  export class BioDetailsComponent {

    dev: Developer | undefined;
    id!: string;

    constructor(private devService: DeveloperService, private route: ActivatedRoute) {}

    ngOnInit() {
      console.log('BioDetailsComponent ngOnInit');
      this.id = this.route.snapshot.paramMap.get('id')!;
      this.loadDeveloper();
    }

    loadDeveloper() {
      this.dev = this.devService.getDeveloperById(parseInt(this.id));
    }

  }
