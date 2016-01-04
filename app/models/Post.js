// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
    title: String,
    content: String
})
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Post', postsSchema);