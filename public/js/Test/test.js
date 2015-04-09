
angular.module('test', []).controller('TestIndividualController', function ($scope, Test, $routeParams) {
    Test.getTest($routeParams.id).success(function(data) {
        $scope.test = data;
        console.log(data);
        $scope.questions = data.questions;
        $scope.test = data;
    });
});
