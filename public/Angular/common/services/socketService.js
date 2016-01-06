(function(){
    angular
        .module('commonModule')
        .factory('socketService', socketService);
        
        socketService.$inject = ['$rootScope', '$http'];
        
        function socketService($rootScope, $http){
            var service = {
                start: start,
                send: send,
            }
            
            var connection;
            
            function start(port){
                connection = new WebSocket('ws://localhost:' + port);
                connection.onmessage = function(event){
                    receive(event);
                }
            }
            
            function send(message){
                if(connection){
                    connection.send(message);
                }
            }
            
            function receive(message){
                if(message){
                    $rootScope.$broadcast('msg-event', message.data);
                }
            }
            
            return service;
        }
    
})();