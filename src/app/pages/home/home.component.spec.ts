import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TagsService } from '../../shared/services/tags.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ArticlesService } from '../../shared/services/articles.service';
import { ARTICLESMOCK } from '../../shared/mocks/articles.mocks';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockTagsService: jasmine.SpyObj<TagsService>;
  let mockArticlesService: jasmine.SpyObj<ArticlesService>;

  beforeEach(async () => {
    mockTagsService = jasmine.createSpyObj('TagsService', ['getTags']);
    mockTagsService.getTags.and.returnValue(of(['tag1', 'tag2']));
    mockArticlesService = jasmine.createSpyObj('ArticlesService', [
      'getArticles',
    ]);
    mockArticlesService.getArticles.and.returnValue(of(ARTICLESMOCK));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: TagsService, useValue: mockTagsService },
        { provide: ArticlesService, useValue: mockArticlesService },
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(convertToParamMap({})),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tags successfully', () => {
    fixture.detectChanges();
    component.loadTags();
    expect(mockTagsService.getTags).toHaveBeenCalled();
    expect(component.loadingTags).toBeFalse();
    expect(component.tagsResponse).toEqual(['tag1', 'tag2']);
  });

  describe('loading articles', () => {
    beforeEach(() => {
      component.loadArticles({ offset: 0 });
    });

    it('should call getArticles on service', () => {
      expect(mockArticlesService.getArticles).toHaveBeenCalled();
    });

    it('should set loadingArticles to false', () => {
      expect(component.loadingArticles).toBeFalse();
    });

    it('should update articlesResponse correctly', () => {
      expect(component.articlesResponse).toEqual(ARTICLESMOCK);
    });
  });

  describe('pagination', () => {
    it('should show correct amount of pages', () => {
      component.loadArticles({ offset: 0 });
      expect(component.getTotalPages()).toEqual(26);
    });
  });
});
