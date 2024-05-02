import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandIndexComponent } from './island-index.component';

describe('IslandIndexComponent', () => {
  let component: IslandIndexComponent;
  let fixture: ComponentFixture<IslandIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IslandIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslandIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
