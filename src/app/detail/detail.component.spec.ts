import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { configureTestSuite } from 'ng-bullet';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NameService } from "../name.service";
import { Store, StoreModule } from "@ngrx/store";
import * as reducers from "../../entities/ngrx/reducer";

describe('Validate DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let router: Router;
  let nameService: NameService;
  let store: Store<reducers.HeroState>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
        StoreModule.forFeature('heroReducer', reducers.getSelectedHero),
        FormsModule
      ],
      providers: [
       { provide: NameService, useValue: {} }
      ],
    declarations: [DetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });
});

beforeEach(() => {
   fixture = TestBed.createComponent(DetailComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate onGoBack', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.onGoBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/heroes']);
  });

  it('should navigate onSave', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.onGoBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/heroes']);
  });

  it('should navigate onSave', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.onGoBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/heroes']);
  });

  it('should store get dispatch triggered', () => {
    store = TestBed.get(Store);
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onSave();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalled();
  });

});
