import { TestBed } from '@angular/core/testing';

import { HttpClientProviderService } from './http-client-provider.service';

describe('HttpClientProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpClientProviderService = TestBed.get(HttpClientProviderService);
    expect(service).toBeTruthy();
  });
});
