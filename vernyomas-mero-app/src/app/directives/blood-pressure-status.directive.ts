import { Directive, ElementRef, Renderer2, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appBloodPressureStatus]'
})
export class BloodPressureStatusDirective implements OnChanges {
  @Input() systolic!: number;
  @Input() diastolic!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.setColor();
  }

  private setColor(): void {
    if (this.systolic && this.diastolic) {
      if (this.systolic >= 120 && this.systolic <= 129 && this.diastolic < 80) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'green');
        this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
      } else if (
        (this.systolic > 129 && this.systolic <= 139) ||
        (this.diastolic >= 80 && this.diastolic < 90)
      ) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
        this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
        this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
      }
    }
  }
}
