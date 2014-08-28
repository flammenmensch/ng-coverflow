(function (ng) {
    'use strict';

    ng.module('ng-coverflow.utils', [])

        .directive('ngRepeatDone', [ function () {
            return function (scope) {
                if (scope.$last) {
                    scope.$emit('ng-coverflow:ng-repeat-done');
                }
            };
        } ])

        .factory('ngCoverflowItemAdapterFactory', [ function () {
            function NgCoverflowItemAdapter(sourceObj, fieldMap) {
                this.__source = sourceObj;
                this.__map = fieldMap;
            }

            NgCoverflowItemAdapter.prototype = {
                get title() {
                    return this.__source[ this.__map.title || 'title' ];
                },
                get subtitle() {
                    return this.__source[ this.__map.subtitle || 'subtitle' ];
                },
                get imageUrl() {
                    return this.__source[ this.__map.imageUrl || 'imageUrl' ];
                },
                get source() {
                    return this.__source;
                }
            };

            return function (source, map) {
                return new NgCoverflowItemAdapter(source, map);
            };
        } ]);
} (angular));