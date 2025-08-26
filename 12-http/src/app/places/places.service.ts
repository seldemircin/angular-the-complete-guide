import {inject, Injectable, signal} from '@angular/core';

import {Place} from './place.model';
import {HttpClient} from "@angular/common/http";
import {ErrorService} from '../shared/error.service';
import {catchError, map, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Failed to load available places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Failed to load user places').pipe(
      tap({
        next: places => this.userPlaces.set(places)
      })
    )
  }

  addPlaceToUserPlaces(place: Place) {

    if (this.userPlaces().some(p => p.id === place.id)) {
      this.errorService.showError('Place already added to user places.');
      throw new Error('Place already added to user places.');
    }

    const prevUserPlaces = [...this.userPlaces()];
    this.userPlaces.update(oldPlaces => [...oldPlaces, place])

    return this.httpClient.put('http://localhost:3000/user-places', {placeId: place.id})
      .pipe(
        catchError(error => {
          this.userPlaces.set(prevUserPlaces);
          this.errorService.showError('Failed to store selected place.');
          throw new Error('Failed to store selected place.')
        })
      )
  }

  removeUserPlace(place: Place) {
    const prevUserPlaces = [...this.userPlaces()];
    this.userPlaces.update(oldPlaces => oldPlaces.filter(p => p.id !== place.id));

    return this.httpClient.delete<{
      userPlaces: Place[];
    }>('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevUserPlaces);
          this.errorService.showError('Failed to remove place.');
          throw new Error('Failed to remove place.');
        })
      )
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url)
      .pipe(
        map((response) => response.places),
        catchError((error) => {
          console.log(error);
          throw new Error(errorMessage);
        })
      )
  }
}
