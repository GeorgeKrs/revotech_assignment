import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandEditComponent } from './island-edit.component';

describe('IslandEditComponent', () => {
  let component: IslandEditComponent;
  let fixture: ComponentFixture<IslandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IslandEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
