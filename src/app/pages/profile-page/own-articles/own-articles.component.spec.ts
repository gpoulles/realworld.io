import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnArticlesComponent } from './own-articles.component';

describe('OwnArticlesComponent', () => {
  let component: OwnArticlesComponent;
  let fixture: ComponentFixture<OwnArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnArticlesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
