(function (ng) {
    'use strict';

    ng.module('ng-coverflow.models', [])
        .factory('ngCoverflowItemFactory', [ function () {
            function NgCoveflowItem (title, subtitle, imageUrl) {
                this.__title = title;
                this.__subtitle = subtitle;
                this.__imageUrl = imageUrl;
            }

            NgCoveflowItem.prototype = {
                get title() { return this.__title; },
                get subtitle() { return this.__subtitle; },
                get imageUrl() { return this.__imageUrl; }
            };

            return function (data) {
                return new NgCoveflowItem(data.title || '', data.subtitle || '', data.imageUrl || '');
            };
        } ]);
} (angular));