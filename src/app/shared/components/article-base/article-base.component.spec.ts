import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBaseComponent } from './article-base.component';

xdescribe('ArticleBaseComponent', () => {
  let component: ArticleBaseComponent;
  let fixture: ComponentFixture<ArticleBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
