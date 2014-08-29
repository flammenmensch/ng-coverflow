'use strict';

describe('ng-coverflow', function () {
    beforeEach(module('ng-coverflow'));

    describe('ng-coverflow', function () {

        it('should create ng-coverflow component', inject([ '$compile', '$rootScope', function ($compile, $rootScope) {
            var scope = $rootScope.$new();

            scope.header = 'This is coverflow';
            scope.items = [ ];

            var template = $compile('<ng-coverflow header="{{header}}" items="items" item-click="clickHandler(item)"></ng-coverflow>')(scope);

            var listItems = template.find('li');

            expect(listItems.length).toEqual(0);

            scope.items.push({ title: 'Item 0', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' });
            scope.items.push({ title: 'Item 1', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' });
            scope.items.push({ title: 'Item 2', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' });
            scope.items.push({ title: 'Item 3', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' });
            scope.items.push({ title: 'Item 4', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' });
            scope.items.push({ title: 'Item 5', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' });
            scope.items.push({ title: 'Item 6', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' });

            scope.$digest();

            listItems = template.find('li');

            var templateAsHtml = template.html();
            var directiveScope = template.isolateScope();

            expect(templateAsHtml).toContain(scope.header);
            expect(listItems.length).toEqual(scope.items.length);
            expect(directiveScope.selectedIndex).toEqual(Math.floor(scope.items.length / 2));
        } ]));
    });

});