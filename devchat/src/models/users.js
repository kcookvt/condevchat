var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var salt_factor = 10;
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {type: String, unique:true},
    password: {type: String},
    dev: {type: Boolean},
    creditCardNumber: {type: Number},
    gravatar: {type: String},
    bio: {type:String},
    languages: [{name: String}],
    xp: {type:Number},
    createdAt: {type:Date},
    email:{type:String}    
});
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(salt_factor, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});
var User = mongoose.model('User', userSchema);
module.exports = User;
