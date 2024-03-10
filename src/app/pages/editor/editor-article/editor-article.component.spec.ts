import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorArticleComponent } from './editor-article.component';
import { ArticlesService } from '../../../shared/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';

xdescribe('EditorArticleComponent', () => {
  let component: EditorArticleComponent;
  let fixture: ComponentFixture<EditorArticleComponent>;
  let mockArticlesService: jasmine.SpyObj<ArticlesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockArticlesService = jasmine.createSpyObj('ArticlesService', [
      'updateArticle',
    ]);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditorArticleComponent],
      providers: [
        { provide: ArticlesService, useValue: mockArticlesService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
