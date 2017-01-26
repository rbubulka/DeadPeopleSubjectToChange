/**
 * Created by Steven on 2/20/2016.
 */
(function () {
    var app = angular.module('DataManager', []);

    var host = "http://23.99.27.197:5000/";
    var token;
    app.service('AuthService', ['$http', function ($http) {
        var self = this;

        self.login = function (username, password, callback) {
            var pkt = { email: username, password: password };
            $http({
                method: 'POST',
                url: host + "login",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }).then(function (data) {
                console.log('SUCCESS - login', data.data, data.data.access_token);
                setToken('auth-token', data.data.access_token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + data.data.access_token;
                token = 'Bearer ' + data.data.access_token;
                callback(data.data.access_token);
            }, function errorCallback(response) {
                console.log('error occured: ', response);
                callback('', response);
                //UPDATE STUFF FOR INCORRECT USER NAME PASSWORD VS SERVER ERROR
            });
        };
    }]);
    app.service('DataService',['$https', function($http){
        var self = this;

        self.getNames = function(searchTerm, callback){
            var pkt = {c_name:searchTerm};
            $http({
                method: 'GET',
                url: host + 'search/' + searchTerm,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }).then(function(response){
                callback(response.data);
            });
        }
    }]);

})();

