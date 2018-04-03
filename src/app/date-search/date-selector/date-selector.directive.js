import template from './date-selector.html';

function dateSelectorDirective() {
  return {
    restrict: 'E',
    scope: {},
    template,
  };
}

export default dateSelectorDirective;
