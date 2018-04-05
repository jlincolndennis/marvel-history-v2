import template from './date-selector.html';

function dateSelectorDirective() {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller: DateSelectorController,
    controllerAs: 'vm',
  };
}

// DateSelectorController.$inject = ['marvelService'];

function DateSelectorController() {
}

export default dateSelectorDirective;
