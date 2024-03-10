import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
