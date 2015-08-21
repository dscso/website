var app = angular.module('app', [
  'ngRoute',
  'ngCookies',
  'pascalprecht.translate',
  'wind-realtimedata',
  'cms'
]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        name : "home",
      })
      .when('/projects', {
        templateUrl: 'templates/projects.html',
        name : "projects",
      })
      .when('/team', {
        templateUrl: 'templates/team.html',
        name : "team",
      })
      .when('/news', {
        templateUrl: 'templates/news.html',
      })
      .otherwise({
        redirectTo: "/"
      });
}]);

app.factory('routeNavigation', function($route, $location) {
  var routes = [];
  angular.forEach($route.routes, function (route, path) {
    if (route.name) { // if name is given show it in the menu
      routes.push({
        path: path,
        name: route.name
      });
    }
  });
  return {
    routes: routes,
    activeRoute: function (route) {
      return route.path === $location.path();
    }
  };
});

app.directive('navigation', function (routeNavigation) {
    return {
        restrict: "E",
        templateUrl: "templates/navigation.html",
        controllerAs: "navCtrl",
        controller: function ($scope, $translate, $http) {
           $http.get("static/languages/languages.json").success(function (response) {
               $scope.languages = response.languages;
           });
           $scope.changeLang = function (key) {
              $translate.use(key)
           };
           $scope.isLang = function (key) {
               return $translate.use() === key;
           };

           $scope.routes = routeNavigation.routes;
           $scope.activeRoute = routeNavigation.activeRoute;
        }
    };
});

app.config(function($translateProvider) {
    $translateProvider.useCookieStorage();
    $translateProvider.preferredLanguage(settings.preferredLanguage);
    $translateProvider.useStaticFilesLoader({
        prefix: 'static/languages/',
        suffix: '.json'
    });
});
