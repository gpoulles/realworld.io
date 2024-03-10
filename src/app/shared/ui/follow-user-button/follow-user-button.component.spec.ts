import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUserButtonComponent } from './follow-user-button.component';

xdescribe('FollowUserButtonComponent', () => {
  let component: FollowUserButtonComponent;
  let fixture: ComponentFixture<FollowUserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowUserButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowUserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
