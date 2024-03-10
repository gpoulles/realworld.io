import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesBaseComponent } from './articles-base.component';
import { of } from 'rxjs';
import { ARTICLESMOCK } from '../../mocks/articles.mocks';
import { ArticlesService } from '../../services/articles.service';
import { HttpClient } from '@angular/common/http';

describe('ArticlesBaseComponent', () => {
  let component: ArticlesBaseComponent;
  let fixture: ComponentFixture<ArticlesBaseComponent>;
  let mockArticlesService: jasmine.SpyObj<ArticlesService>;

  beforeEach(async () => {
    mockArticlesService = jasmine.createSpyObj('ArticlesService', [
      'getArticles',
    ]);
    mockArticlesService.getArticles.and.returnValue(of(ARTICLESMOCK));
    await TestBed.configureTestingModule({
      imports: [ArticlesBaseComponent],
      providers: [
        { provide: ArticlesService, useValue: mockArticlesService },
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
