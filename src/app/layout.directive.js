import template from './layout.html';

function layoutDirective() {
  return {
    restrict: 'E',
    scope: {},
    template,
  };
}

export default layoutDirective;
