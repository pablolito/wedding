// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var registrationSchema = new Schema({
  name: String
});

// the schema is useless so far
// we need to create a model using it
var Registration = mongoose.model('Registration', registrationSchema);

// make this available to our users in our Node applications
module.exports = Registration;