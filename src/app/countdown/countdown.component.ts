import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { TextFitService } from '../service/resizeText.service'
import {
  calculateTimeDifference,
  formatTimeDifference,
} from '../utils/date-utils'

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    yearA11yLabel: 'YYYY',
  },
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy, AfterViewInit {
  eventName: string = ''
  endDate: string = ''
  countdownForm: FormGroup
  remainingTime: string = ''
  private formSubscription: Subscription | null = null

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private textFitService: TextFitService,
  ) {
    this.countdownForm = this.fb.group({
      eventName: [''],
      endDate: [new Date().toISOString().slice(0, -1)],
    })
  }

  ngOnInit() {
    const savedEventName = localStorage.getItem('eventName')
    const savedEndDate = localStorage.getItem('endDate')

    if (savedEventName) {
      this.countdownForm.get('eventName')?.setValue(savedEventName)
    }

    if (savedEndDate) {
      this.countdownForm.get('endDate')?.setValue(new Date(savedEndDate))
    }

    this.updateRemainingTime()

    this.formSubscription = this.countdownForm.valueChanges.subscribe(
      (values) => {
        localStorage.setItem('eventName', values.eventName)
        localStorage.setItem('endDate', values.endDate)
        this.fitText()
      },
    )

    setInterval(() => this.updateRemainingTime(), 1000)
  }

  ngAfterViewInit() {
    this.fitText()
  }

  @HostListener('window:resize')
  onResize() {
    this.fitText()
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe()
    }
  }

  updateRemainingTime() {
    const endDate = new Date(this.countdownForm.get('endDate')?.value)
    const timeDiff = calculateTimeDifference(endDate)

    this.remainingTime =
      timeDiff < 0 ? 'The event has passed.' : formatTimeDifference(timeDiff)

    this.fitText()
  }

  fitText() {
    const elementsToFit = ['.title', '.countdown']

    elementsToFit.forEach((selector) => {
      const element = this.el.nativeElement.querySelector(selector)
      if (element) {
        this.textFitService.fitTextToElement(element)
      }
    })
  }
}
