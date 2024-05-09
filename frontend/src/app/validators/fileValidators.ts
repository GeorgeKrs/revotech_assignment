import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxFileSizeValidator(maxSizeInBytes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (file instanceof File && file.size > maxSizeInBytes) {
      return {
        maxSize: {
          valid: false,
          maxSize: maxSizeInBytes,
          actualSize: file.size,
        },
      };
    }

    return null;
  };
}
