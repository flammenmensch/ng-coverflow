'use strict';

describe('ng-coverflow.utils', function () {
    beforeEach(module('ng-coverflow.utils'));

    describe('ngCoverflowItemAdapterFactory', function () {
        it('should wrap given object with coverflow compatible interface', inject([ 'ngCoverflowItemAdapterFactory', function (adapterFactory) {
            expect(adapterFactory).toBeDefined();

            var employee = {
                name: 'John Doe',
                email: 'john.doe@domain.com',
                avatar: 'http://placekitten.com/g/200/200'
            };

            var map = {
                title: 'name',
                subtitle: 'email',
                imageUrl: 'avatar'
            };

            var wrappedItem = adapterFactory(employee, map);

            expect(wrappedItem.title).toEqual(employee.name);
            expect(wrappedItem.subtitle).toEqual(employee.email);
            expect(wrappedItem.imageUrl).toEqual(employee.avatar);
            expect(wrappedItem.source).toBe(employee);
        } ]));
    });

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