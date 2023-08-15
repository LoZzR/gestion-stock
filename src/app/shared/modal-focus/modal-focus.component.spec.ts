import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalFocus } from './modal-focus.component';

describe('NgbdModalConfirmComponent', () => {
  let component: NgbdModalFocus;
  let fixture: ComponentFixture<NgbdModalFocus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbdModalFocus ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgbdModalFocus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
