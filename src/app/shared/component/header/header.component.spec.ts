import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header.component';
import { provideRouter, Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatToolbarModule,
        MatIconModule,
      ],
      providers: [
        provideRouter([
          { path: '', component: HeaderComponent },
          { path: 'favorites', component: HeaderComponent },
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Photos and Favorites navigation items', () => {
    const navItems = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(navItems.length).toBe(2);

    const photosNavItem = navItems[0].query(By.css('span')).nativeElement.textContent.trim();
    const favoritesNavItem = navItems[1].query(By.css('span')).nativeElement.textContent.trim();

    expect(photosNavItem).toBe('Photos');
    expect(favoritesNavItem).toBe('Favorites');
  });

  it('should apply active class to Photos when the route is "/"', async () => {
    const router = TestBed.inject(Router);
    await router.navigate(['/']);
    fixture.detectChanges();

    const activeItem = fixture.debugElement.query(By.css('.active-item.photos'));
    expect(activeItem).toBeTruthy();
  });

  it('should apply active class to Favorites when the route is "/favorites"', async () => {
    const router = TestBed.inject(Router);
    await router.navigate(['/favorites']);
    fixture.detectChanges();

    const activeItem = fixture.debugElement.query(By.css('.active-item.favorite'));
    expect(activeItem).toBeTruthy();
  });
});