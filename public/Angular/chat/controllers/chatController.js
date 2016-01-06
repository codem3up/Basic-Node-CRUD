(function(){
    angular
        .module('chatModule')
        .controller('chatController', chatController);
        
        chatController.$inject = ['$scope', 'socketService'];
        
        function chatController($scope, socketService){
            var vm = this;
            vm.sendMessage = sendMessage;
            
            activate();
            
            vm.messages = []
            vm.message;
            
            function activate(){
                socketService.start(8001);
            }
            
            function sendMessage(message){
                if(message){
                    socketService.send(message);
                }
            }
            
            $scope.$on('msg-event', function(event, message){
                vm.messages.push(message);
                $scope.$digest();
            })
        }
})();