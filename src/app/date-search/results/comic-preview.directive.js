import template from './comic-preview.html';

function comicPreviewDirective() {
  return {
    restrict: 'E',
    scope: {
      issue: '=',
    },
    template,
    controller: ComicPreviewController,
    controllerAs: 'cp',
  };
}

class ComicPreviewController {
  constructor($scope) {
    'ngInject';

    this.issue = $scope.issue;
  }
}

export default comicPreviewDirective;
