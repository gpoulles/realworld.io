import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesBaseComponent } from './articles-base.component';

describe('ArticlesBaseComponent', () => {
  let component: ArticlesBaseComponent;
  let fixture: ComponentFixture<ArticlesBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
