import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    const inputDate = new Date(value);
    const today = new Date();

    // Másolatok, hogy ne módosítsuk az eredeti példányokat
    const inputDateMidnight = new Date(inputDate);
    inputDateMidnight.setHours(0, 0, 0, 0);

    const todayMidnight = new Date(today);
    todayMidnight.setHours(0, 0, 0, 0);

    // Különbség napokban
    const diffInMs = inputDateMidnight.getTime() - todayMidnight.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    switch (diffInDays) {
      case 0: return 'Ma';
      case -1: return 'Tegnap';
      case 1: return 'Holnap';
      default: return inputDate.toLocaleDateString('hu-HU');
    }
  }
}
