import template from './results.html';

function resultsDirective() {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller: ResultsController,
    controllerAs: 'vm',
  };
}

ResultsController.$inject = ['$log'];

function ResultsController($log) {
  const vm = this;
  vm.test = ['a', 'b', 'c'];

  $log.log('Hello From The ResultsController');
}

export default resultsDirective;
