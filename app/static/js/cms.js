var cms = angular.module("cms", []);
var cmsJson = {};

cms.run(['$http', function ($http) {
  $http.get(settings.cmsJsonFile).success(function (response) {
    cmsJson = response;
  });
}]);

cms.directive('newsPanel', function () {
    return {
        restrict: "E",
        templateUrl: "templates/news.html",
        controllerAs: "newsCtrl"
    };
});

cms.controller('newsCtrl', function($scope) {
  $scope.cms = cmsJson;
  $scope.generateUrl = function (array) {
    return "#" + array.category + "?slug=" + array.slug;
  };
});

cms.controller('projectsCtrl', function ($scope, $routeParams) {
  $scope.slug = $routeParams.slug;
  $scope.showProjects = function () {
    return $routeParams.slug == "" || $routeParams.slug == undefined;
  };
  $scope.showProject = function () {
    return !$scope.showProjects();
  };
})

cms.directive("projectList", function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/projectlist.html',
    controllerAs: "projectlistCtrl",
    controller: function ($scope) {
      $scope.projects = cmsJson.projects;
    }
  };
});

cms.directive('project', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/projectpanel.html',
    scope: {
      slug: '='
    },
    controllerAs: 'projectCtrl',
    controller: function($scope){
      $scope.cms = cmsJson;
    }
  }
});
