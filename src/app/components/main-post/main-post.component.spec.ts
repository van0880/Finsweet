import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPostComponent } from './main-post.component';

describe('MainPostComponent', () => {
  let component: MainPostComponent;
  let fixture: ComponentFixture<MainPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
