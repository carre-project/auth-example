
angular.module('CarreExample', ['ngCookies'])
.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})
.controller('ExampleController', function($scope,$cookies,$location) {
  
  //set up the urls 
  var CARRE_DEVICES='http://devices.carre-project.eu/devices/accounts';
  var baseUrl=$location.absUrl();
  $scope.loginUrl=CARRE_DEVICES+'/login?next='+baseUrl+'?login'; //pass the login as a parameter to catch later
  $scope.logoutUrl=CARRE_DEVICES+'/logout?next='+baseUrl+'?logout'; //same for the logout
  
  console.log('LoginURL: ',$scope.loginUrl);
  console.log('LogoutURL: ',$scope.logoutUrl);
  
  
  // Retrieving a cookie and set initial user object
  $scope.user = $scope.cookie = $cookies.getObject('CARRE_USER');
  console.log($cookies.get('CARRE_USER'));
  
  // Retrieving url params
  var params = $location.search();

  //check for cookie or url get parameters
  if(params.login && params.username){
    delete params.login; //delete the extra param we put before
    $scope.user=$scope.cookie=params; //set user object
    $cookies.putObject('CARRE_USER',$scope.cookie,{'domain': '.carre-project.eu','path':'/'}); //set browser cookie
  } else if(params.logout){
    $scope.user=$scope.cookie=null; //remove user object
    $cookies.remove('CARRE_USER',{'domain': '.carre-project.eu','path':'/'});  //remove browser cookie
  }
  
  //clean up the browser url
  $location.url('/').replace();
});