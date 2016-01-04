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
        
        $urlRouterProvider.otherwise("posts");
    });
})();