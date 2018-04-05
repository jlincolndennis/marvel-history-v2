import template from './date-selector.html';

function dateSelectorDirective() {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller: DateSelectorController,
    controllerAs: 'ds',
  };
}

// DateSelectorController.$inject = ['marvelService'];

class DateSelectorController {
  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getYear();
    this.currentDate = today.getDate();
    this.months = [
      { MM: '01', name: 'January' },
      { MM: '02', name: 'February' },
      { MM: '03', name: 'March' },
      { MM: '04', name: 'April' },
      { MM: '05', name: 'May' },
      { MM: '06', name: 'June' },
      { MM: '07', name: 'July' },
      { MM: '08', name: 'August' },
      { MM: '09', name: 'September' },
      { MM: '10', name: 'October' },
      { MM: '11', name: 'November' },
      { MM: '12', name: 'December' },
    ];
    this.selectedMonth = this.months[this.currentMonth];
    this.days = this.getDaysInMonth(this.selectedMonth, this.currentYear);
    this.selectedDay = this.currentDate;
  }

  setDaysByMonth(month) {
    this.days = this.getDaysInMonth(month, this.currentYear);
  }

  getDaysInMonth(monthObj, year) {
    const month = parseInt(monthObj.MM, 10) - 1;
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
}

export default dateSelectorDirective;
