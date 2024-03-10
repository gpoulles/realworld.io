import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaDataSnippetComponent } from './meta-data-snippet.component';

xdescribe('MetaDataSnippetComponent', () => {
  let component: MetaDataSnippetComponent;
  let fixture: ComponentFixture<MetaDataSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaDataSnippetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetaDataSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
