require('./assets/stylesheets/style.scss');

import 'bootstrap';
import angular from 'angular';
import layoutDirective from './app/layout.directive';
import dateSearch from './app/date-search/date-search.module';
import MarvelService from './app/marvel.service';

angular.module('marvelHistoryApp', [dateSearch])
  .directive('marvelHistory', layoutDirective)
  .service('marvelService', MarvelService);

console.log('Hello, Marvel History!');
