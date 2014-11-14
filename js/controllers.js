angular.module('formulaOneApp.controllers', [])
.controller('DriverListController', function($scope, $state, $window, Driver) {
  $scope.data = Driver.standings.get({season: 2014, series: 'f1' }, function(){
    $scope.loaded = true;
    var retVal = $scope.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    $scope.drivers = retVal
  }); //fetch all drivers. Issues a GET to /api/drivers

}).controller('DriverViewController', function($scope, $stateParams, Driver) {
  $scope.data = Driver.driver.get({ id: $stateParams.id, series: 'f1' }, function(){
    $scope.loaded = true;
    var retVal = $scope.data.MRData.DriverTable.Drivers[0];

    var ageDifMs = Date.now() - new Date(retVal.dateOfBirth);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch

    retVal.Age = Math.abs(ageDate.getUTCFullYear() - 1970);

    $scope.driver = retVal
  }); //Get a single driver. Issues a GET to /api/driver/:id
});
