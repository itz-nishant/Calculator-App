import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the calculator component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a digit when a digit button is clicked', () => {
    component.appendToDisplay('1');
    fixture.detectChanges();
    const displayValue = fixture.nativeElement.querySelector('.display').textContent;
    expect(displayValue).toContain('1');
  });

  it('should perform addition when the addition button is clicked', () => {
    component.appendToDisplay('5');
    component.add();
    component.appendToDisplay('3');
    component.calculate();
    fixture.detectChanges();
    const displayValue = fixture.nativeElement.querySelector('.display').textContent;
    expect(displayValue).toContain('8');
  });

  it('should clear the display when the clear button is clicked', () => {
    component.appendToDisplay('9');
    component.clear();
    fixture.detectChanges();
    const displayValue = fixture.nativeElement.querySelector('.display').textContent;
    expect(displayValue).toBe('');
  });

  it('should handle decimal points correctly', () => {
    component.appendToDisplay('3');
    component.appendToDisplay('.');
    component.appendToDisplay('1');
    fixture.detectChanges();
    const displayValue = fixture.nativeElement.querySelector('.display').textContent;
    expect(displayValue).toBe('3.1');
  });

  it('should perform subtraction when the subtraction button is clicked', () => {
    component.appendToDisplay('8');
    component.subtract();
    component.appendToDisplay('4');
    component.calculate();
    fixture.detectChanges();
    const displayValue = fixture.nativeElement.querySelector('.display').textContent;
    expect(displayValue).toContain('4');
  });
});
