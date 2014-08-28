# ng-coverflow
## CoverFlow directive for AngularJS

## Attributes

### header
> Coverflow title text

### zoom
> 

### rotation
> Rotation angle of side elements (in degrees)

### brightness
> Brightness of side elements (0..1)

### offset
> Offset of side elements (in pixels)

### wrap-around
> If true the coverflow becomes infinite (true/false)

### items
> Array of items (see below for item specification)

### selected-index
> Current selected item index

### item-click
> Reference to item click callback function

## ng-coverflow item specification
> Normally you can use any object with the following properties defined: `title`, `subtitle` and `imageUrl`. For more complex cases you can use utility services provided (see next section).
```js
{ title: 'Title', subtitle: 'Subtitle', imageUrl: 'http://placekitten.com/g/200/200' }
```

## Additional services

### ngCoverflowItemFactory
> Factory function which creates directive-compatible data object. Defined in the module `ng-coverflow.models`.

### ngCoverflowItemAdapterFactory
> If you'd like to use your own objects as a data source for coverflow you might wrap them with directive-compatible object using this service. You can then access original data via `source` property. Defined in the module `ng-coverflow.utils`.

```js
angular.module('app', [ 'ng-coverflow.utils' ]).controller('AppCtrl', [ '$scope', 'employeeService', 'ngCoveflowItemAdapterFactory', function ($scope, employeeService, adapterFactory) {
    
    $scope.employees = [ ];
    
    $scope.load = function () {
        employeeService.load().then(function (response) {
            $scope.employees = response.data.map(function (employee) {
                return adapterFactory(employee, { title: 'name', subtitle: 'phoneNumber', imageUrl: 'avatar' });
            });
        });
    };
    
    $scope.selectEmployee = function (wrappedItem) {
        var originalData = wrappedItem.source;
    };
    
} ]);
```

## Example usage

```js
<ng-coverflow header="This is coverflow" items="items" item-click="itemClickHandler(item)"></ng-coverflow>
```