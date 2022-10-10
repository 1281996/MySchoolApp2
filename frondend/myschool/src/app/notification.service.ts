import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  successNotification(msg: any, user: any) {
    Swal.fire(user, msg, 'success');
  }
  errorNotification(msg: any, user: any) {
    Swal.fire(user, msg, 'error');
  }
}
