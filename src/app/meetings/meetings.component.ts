import { AuthGuard } from './../auth/auth.guard';
import { AddPaymentService } from './../charges/add-payment/addPaymentService/add-payment.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MeetingService } from './meetingService/meeting.service';
import { ChargesComponent } from './../charges/charges.component';
import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setHours, setMinutes, } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  members = [];
  activeDayIsOpen = true;
  form: FormGroup;
  newEventObjective = '';
  currentEvent: CalendarEvent<any>;
  showEventDetails = false;
  constructor(private authGuard:AuthGuard, private modal: NgbModal, private meetingService: MeetingService,
              private _formBuilder: FormBuilder, private addPaymentService: AddPaymentService,
              public dialog: MatDialog) {

    this.form = this._formBuilder.group({
      startDate: [{ value: '', disabled: true }, Validators.required],
      endDate: [{ value: '', disabled: true }, Validators.required],
      selectedMember: [{ value: '', disabled: true }, Validators.required],
      objective: [{ value: '', disabled: true }, Validators.required],
      checkArray: this._formBuilder.array([])
    });

  }

  ngOnInit(): void {
    this.getMyMeetings();

    this.form.get('startDate').setValue(new Date()),
    this.form.get('endDate').setValue(new Date()),
    this.form.get('startDate').enable();
    this.form.get('endDate').enable();
    this.form.get('selectedMember').enable();
    this.form.get('objective').enable();

    this.addPaymentService.membersSubject.subscribe(data => {
      this.members = [];
      data.forEach(element => {
        this.members.push(element.userName);
      });
      this.click_month_btn();
    },
    Error => {
    });

    this.addPaymentService.getMembers();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.currentEvent = event;
    this.showEventDetails = true;
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  updateEvent(event){
    this.meetingService.updateMeeting({meeting: event});
    
  }

  addEvent(event): void {
    this.events = [
      ...this.events,
      {
        id: event.appointmentsID,
        title: event.objective,
        start: addHours(startOfDay(new Date(event.start_date)), new Date(event.start_date).getHours()),
        end: addHours(startOfDay(new Date (event.end_date)), new Date (event.end_date).getHours()),
        color: colors.red,
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  addNewEvent() {
    // addEvent(event)
    const formValues = this.form.value;
    if (new Date(formValues.endDate) > new Date(formValues.startDate)) {
      this.addNewMeeting({
        start_date: formValues.startDate,
        end_date: formValues.endDate,
        objective: formValues.objective,
        participants: formValues.checkArray,
      });
    } else {
      alert('End event must be after start event');
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.showEventDetails = false;
  }

  delEvent(){
    this.meetingService.deleteMeeting(this.currentEvent.id);
    this.deleteEvent(this.currentEvent);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  click_month_btn(){
    let btn_element: HTMLElement = document.getElementsByClassName('month_btn')[0] as HTMLElement;
    btn_element.click();
  }

  getMyMeetings() {
    this.meetingService.getMyMeetingsBehaviorSubject.subscribe(data => {
      if (data.length !== 0 ) {
        this.events  = [];
        data.forEach(element => {
          this.addEvent(element);
        });
        this.click_month_btn();
      }
    },
    Error => {
    });
    this.meetingService.getMyMeetings();
  }

  addNewMeeting(meeting: any) {
    this.meetingService.addNewMeetingBehaviorSubject.subscribe(data => {
      if (data.length !== 0 ) {

      }
    },
    Error => {
    });
    this.meetingService.addNewMeeting(meeting);
  }

  getRule() {
    if (this.authGuard.getRole() === 'manager'){
      return true;
    } else {
      return false;
    }
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
