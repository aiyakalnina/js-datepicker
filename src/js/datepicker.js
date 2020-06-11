import { CalendarMonth } from './calendar-month.js';
import { CalendarMonthView } from './calendar-month-view.js';
import { eventEmitter } from './event-emitter.js';

class DatePicker {
  constructor(id) {
    this.dateInput = document.getElementById(id);
    this.today = new Date();
    this.currentMonthIndex = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
  }

  createCalendarHtml() {
    let calendarHtml = document.createElement('div');
    calendarHtml.classList.add('datepicker__calendar', 'is-hidden');
    let calendarMonthWrap = document.createElement('div');
    calendarMonthWrap.classList.add('datepicker__calendar-month-wrap');
    let datepickerNav = document.createElement('div');
    datepickerNav.classList.add('datepicker__nav');
    let buttonPrev = document.createElement('button');
    buttonPrev.classList.add('datepicker__nav-prev');
    buttonPrev.setAttribute.type = 'button';
    buttonPrev.textContent = "Prev";
    datepickerNav.appendChild(buttonPrev);
    let buttonNext = document.createElement('button');
    buttonNext.classList.add('datepicker__nav-next');
    buttonNext.setAttribute.type = 'button';
    buttonNext.textContent = "Next";
    datepickerNav.appendChild(buttonNext);
    calendarHtml.appendChild(datepickerNav);
    calendarHtml.appendChild(calendarMonthWrap);

    let currentMonthIndex = this.currentMonthIndex;
    let currentYear = this.currentYear;
    let today = this.today;

    addNewMonthViewToCalendar();

    function addNewMonthViewToCalendar() {
      let month = new CalendarMonth(currentYear, currentMonthIndex, today);
      let newMonthView = new CalendarMonthView(month);
      let calendarMonth = calendarMonthWrap.querySelector('.datepicker__calendar-month');

      if (calendarMonth) {
        calendarMonthWrap.querySelector('.datepicker__calendar-month').remove();
      }

      calendarMonthWrap.appendChild(newMonthView.createCalendarMonthHtml());
    }

    function changeMonth(value) {
      currentMonthIndex = currentMonthIndex + value;

      if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
      }

      if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear++;
      }

      addNewMonthViewToCalendar();
    }

    buttonPrev.addEventListener('click', function () {
      changeMonth(-1);
    });

    buttonNext.addEventListener('click', function () {
      changeMonth(1);
    });

    return calendarHtml;
  }

  inputDate(calendarHtml) {
    eventEmitter.on('dateSelected', function (selectedDate) {
      this.dateInput.value = selectedDate;
      this.toggleCalendar(calendarHtml);
    }.bind(this));
  }

  setup() {
    let calendar = this.createCalendarHtml();
    let calendarToggle = document.createElement('button');
    calendarToggle.setAttribute.type = 'button';
    calendarToggle.textContent = 'Choose';
    calendarToggle.classList.add('btn', 'btn-secondary', 'btn-short');
    calendarToggle.addEventListener('click', function () {
      this.toggleCalendar(calendar);
    }.bind(this));

    this.dateInput.parentElement.appendChild(calendarToggle);
    this.dateInput.parentElement.appendChild(calendar);

    this.inputDate(calendar);
  }

  toggleCalendar(calendarEl) {
    if (calendarEl.classList.contains('is-hidden')) {
      calendarEl.classList.remove('is-hidden');
    } else {
      calendarEl.classList.add('is-hidden');
    }
  }
}

const setupDatepicker = (calendarSettings) => {
  if (typeof DatePicker !== 'undefined') {
    const datepicker = new DatePicker(calendarSettings);
    datepicker.setup();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupDatepicker('example-datepicker');
});
