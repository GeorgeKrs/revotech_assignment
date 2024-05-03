import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Island } from '../../interfaces/island';
import { IslandsService } from '../../services/islands.service';
import { ApiResponse } from '../../interfaces/apiResponse';
import { switchMap } from 'rxjs/operators';
import {
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
    private islandsService: IslandsService
  ) {
    this.islandForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      short_info: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
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
    if (this.islandForm.valid) {
      this.loading = true;

      this.islandsService
        .update(this.island.objectId, {
          title: this.islandForm.get('title')!.value,
          short_info: this.islandForm.get('short_info')!.value,
          description: this.islandForm.get('description')!.value,
        })
        .subscribe({
          next: () => console.log('Island updated successfully'),
          error: (err) => console.error('Error updating island:', err),
        });
    }
  }

  redirectToIndex(): void {
    this.islandsService.redirectToIndex();
  }

  redirectToShow(): void {
    this.islandsService.redirectToShow(this.island.objectId);
  }
}
