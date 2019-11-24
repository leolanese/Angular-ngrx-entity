import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IbanSearchOfficeResultsSectionComponent } from './iban-search-office-results-section.component';
import { CardExpansionPanelModule } from '../../../../../app/shared/components/card/card-expansion/card-expansion-panel.module';
import { LabelValueModule } from '../../../../../app/shared/components/label-value/label-value.module';
import { ibanOfficeMock } from '../../mocks/iban-search.mocks';
import { configureTestSuite } from 'ng-bullet';

describe('IbanSearchOfficeResultsSectionComponent', () => {
  let component: IbanSearchOfficeResultsSectionComponent;
  let fixture: ComponentFixture<IbanSearchOfficeResultsSectionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [CardExpansionPanelModule, LabelValueModule],
      declarations: [IbanSearchOfficeResultsSectionComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IbanSearchOfficeResultsSectionComponent);
    component = fixture.componentInstance;
    component.offices = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define member variables', () => {
    component.offices = [];
    expect(component.offices).toBeTruthy();
  });

  it('should return true if the office has more than 1 offices', () => {
    const offices = [ibanOfficeMock, ibanOfficeMock];
    expect(component.hasBranches(offices)).toBe(true);
  });

  it('should return false if the office has 1 office', () => {
    const offices = [ibanOfficeMock];
    expect(component.hasBranches(offices)).toBe(false);
  });

  it('should return false if the office has no office', () => {
    const offices = [];
    expect(component.hasBranches(offices)).toBe(false);
  });

  describe('Expansion link text', () => {
    // The first office is used in the main card, so extra offices are 2 or more

    it('should return expanded text when the panel is expanded', () => {
      expect(component.getExpansionLabelText(2, true)).toBe(component.EXPANDED_TEXT);
    });

    it('should return single office collapsed text when the panel is collapsed', () => {
      expect(component.getExpansionLabelText(1, false)).toBe(
        component.COLLAPSED_SINGLE_OFFICE_TEXT
      );
      expect(component.getExpansionLabelText(2, false)).toBe(
        component.COLLAPSED_SINGLE_OFFICE_TEXT
      );
    });

    it('should return multiple office collapsed text when the panel is collapsed', () => {
      expect(component.getExpansionLabelText(3, false)).toBe(
        component.COLLAPSED_MULTIPLE_OFFICE_TEXT.replace('{location_count}', '2')
      );
    });
  });

  it('should return a qaid for the expansion panel', () => {
    expect(component.getExpansionPanelQaId(1)).toBe(component.SECTION_QAID + '2');
    expect(component.getExpansionPanelQaId(2)).toBe(component.SECTION_QAID + '3');
    expect(component.getExpansionPanelQaId(null)).toBe('');
  });

  it('should call onExpansionChange', () => {
    spyOn(component, 'getExpansionLabelText');
    component.onExpansionChange(true);
    expect(component.getExpansionLabelText).toHaveBeenCalledTimes(1);
  });
});
