import template from './results.html';

function resultsDirective() {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller: ResultsController,
    controllerAs: 'results',
  };
}

class ResultsController {
  constructor(DataService) {
    'ngInject';

    this.ds = DataService;
    this.data = this.ds.data;
  }
  showResults() {
    console.log('from resultsDirective', this.data);
  }
}

export default resultsDirective;
