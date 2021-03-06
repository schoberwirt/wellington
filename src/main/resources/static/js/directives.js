/*global angular, $*/
/*jshint undef: true, unused: true, globalstrict:true*/
'use strict';

/* Directives */

var directives = angular.module('wellington.directives', []);

directives.directive('nameValueTable', function () {
    return {
      templateUrl: '/partials/shared/nameValueTable.html',
      replace: false,
      scope: {
        pairs: '=',
        title: '@'
      }
    };
});

directives.directive('orderedTable', function () {
    return {
      templateUrl: '/partials/shared/orderedTable.html',
      replace: false,
      scope: {
        elements: '=',
        title: '@'
      }
    };
});

directives.directive('focusMe', function() {
  return {
    link: function(scope, element) {
      $(element).focus();
    }
  };
});

directives.directive('filter', function () {
    return {
      templateUrl: '/partials/shared/filter.html',
      replace: false,
      scope: {
        'placeholder': '@',
        'filter': '=value'
      },
      link: function(scope) {
        scope.checkKey = function(e) {
            if (e.keyCode == 13) {
                scope.$emit('filterChanged', scope.filter);
            }
        };
        scope.clear = function() {
            scope.filter = "";
            scope.$emit('filterChanged', scope.filter);
        };
      }
    };
});

directives.directive('pager', function () {
    return {
      templateUrl: '/partials/shared/pager.html',
      replace: false,
      scope: {
        state: '=',
        noResults: '@'
      },
      link: function(scope) {
        scope.pagesAvail = function() {
            var i, min, max, avail = [];
            if (!scope.state) {
                return avail;
            }
            if (scope.state.hasPreviousPage) {
                min = -1;
                if (min < (scope.state.pageNumber - 5)) {
                   min = scope.state.pageNumber - 5;
                }
                for (i=scope.state.pageNumber-1; i>min; --i) {
                    avail.unshift(i);
                }
            }
            avail.push(scope.state.pageNumber);
            if (scope.state.hasNextPage) {
                max = scope.state.totalPages;
                if (max > (scope.state.pageNumber + 5)) {
                   max = scope.state.pageNumber + 5;
                }
                for (i=scope.state.pageNumber+1; i<max; ++i) {
                    avail.push(i);
                }
            }
            return avail;
        };
        scope.setPage = function(page) {
            scope.$emit('pageChanged', page);
        };
        scope.prevPage = function() {
            scope.$emit('pageChanged', scope.state.pageNumber - 1);
        };
        scope.nextPage = function() {
            scope.$emit('pageChanged', scope.state.pageNumber + 1);
        };
      }
    };
});

directives.directive('feedbackFormGroup', function () {
    return {
      templateUrl: '/partials/shared/feedbackFormGroup.html',
      replace: true,
      transclude: true,
      scope: {
        field: '='
      },
      link: function(scope) {
        scope.invalid = function() {
            return scope.field && (scope.field.$dirty && scope.field.$invalid);
        };
        scope.valid = function() {
            return !scope.field || scope.field.$pristine || scope.field.$valid;
        };
        scope.feedback = function() {
            return scope.field && scope.field.$dirty;
        };
      }
    };
});