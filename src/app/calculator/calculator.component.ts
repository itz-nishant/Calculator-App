import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  displayValue = '0';
  private previousResult = '';
  private maxLength = 15;
  private operatorClicked = false;


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const key = event.key;

    if (key === 'Enter') {
      this.calculate();
    } else if (key === 'Escape') {
      this.clear();
    } else if (key === 'Backspace') {
      this.backspace();
    } else if (/^[0-9]$/.test(key)) {
      this.appendToDisplay(key);
    } else if (key === '.') {
      this.appendToDisplay('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.appendToDisplay(key);
    } else if (key === '(') {
      this.appendToDisplay('(');
    } else if (key === ')') {
      this.appendToDisplay(')');
    }
  }

  appendToDisplay(value: string): void {
    if (this.displayValue === '0' && /^[0-9]$/.test(value)) {
      this.displayValue = value;
    } else if (this.displayValue.length < this.maxLength) {
      const lastChar = this.displayValue.charAt(this.displayValue.length - 1);
      if (lastChar === '.' && value === '.') {
        return;
      }
      if (value === ')' && this.parenthesesCount(this.displayValue) <= 0) {
        return;
      }
      this.displayValue += value;
      this.operatorClicked = false;
    }
  }
  

  calculate(): void {
    if (this.displayValue !== '') {
      try {
        this.previousResult = this.displayValue;
        this.displayValue = this.evaluateExpression(this.displayValue);
      } catch (error) {
        this.displayValue = 'Error';
      }
    }
  }
  
  clear(): void {
    this.displayValue = '0';
  }

  add(): void {
    if (!this.operatorClicked) {
      this.appendToDisplay('+');
      this.operatorClicked = true;
    }
  }
  
  subtract(): void {
    if (!this.operatorClicked) {
      this.appendToDisplay('-');
      this.operatorClicked = true;
    }
  }
  
  multiply(): void {
    if (!this.operatorClicked) {
      this.appendToDisplay('*');
      this.operatorClicked = true;
    }
  }
  
  divide(): void {
    if (!this.operatorClicked) {
      this.appendToDisplay('/');
      this.operatorClicked = true;
    }
  }
  

  backspace(): void {
    this.displayValue = this.displayValue.slice(0, -1);
  }

  usePreviousResult(): void {
    if (this.previousResult !== '') {
      this.appendToDisplay(this.previousResult);
    }
  }

  private evaluateExpression(expression: string): string {
    const safeEval = new Function('return ' + expression);
    try {
      const result = safeEval();
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }

  private parenthesesCount(expression: string): number {
    const openParentheses = expression.match(/\(/g);
    const closeParentheses = expression.match(/\)/g);
    const openCount = openParentheses ? openParentheses.length : 0;
    const closeCount = closeParentheses ? closeParentheses.length : 0;
    return openCount - closeCount;
  }
}
