const mongoose = require('mongoose');
//Permet e na pas s'inscrire plusieurs fois avec la même adress email
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passowrd: { type: String, required: true}
});

// Applique la validateur au Shema avent d'en faire un model
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);