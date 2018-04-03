import template from './comic-info.html';

function comicInfoDirective() {
  return {
    restrict: 'E',
    scope: {},
    template,
  };
}

export default comicInfoDirective;
