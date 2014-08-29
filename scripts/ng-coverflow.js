(function (ng) {
    'use strict';

    ng.module('ng-coverflow', [ ])

        .directive('ngRepeatDone', [ function () {
            return function (scope) {
                if (scope.$last) {
                    scope.$emit('ng-coverflow:ng-repeat-done');
                }
            };
        } ])

        .directive('ngCoverflowDescription', [ function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '../templates/ng-coverflow-description.html',
                scope: {
                    item: '=item'
                }
            };
        } ])

        .directive('ngCoverflowItem', [ function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '../templates/ng-coverflow-item.html',
                scope: {
                    item: '=item'
                },
                link: function (scope, iElement) {
                    iElement.on('click', function (event) {
                        event.preventDefault();
                        scope.$emit('ng-coverflow:item-click', scope.item);
                    });
                }
            };
        } ])

        .directive('ngCoverflow', [ '$timeout', function ($timeout) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '../templates/ng-coverflow.html',
                scope: {
                    items:          '=items',
                    header:         '@',
                    selectedIndex:  '@',
                    itemClick:      '&'
                },
                controller: [ '$scope', function ($scope) {
                    $scope.hasPrevious = function () {
                        return $scope.items && ($scope.selectedIndex > 0 || $scope.wrapAround === 'true');
                    };

                    $scope.hasNext = function () {
                        return $scope.items && ($scope.selectedIndex < $scope.items.length - 1 || $scope.wrapAround === 'true');
                    };

                    $scope.selectPrevious = function (event) {
                        if (event) {
                            event.preventDefault();
                        }

                        if ($scope.hasPrevious()) {
                            $scope.selectIndex($scope.selectedIndex - 1);
                        }
                    };

                    $scope.selectNext = function (event) {
                        if (event) {
                            event.preventDefault();
                        }

                        if ($scope.hasNext()) {
                            $scope.selectIndex($scope.selectedIndex + 1);
                        }
                    };

                    $scope.selectIndex = function (newIndex) {
                        var totalItems = $scope.items.length;

                        if (newIndex < 0) {
                            if ($scope.wrapAround === 'true') {
                                newIndex = totalItems + newIndex % totalItems;
                            } else {
                                newIndex = 0;
                            }
                        }

                        if (newIndex >= totalItems) {
                            if ($scope.wrapAround === 'true') {
                                newIndex %= totalItems;
                            } else {
                                newIndex = totalItems - 1;
                            }
                        }

                        $scope.selectedIndex = newIndex;
                    };
                } ],
                link: function (scope, iElement, attrs) {
                    var ZOOM        = attrs.zoom || 140;
                    var WRAP        = attrs.wrapAround === 'true';
                    var OFFSET      = attrs.offset || 70;
                    var ROTATION    = attrs.rotation || 0;
                    var BRIGHTNESS  = attrs.brightness || 0.75;
                    var MAX_ZINDEX  = 100;
                    var BASE_ZINDEX = 1;

                    scope._currentItem = null;

                    iElement.on('mousewheel', function (event) {
                        event.preventDefault();

                        if (event.wheelDeltaY > 0) {
                            scope.$apply(function () {
                                scope.selectPrevious()
                            });
                        } else if (event.wheelDeltaY < 0) {
                            scope.$apply(function () {
                                scope.selectNext();
                            });
                        }
                    });

                    scope.$watch('selectedIndex', function (newValue, oldValue) {
                        updateCurrentItem();
                        render();
                    });

                    scope.$on('ng-coverflow:ng-repeat-done', function () {
                        scope.selectedIndex = Math.floor(iElement.find('li').length / 2);
                    });

                    scope.$on('ng-coverflow:item-click', function (event, item) {
                        var index = scope.items.indexOf(item);

                        if (index === -1) {
                            index = 0;
                        }

                        if (index === scope.selectedIndex) {
                            if (scope.itemClick !== undefined) {
                                scope.itemClick({ item: item });
                            }
                        }

                        if (index !== scope.selectedIndex) {
                            scope.selectIndex(index);
                            scope.$apply();
                        }
                    });

                    var updateCurrentItem = function () {
                        $timeout(function () {
                            scope._currentItem = scope.items[scope.selectedIndex];
                        });
                    };

                    var wrapAround = function (current, selected, total) {
                        var half = Math.floor(total * 0.5);
                        var shift = selected % total + half;

                        return (current + shift) % total;
                    };

                    var render = function () {
                        var items = iElement.find('li');
                        var count = items.length;

                        var relativeSelectedIndex = WRAP ? Math.floor(count * 0.5) : scope.selectedIndex;

                        ng.forEach(items, function (item, index) {
                            var relativeIndex = WRAP ? wrapAround(index, scope.selectedIndex, count) : index;
                            var li = items[relativeIndex];

                            if (index > relativeSelectedIndex) {
                                li.classList.remove('selected');
                                li.style['z-index'] = BASE_ZINDEX - index;
                                li.style['-webkit-filter'] = 'brightness(' + BRIGHTNESS + ')';
                                li.style['-webkit-transform'] = 'translateZ(-' + ZOOM + 'px) translateX(' + (OFFSET * (index - relativeSelectedIndex)) + '%) rotateY(-' + ROTATION + 'deg)';
                            }

                            if (index === relativeSelectedIndex) {
                                li.classList.add('selected');
                                li.style['z-index'] = MAX_ZINDEX;
                                li.style['-webkit-filter'] = 'brightness(1.0)';
                                li.style['-webkit-transform'] = 'rotateY(0) translateZ(0) translateX(0)';
                            }

                            if (index < relativeSelectedIndex) {
                                li.classList.remove('selected');
                                li.style['z-index'] = BASE_ZINDEX - (count - index);
                                li.style['-webkit-filter'] = 'brightness(' + BRIGHTNESS + ')';
                                li.style['-webkit-transform'] = 'translateZ(-' + ZOOM + 'px) translateX(-' + (OFFSET * (relativeSelectedIndex - index)) + '%) rotateY(' + ROTATION + 'deg)';
                            }
                        });
                    };
                }
            };
        } ]);
} (angular));