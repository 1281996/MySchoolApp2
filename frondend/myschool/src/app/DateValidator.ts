import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidator {
  static notificationDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let todayDateVal: Date = new Date();
      let pickDate = new Date(control.value);
      console.log(todayDateVal.getTime());
      console.log(pickDate.getTime());
      if (todayDateVal.getTime() >= pickDate.getTime()) {
        return { notificationDateRange: true };
      }
      return null;
    };
  }
}
