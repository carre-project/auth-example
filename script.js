angular.module('CarreExample', ['ngCookies'])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  .controller('ExampleController', function($scope, $cookies, $location,$http) {

    //set up the urls 
    var CARRE_DEVICES = 'http://devices.carre-project.eu/devices/accounts';
    var API = 'http://devices.carre-project.eu/ws/'; 
    
    
    //clean up the browser url
    $location.url('/').replace();
    var baseUrl = $location.absUrl();
    
    $scope.loginUrl = CARRE_DEVICES + '/login?next=' + baseUrl;
    $scope.logoutUrl = CARRE_DEVICES + '/logout?next=' + baseUrl;

    // Retrieving a cookie and set initial user object
    var TOKEN = $cookies.get('CARRE_USER') || '';
    $scope.user = {};
    //validate cookie token with userProfile api function and get username userGraph
    if (TOKEN.length > 0) {
      $http.get(API + 'userProfile?token=' + TOKEN).then(function(res) {
        $scope.user = {
          oauth_token: TOKEN,
          username: res.data.username,
          email: res.data.email
        };
      }, function(err) {
        $scope.user = {};
        console.log(err);
      });
    }
  });