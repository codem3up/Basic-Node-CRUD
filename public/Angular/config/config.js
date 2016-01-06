(function(){ 
    angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('posts', {
            url: "/posts",
            templateUrl: "Angular/post/views/posts.html",
            controller: "postController as ctrl"
        })
        .state('new', {
            url: "/new",
            templateUrl: "Angular/post/views/new.html"
        })
        .state('chat', {
            url: "/chat",
            templateUrl: "Angular/chat/views/chat.html",
            controller: "chatController as ctrl"
        })
        
        $urlRouterProvider.otherwise("posts");
    });
})();