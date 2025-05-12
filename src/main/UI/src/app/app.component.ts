import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  private baseURL: string = 'http://localhost:8080';
  private getUrl: string = this.baseURL + '/room/reservation/v1/';
  private postUrl: string = this.baseURL + '/room/reservation/v1';

  public submitted!: boolean;
  roomsearch!: FormGroup;
  rooms!: Room[];
  request!: ReserveRoomRequest;
  currentCheckInVal!: string;
  currentCheckOutVal!: string;

  welcomeMessages: string[] = [];
  times: any = {};

  // Predefined input time for conversion (Eastern Time)
  private predefinedTimeET: string = "12:30"; // Input time in HH:mm format

  ngOnInit() {
    // Initialize the room search form
    this.roomsearch = new FormGroup({
      checkin: new FormControl(' '),
      checkout: new FormControl(' ')
    });

    // Fetch welcome messages
    this.httpClient.get<string[]>(this.baseURL + '/welcome').subscribe(
      messages => {
        this.welcomeMessages = messages;
        console.log('Welcome messages:', messages); // Log the messages for debugging
      },
      error => {
        console.error('Error fetching welcome messages:', error); // Log any error
      }
    );

    // Fetch converted times based on the predefined input time
    this.fetchConvertedTimes();

    // Subscribe to the form changes
    const roomsearchValueChanges$ = this.roomsearch.valueChanges;
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });
  }

  // Method to fetch converted times
  private fetchConvertedTimes() {
    this.httpClient.get<any>(`${this.baseURL}/api/time/converted?time=${this.predefinedTimeET}`).subscribe(
      data => {
        this.times = data;
        console.log('Converted Time Data:', data);
      },
      error => {
        console.error('Error fetching converted time data:', error);
      }
    );
  }

  onSubmit({ value, valid }: { value: Roomsearch, valid: boolean }) {
    this.getAll().subscribe(
      rooms => { console.log(Object.values(rooms)[0]); this.rooms = <Room[]>Object.values(rooms)[0]; }
    );
  }

  reserveRoom(value: string) {
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
    this.createReservation(this.request);
  }

  createReservation(body: ReserveRoomRequest) {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new HttpHeaders().append('Content-Type', 'application/json'); // Set content type to JSON

    this.httpClient.post(this.postUrl, body, { headers })
      .subscribe(res => console.log(res));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal, { responseType: 'json' });
  }
}

// Interfaces
export interface Roomsearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  price: string;
  links: string;
}

export class ReserveRoomRequest {
  roomId: string;
  checkin: string;
  checkout: string;

  constructor(roomId: string, checkin: string, checkout: string) {
    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}
