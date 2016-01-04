(function(){
    angular
        .module('postModule')
        .controller('postController', postController);
        
        postController.$inject = ['$uibModal', '$scope', 'postService'];
        
        function postController($uibModal, $scope, postService){
            var vm = this;
            
            vm.addPost = addPost;
            vm.editPost = editPost;
            vm.deletePost = deletePost;

            vm.posts;
            
            activate();
            
            function activate(){
                postService.getPosts()
                .then(function(response){
                    vm.posts = response.data;
                    console.log(vm.posts);
                })
            }
            
            function addPost(){
                var modalInstance = $uibModal.open({
                    templateUrl: 'Angular/post/views/new.html',
                    controller: 'newPostController as ctrl',
                });
                
                modalInstance.result.then(function (post){
                    postService.submitPost(post)
                    .then(function(response){
                        vm.posts = response.data;
                    })
                    .catch(function(response){
                        console.log(response);
                    })
                })
            }
            
            function editPost(post){
                var modalInstance = $uibModal.open({
                    templateUrl: 'Angular/post/views/edit.html',
                    controller: 'editPostController as ctrl',
                    resolve: {
                        getObject: function(){
                            return post;
                        }
                    }
                })
                
                modalInstance.result.then(function (posts){
                    vm.posts = posts;
                })
            }
            
            function deletePost(post){
                postService.deletePost(post)
                .then(function(response){
                    vm.posts = response.data;
                })
            }
        }
        
        angular
        .module('postModule')
        .controller('newPostController', newPostController);
        
        newPostController.$inject = ['$uibModalInstance'];
        
        function newPostController($uibModalInstance){
            var vm = this;
            
            vm.submit = submit;
            vm.cancel = cancel;
            
            function submit(){
                var data = { title: vm.title, content: vm.content }
                $uibModalInstance.close(data);
            }
            
            function cancel(){
                $uibModalInstance.dismiss();
            }
        }
        
        angular
        .module('postModule')
        .controller('editPostController', editPostController);
        
        editPostController.$inject = ['$uibModalInstance', 'getObject', 'postService'];
        
        function editPostController($uibModalInstance, getObject, postService){
            var vm = this;
            
            vm.submit = submit;
            vm.cancel = cancel;
            
            vm.title = getObject.title;
            vm.content = getObject.content;
            
            function submit(){
                var data = {};
                data.oldPost = getObject;
                data.newPost = { title: vm.title, content: vm.content }
                
                postService.editPost(data)
                .then(function(response){
                    vm.posts = response.data;
                    console.log(vm.posts);
                    $uibModalInstance.close(vm.posts);
                })
            }
            
            function cancel(){
                $uibModalInstance.dismiss();
            }
        }
        
})();