require('./assets/stylesheets/style.scss');

import 'bootstrap';
import angular from 'angular';
import layoutDirective from './app/layout.directive';
import dateSearch from './app/date-search/date-search.module';

angular.module('marvelHistoryApp', [dateSearch])
  .directive('marvelHistory', layoutDirective);

console.log('Hello, Marvel History!');
