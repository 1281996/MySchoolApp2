import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const URL = 'http://localhost:8080/myschool/';
//const URL =
//'https://8t581dm299.execute-api.us-east-1.amazonaws.com/prod/myschool/';
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
  createCircular(circular: any, email: any) {
    return this.http.post(URL + 'createCircular/' + email, circular);
  }
  getAlleCircular(email: any) {
    return this.http.get(URL + 'allCirculars/' + email);
  }
  acknowledge(circularId: any, acknowledgeObj: any) {
    return this.http.post(URL + 'acknowledge/' + circularId, acknowledgeObj);
  }
  getAllAcknowledgedetails() {
    return this.http.get(URL + 'allacknowledge');
  }
}
