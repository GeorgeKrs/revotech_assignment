import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Island } from '../../interfaces/island';
import { IslandsService } from '../../services/islands.service';
import { ApiResponse } from '../../interfaces/apiResponse';
import { switchMap } from 'rxjs/operators';
import { maxFileSizeValidator } from '../../validators/fileValidators';
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
  updatingIsland: boolean = false;
  photoPreview!: string;
  readerResult!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private islandsService: IslandsService
  ) {
    this.islandForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      short_info: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [
        Validators.required,
        maxFileSizeValidator(5 * 1024 * 1024),
      ]),
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
          this.island = response.data;
          this.photoPreview = this.island.photo;

          this.islandForm.patchValue({
            title: this.island.title,
            short_info: this.island.short_info,
            description: this.island.description,
            photo: this.island.photo,
          });

          this.loading = false;
        },
        error: (error) => {
          if (error.status === 404) {
            this.router.navigate(['/not-found']);
          }

          this.loading = false;
        },
      });
  }

  openImageSelector(): void {
    document.getElementById('photo-upload')?.click();
  }

  handleImageChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      this.photoPreview = URL.createObjectURL(files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        this.readerResult = reader.result;
        this.islandForm.get('photo')!.setValue(files[0]);
      };
    }
  }

  photoHasChanged(): boolean {
    return this.island.photo !== this.islandForm.get('photo')!.value;
  }

  keepOriginalPhoto(): void {
    this.islandForm.get('photo')?.setValue(this.island.photo);
    this.photoPreview = this.island.photo;
  }

  submit(): void {
    if (this.islandForm.valid) {
      this.updatingIsland = true;

      this.islandForm.disable();

      this.islandForm.get('photo')!.setValue(this.readerResult);

      this.islandsService
        .update(this.island.objectId, {
          title: this.islandForm.get('title')!.value,
          short_info: this.islandForm.get('short_info')!.value,
          description: this.islandForm.get('description')!.value,
          photo: this.islandForm.get('photo')!.value,
        })
        .subscribe({
          next: () => {
            this.islandForm.enable();
            this.updatingIsland = false;
            this.redirectToShow();
          },
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
