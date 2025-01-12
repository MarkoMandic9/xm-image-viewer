import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { Component, input, output } from '@angular/core';
import { ImageGridComponent } from '../../component/image-grid/image-grid.component';

@Component({
  selector: 'app-image-grid-item',
  template: '',
})
class MockImageGridItemComponent {
  readonly imageData = input();
  readonly addToFavoritesEnabled = input(false);
  readonly imageClick = output<string>();
}

@Component({
  selector: 'app-no-elements-panel',
  template: '',
})
class MockNoElementsPanelComponent {}

describe('ImageGridComponent', () => {
  let component: ImageGridComponent;
  let fixture: ComponentFixture<ImageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule, ImageGridComponent, MockImageGridItemComponent, MockNoElementsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGridComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display no-elements-panel when imagesMetaData is empty and loading is false', () => {
    fixture.componentRef.setInput('imagesMetaData', []);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const noElementsPanel = fixture.debugElement.query(By.css('app-no-elements-panel'));
    expect(noElementsPanel).toBeTruthy();

    const gridContainer = fixture.debugElement.query(By.css('.grid-container'));
    expect(gridContainer).toBeNull();
  });

  it('should emit imageClick event when an image grid item is clicked', () => {
    fixture.componentRef.setInput('imagesMetaData', [
        { id: '1', name: 'Image 1' },
    ]);
    fixture.componentRef.setInput('loading', false);

    spyOn(component.imageClick, 'emit');
    fixture.detectChanges();

    const gridItem = fixture.debugElement.query(By.css('app-image-grid-item'));
    gridItem.triggerEventHandler('imageClick', '1');

    expect(component.imageClick.emit).toHaveBeenCalledWith('1');
  });
});