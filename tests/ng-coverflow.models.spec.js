'use strict';

describe('ng-coverflow.models', function () {
    beforeEach(module('ng-coverflow.models'));

    describe('ngCoverflowItemFactory', function () {
        it('should create coverflow compatible interface', inject([ 'ngCoverflowItemFactory', function (itemFactory) {
            expect(itemFactory).toBeDefined();

            var employee = {
                title: 'John Doe',
                subtitle: 'john.doe@domain.com',
                imageUrl: 'http://placekitten.com/g/200/200'
            };

            var wrappedItem = itemFactory(employee);

            expect(wrappedItem.title).toEqual(employee.title);
            expect(wrappedItem.subtitle).toEqual(employee.subtitle);
            expect(wrappedItem.imageUrl).toEqual(employee.imageUrl);
        } ]));
    });
});