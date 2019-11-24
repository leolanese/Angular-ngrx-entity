import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFooterComponent } from './header-footer.component';
import { Component, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { configureTestSuite } from 'ng-bullet';

describe('Validate HeaderFooterComponent', () => {
    let component: HeaderFooterComponent;
    let fixture: ComponentFixture<HeaderFooterComponent>;
    let debugElem: DebugElement;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderFooterComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should have class', () => {
        expect(fixture.nativeElement.querySelector('div').classList.value).toEqual('panel-heading');
    });

    it('should navigate', () => {
        component.value = 'test input';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('div h2').innerText).toEqual('test input');
    });

});
