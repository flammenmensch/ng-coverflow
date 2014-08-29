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
});