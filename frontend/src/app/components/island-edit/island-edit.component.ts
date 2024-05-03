import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Island } from '../../interfaces/island';
import { IslandsService } from '../../services/islands.service';
import { GoogleService } from '../../services/google.service';
import { ApiResponse } from '../../interfaces/apiResponse';
import { switchMap } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-island-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './island-edit.component.html',
  styleUrl: './island-edit.component.css',
})
export class IslandEditComponent implements OnInit {
  islandForm: FormGroup;
  island!: Island;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private islandsService: IslandsService,
    private googleService: GoogleService,
    private formBuilder: FormBuilder
  ) {
    this.islandForm = new FormGroup({
      title: new FormControl(''), // Ensure it's a FormControl, not a string
      short_info: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.islandForm = this.formBuilder.group({
      title: ['', Validators.required],
      short_info: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.route.paramMap
      .pipe(
        switchMap(() =>
          this.islandsService.get(this.route.snapshot.paramMap.get('id') ?? '')
        )
      )
      .subscribe({
        next: (response: ApiResponse) => {
          if (response.status === 200 && response.data) {
            this.island = response.data;

            this.islandForm.patchValue({
              title: this.island.title,
              short_info: this.island.short_info,
              description: this.island.description,
            });

            this.loading = false;
            return;
          }

          if (response.status === 404) {
            this.router.navigate(['/not-found']);
          }
        },
        error: (error) => {
          this.loading = false;
          console.log('Error fetching island', error);
        },
      });
  }

  submit(): void {
    console.log(this.islandForm.value);
    // if (this.form.valid) {
    //   console.log('Form data:', this.form.value);
    // }
  }

  goToIndex(): void {
    this.router.navigate(['/']);
  }

  openGoogleMaps(): void {
    this.googleService.openInGoogleMaps(
      this.island.location[0],
      this.island.location[1]
    );
  }
}
