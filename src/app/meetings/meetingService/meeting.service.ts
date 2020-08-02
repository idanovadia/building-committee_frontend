import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  getMyMeetingsBehaviorSubject = new BehaviorSubject<any>([]);
  getMyGroupMembersBehaviorSubject = new BehaviorSubject<any>([]);
  addNewMeetingBehaviorSubject = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient, private router: Router) { }

  private getMeetingReq = (path) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(
      'https://building-committee-backend.herokuapp.com/appointments' + path, {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      // console.log(response);
      return JSON.parse(response);
    }), catchError((err: any) => {
      // console.log(err);
      return throwError(err);
    }));
  }

  private postMeetingReq = (path,body) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(
      'https://building-committee-backend.herokuapp.com/appointments' + path, body, {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      // console.log(response);
      return JSON.parse(response);
    }), catchError((err: any) => {
      // console.log(err);
      return throwError(err);
    }));
  }

  private delMeetingReq = (path,param) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set('meetingID', param);
    let responseType = 'text' as 'text';
    const options = {headers, params, responseType};
    return this.http.delete(
      'https://building-committee-backend.herokuapp.com/appointments' + path, options
    ).pipe(map((response: any) => {
      // console.log(response);
      return JSON.parse(response);
    }), catchError((err: any) => {
      // console.log(err);
      return throwError(err);
    }));
  }

  getMyMeetings = () => {
    this.getMeetingReq('/getMyAppointments').subscribe(data => {
      if(data.message === 'Successfully worked') {
        const appointments = data.appointments;
        console.log(appointments);
        this.getMyMeetingsBehaviorSubject.next(appointments);
      }
    },
    Error => {
      // alert(JSON.parse(Error.error).error);
    });
  }

  getGroupMembers = () => {
    this.getMeetingReq('/GroupMembers').subscribe(data => {
      if(data.message === 'Successfully worked') {
        const users = data.users;
        this.getMyGroupMembersBehaviorSubject.next(users);
      }
    },
    Error => {
      // alert(JSON.parse(Error.error).error);
    });
  }

  addNewMeeting = (meeting) => {
    this.postMeetingReq('/insertMeeting', meeting).subscribe(data => {
      if(data.message === 'Successfully worked'){
        alert(data.message);
      }
    },
    Error => {
      alert('Try Again Later');
    });
  }

  updateMeeting = (meeting) => {
    this.postMeetingReq('/updateMeeting', meeting).subscribe(data => {
      if(data.message === 'Successfully worked'){
        alert(data.message);
      }
    },
    Error => {
      alert('Try Again Later');
    });
  }

  deleteMeeting = (meetingID) => {
    this.delMeetingReq('/deleteMeeting', meetingID).subscribe(data => {
      if(data.message === 'Successfully worked'){
        alert(data.message);
      }
    },
    Error => {
      alert(Error);
    });
  }

}
