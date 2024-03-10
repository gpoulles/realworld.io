import { TestBed } from '@angular/core/testing';

import { ArticleMapperService } from './article-mapper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ArticleMapperService', () => {
  let service: ArticleMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    service = TestBed.inject(ArticleMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
