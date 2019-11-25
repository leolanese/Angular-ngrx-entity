import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsComponent } from './elements.component';
import { Component, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { configureTestSuite } from 'ng-bullet';
import { NameService } from "../name.service";
import { Store, StoreModule} from "@ngrx/store";
import * as reducers from "../../entities/ngrx/reducer";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import {heroReducer} from "../../entities/ngrx/reducer";

describe('Validate HeaderFooterComponent', () => {
    let component: ElementsComponent;
    let fixture: ComponentFixture<ElementsComponent>;
    let debugElem: DebugElement;
    let nameService: NameService;
    let store: Store<reducers.HeroState>;
    let router: Router;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [ElementsComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                StoreModule.forRoot(heroReducer),
                StoreModule.forFeature('names', reducers.getSelectedHero)
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: NameService, useValue: {} }
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ElementsComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        fixture.detectChanges();
    });

    it('should HeaderFooterComponent create component', () => {
        expect(component).toBeTruthy();
    });

    it('should HeaderFooterComponent have class', () => {
        expect(fixture.nativeElement.querySelector('container')).toBeDefined();
    });



});
