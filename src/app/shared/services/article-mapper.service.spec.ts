import { TestBed } from '@angular/core/testing';

import { ArticleMapperService } from './article-mapper.service';

describe('ArticleMapperService', () => {
  let service: ArticleMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
