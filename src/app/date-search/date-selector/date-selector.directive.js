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
  constructor(marvelService) {
    this.ms = marvelService;
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.currentDate = today.getDate();
    this.months = [
      { MM: 1, name: 'January' },
      { MM: 2, name: 'February' },
      { MM: 3, name: 'March' },
      { MM: 4, name: 'April' },
      { MM: 5, name: 'May' },
      { MM: 6, name: 'June' },
      { MM: 7, name: 'July' },
      { MM: 8, name: 'August' },
      { MM: 9, name: 'September' },
      { MM: 10, name: 'October' },
      { MM: 11, name: 'November' },
      { MM: 12, name: 'December' },
    ];
    this.selectedMonth = this.months[this.currentMonth];
    this.days = this.getDaysInMonth(this.selectedMonth, this.currentYear);
    this.selectedDate = this.currentDate;
    this.results = [];
  }

  setDaysByMonth(month) {
    this.days = this.getDaysInMonth(month, this.currentYear);
    this.selectedDate = 1;
  }

  getDaysInMonth(monthObj, year) {
    const month = monthObj.MM - 1;
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  queryBuilder() {
    let searchQuery = {};
    const { MM } = this.selectedMonth;
    const YYYY = this.currentYear;
    const DD = this.selectedDate;
    const NYE = new Date(YYYY, 11, 31).toDateString();
    const weekStartDate = new Date(YYYY, MM - 1, DD);
    const weekEndDate = oneWeekLater(weekStartDate);
    const end = `${pad(weekEndDate.getMonth() + 1)}-${pad(weekEndDate.getDate())}`;
    let start = '';

    if (weekEndDate.toDateString() === NYE) {
      start = '12-24';
    } else {
      start = `${pad(MM)}-${pad(DD)}`;
    }
    searchQuery = { start, end, golden: true };
    return searchQuery;
  }
  submitQuery() {
    const query = this.queryBuilder();
    this.ms.getComicsByDateRange(query)
      .then((data) => {
        this.results = data;
        console.log('SQ', this.results);
      });
  }
  viewResults() {
    console.log(this.results);
  }
}

export default dateSelectorDirective;

function pad(num) {
  let str = `${num}`;
  if (str.length === 1) str = `0${str}`;
  return str;
}

function oneWeekLater(startDate) {
  const xmasEve = new Date(startDate.getFullYear(), 11, 24);
  if (startDate > xmasEve) return new Date(startDate.getFullYear(), 11, 31);

  const d = new Date(startDate);
  d.setDate(d.getDate() + 7);
  return d;
}

// Golden Tests: March 1, October 1
