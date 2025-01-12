import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoElemensPanelComponent } from './no-elements-panel.component';
import { By } from '@angular/platform-browser';

describe('NoElemensPanelComponent', () => {
  let component: NoElemensPanelComponent;
  let fixture: ComponentFixture<NoElemensPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoElemensPanelComponent], // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(NoElemensPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default message and icon', () => {
    const messageElement = fixture.debugElement.query(By.css('.empty-text')).nativeElement;
    const iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;

    expect(messageElement.textContent).toContain('No items found.');
    expect(iconElement.textContent).toContain('list');
  });  
});
