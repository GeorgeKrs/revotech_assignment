import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  constructor() {}

  openInGoogleMaps(
    islandName: string,
    longitude: number,
    latitude: number,
    zoom: number = 10
  ): void {
    // window.open(
    //   `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`,
    //   '_blank'
    // );

    window.open(
      `https://www.google.com/maps/place/${islandName}/@${latitude},${longitude},${zoom}z`,
      '_blank'
    );
  }
}
