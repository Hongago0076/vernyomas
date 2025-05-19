import { Pipe, PipeTransform } from '@angular/core';
import {Timestamp} from '@angular/fire/firestore';

@Pipe({
  name: 'isPast'
})
export class IsPastPipe implements PipeTransform {
  transform(date: Date | string | Timestamp): boolean {
    const now = new Date();
    if(date instanceof Timestamp) {
      date = (date as Timestamp).toDate();
    }
    const input = new Date(date);
    return input.getTime() < now.getTime();
  }
}
