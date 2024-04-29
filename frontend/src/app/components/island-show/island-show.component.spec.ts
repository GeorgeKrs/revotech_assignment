import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandShowComponent } from './island-show.component';

describe('IslandShowComponent', () => {
  let component: IslandShowComponent;
  let fixture: ComponentFixture<IslandShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IslandShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslandShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
