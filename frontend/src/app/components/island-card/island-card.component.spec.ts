import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandCardComponent } from './island-card.component';

describe('IslandCardComponent', () => {
  let component: IslandCardComponent;
  let fixture: ComponentFixture<IslandCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IslandCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
