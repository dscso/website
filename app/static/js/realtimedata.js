var realtimedata = angular.module('wind-realtimedata', [
  'ngWebSocket'
]);

realtimedata.factory('websocketFactory', function($websocket) {
  var ws = $websocket(settings.websocketUrl);
  ws.onMessage(function(message) {
    console.log("websocket-receive: ", message)
  });
  ws.onOpen(function () {
    ws.send("client-connected-message")
  });
  ws.onClose(function (e) {
    console.log("Connection closed, ", e)
  });
  ws.onError(function(e) {
    console.log('Connection Error', e);
  });

  return {
    send: function (message) {
      ws.send(message);
    }
  };
});

realtimedata.directive("windspeedpanel", function() {
  return {
      restrict: "E",
      templateUrl: "templates/windspeed.html",
      controllerAs: "windspeedCtrl",
      controller: function (websocketFactory) {
        websocketFactory.send("hi");
      }
  };
});
realtimedata.directive("chartpanel", function() {
  return {
      restrict: "E",
      templateUrl: "templates/chart.html",
      controllerAs: "chartCtrl",
      controller: function (websocketFactory) {

      }
  };
});
