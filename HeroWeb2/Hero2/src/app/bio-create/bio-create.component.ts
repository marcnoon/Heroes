import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeveloperService } from '../developer.service';
import { Developer } from '../developer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bio-create',
  templateUrl: './bio-create.component.html',
  styleUrls: ['./bio-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] // Import ReactiveFormsModule here
})
export class BioCreateComponent implements OnInit {
  developerForm: FormGroup;
  currentYear: number = new Date().getFullYear(); // Define current year

  constructor(private fb: FormBuilder, private devService: DeveloperService) {
    this.developerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      favoriteLanguage: ['', Validators.required],
      yearStarted: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.developerForm.valid) {
      const newDeveloper: Developer = this.developerForm.value;
      this.devService.addDeveloper(newDeveloper).subscribe(() => {
        // Handle successful addition, e.g., navigate to another page or show a success message
        console.log('Developer added successfully');
      });
    }
  }
}