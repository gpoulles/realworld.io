import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritedArticlesComponent } from './favorited-articles.component';

xdescribe('FavoritedArticlesComponent', () => {
  let component: FavoritedArticlesComponent;
  let fixture: ComponentFixture<FavoritedArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritedArticlesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
