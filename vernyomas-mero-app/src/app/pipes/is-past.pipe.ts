import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPast'
})
export class IsPastPipe implements PipeTransform {
  transform(date: Date | string): boolean {
    const now = new Date();
    const input = new Date(date);
    return input.getTime() < now.getTime();
  }
}
