import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const URL = 'http://localhost:8080/myschool/';
@Injectable({
  providedIn: 'root',
})
export class MyschoolService {
  constructor(private http: HttpClient) {}
  public getUserData(id: any) {
    return this.http.get(URL + id);
  }
  public getAllUserData() {
    return this.http.get(URL);
  }
  public updateUser(update: any) {
    return this.http.put(URL, update);
  }
  acceptorReject(status: any, user: any) {
    return this.http.put(URL + 'accept/' + status, user);
  }
  createCircular(circular: any) {
    return this.http.post(URL + 'createCircular', circular);
  }
  getAlleCircular() {
    return this.http.get(URL + 'allCirculars');
  }
  acknowledge(circularId: any, acknowledgeObj: any) {
    return this.http.post(URL + 'acknowledge/' + circularId, acknowledgeObj);
  }
  getAllAcknowledgedetails() {
    return this.http.get(URL + 'allacknowledge');
  }
}