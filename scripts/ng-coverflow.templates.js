(function (ng) {
ng.module('ng-coverflow').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('../templates/ng-coverflow-description.html',
    "<div class=\"ng-coverflow-description\"><h4>{{item.title}}</h4><p>{{item.subtitle}}</p></div>"
  );


  $templateCache.put('../templates/ng-coverflow-item.html',
    "<div class=\"ng-coverflow-item\"><img ng-src=\"{{item.imageUrl}}\" alt=\"{{item.title}}\"></div>"
  );


  $templateCache.put('../templates/ng-coverflow.html',
    "<div class=\"ng-coverflow-container\"><div class=\"ng-coverflow-header\" ng-hide=\"header === ''\"><h1>{{header}}</h1></div><ul class=\"ng-coverflow\"><li ng-repeat=\"item in items\" ng-repeat-done><ng-coverflow-item item=\"item\"></ng-coverflow-item></li></ul><a class=\"ng-coverflow-nav previous animate-show\" href=\"#\" ng-click=\"selectPrevious()\" ng-show=\"hasPrevious()\"><i></i></a> <a class=\"ng-coverflow-nav next animate-show\" href=\"#\" ng-click=\"selectNext()\" ng-show=\"hasNext()\"><i></i></a><ng-coverflow-description item=\"_currentItem\"></ng-coverflow-description></div>"
  );
} ]);
} (angular));