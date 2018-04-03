import angular from 'angular';
import dateSelector from './date-selector/date-selector.directive';
import results from './results/results.directive';
import comicInfo from './results/comic-info.directive';

export default angular.module('marvelHistoryApp.dateSearch', [])
  .directive('dateSelector', dateSelector)
  .directive('results', results)
  .directive('comicInfo', comicInfo)
  .name;
