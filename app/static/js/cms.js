var cms = angular.module("cms", ['ngSanitize']);
var cmsJson = {};

cms.run(['$http', function ($http) {
  $http.get(settings.cmsJsonFile).success(function (response) {
    cmsJson = response;
  });
}]);

cms.filter('md', function() {
  return function(input) {
    if (!input || !input.length) { return; }
    return markdown.toHTML(input);
  };
});

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

cms.directive('projectPage', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/projectpage.html',
    scope: {
      slug: '='
    },
    controllerAs: 'projectpageCtrl',
    controller: function($scope){
      $scope.cms = cmsJson;
      $scope.project = null;
      cmsJson.projects.forEach(function (element) {
        if (element.slug == $scope.slug) {
          $scope.project = element;
        }
      });
      if ($scope.project == null) {
        $scope.notFound = true;
      }
    }
  }
});

cms.controller('teamCtrl', function ($scope, $routeParams) {
  $scope.memberID = $routeParams.memberID;
  $scope.showTeam = function () {
    return $routeParams.memberID == "" || $routeParams.memberID == undefined;
  };
  $scope.showMember = function () {
    return !$scope.showTeam();
  };
})

cms.directive("memberList", function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/memberlist.html',
    controllerAs: "memberlistCtrl",
    controller: function ($scope) {
      $scope.team = cmsJson.team;
    }
  };
});

cms.directive('memberPage', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/memberpage.html',
    scope: {
      memberid: '='
    },
    controllerAs: 'memberCtrl',
    controller: function($scope){
      $scope.memberID = $scope.memberid;
      $scope.cms = cmsJson;
      $scope.member = null;
      cmsJson.team.forEach(function (element) {
        if (element.id == $scope.memberid) {
          $scope.member = element;
        }
      });
      if ($scope.member == null) {
        $scope.notFound = true;
      }
    }
  }
});
