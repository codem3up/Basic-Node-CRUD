(function(){
    angular
        .module('postModule')
        .factory('postService', postService);
        
        postService.$inject = ['$http'];
        
        function postService($http){
            var service = {
                submitPost: submitPost,
                getPosts: getPosts,
                editPost: editPost,
                deletePost: deletePost
            }
            
            function getPosts(){
                return $http.get('/posts');
            }
            
            function submitPost(post){
                return $http.post('/posts/new', post);
            }
            
            function editPost(post){
                return $http.post('/posts/edit', post);
            }
            
            function deletePost(post){
                return $http.post('/posts/delete', post);
            }
            
            return service;
        }
    
})();