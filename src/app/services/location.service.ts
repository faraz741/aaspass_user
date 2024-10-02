import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getCurrentLocation(): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = { lat, lng };
              resolve(location);
            } else {
              reject('Position is null.');
            }
          },
          (error) => {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                reject('User denied the request for Geolocation.');
                break;
              case error.POSITION_UNAVAILABLE:
                reject('Location information is unavailable.');
                break;
              case error.TIMEOUT:
                reject('The request to get user location timed out.');
                break;
              default:
                reject('An unknown error occurred.');
                break;
            }
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}

