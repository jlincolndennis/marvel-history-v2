import angular from 'angular';
import dateSelector from './date-selector/date-selector.directive';
import results from './results/results.directive';
import comicPreview from './results/comic-preview.directive';
import MarvelService from '../marvel.service';
import DataService from './data.service';

export default angular.module('marvelHistoryApp.dateSearch', [])
  .directive('dateSelector', dateSelector)
  .directive('results', results)
  .directive('comicPreview', comicPreview)
  .service('MarvelService', MarvelService)
  .service('DataService', DataService)
  .name;
