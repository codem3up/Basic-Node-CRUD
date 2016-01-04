var Post = require('./models/Post');

module.exports = function(app){
            
    app.get('/posts', function(req, res){
        Post.find(function(err, posts){
            if(err)
                res.send(err);
               
            res.json(posts);
        });
    });
    
    app.post('/posts/new', function(req, res){
        var post = req.body;
        if(post.title && post.content){
            var newPost = new Post(post);
            newPost.save(function(err){
                if(err)
                    console.log(err);
                Post.find(function(err, posts){
                    if(err){
                        console.log(err);
                    }
                    res.json(posts);
                })
            })
        }
    })
    
    app.post('/posts/edit', function(req, res){
        var oldPost = req.body.oldPost;
        var newPost = req.body.newPost;
        Post.update(oldPost, { $set: { title: newPost.title, content: newPost.content} }
        , {multi: true}, function(err, doc){
            if(!err){
                Post.find(function(err, posts){
                    res.json(posts);
                })
            } 
        })
    })
 
    app.post('/posts/delete', function(req, res){
        var post= req.body;
        if(post){
            Post.find(post).remove(function(err, data){
                if(!err){
                    Post.find(function(err, posts){
                        if(err){
                            console.log(err);
                        }
                        res.json(posts);
                    })
                }
            })
        }
    })
    
    
    app.get('*', function(req, res){
        res.sendfile('./public/views/index.html');
    });
}