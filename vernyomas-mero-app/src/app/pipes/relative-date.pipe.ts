import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';


@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date | string | Timestamp): string {
    if(value instanceof Timestamp) {
      value = (value as Timestamp).toDate();
    }
    const inputDate = value;
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
      case 0:
        return 'Ma';
      case -1:
        return 'Tegnap';
      case 1:
        return 'Holnap';
      default:
        return new Date(inputDate).toLocaleDateString('hu-HU');
    }
  }
}
