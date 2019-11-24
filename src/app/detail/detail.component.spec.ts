import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { configureTestSuite } from 'ng-bullet';

fdescribe('Validate DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let router: Router;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [DetailComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create component', () => {
    debugger
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.onGoBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/expectedUrl']);
});


});
