import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  constructor() {}

  openInGoogleMaps(
    longitude: number,
    latitude: number,
    zoom: number = 10
  ): void {
    window.open(
      `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`,
      '_blank'
    );
  }
}
