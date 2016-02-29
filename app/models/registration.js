// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var registrationSchema = new Schema({
  imComing: Boolean,
  firstName: String,
  lastName: String,
  email: String,
  vege: Boolean,
  guest: [{
    firstName: String,
    lastName: String,
    vege: Boolean
  }],
  transportation : String,
  availableQuantity: String,
  neededQuantity: String,
  accomodation: String,
  dayAfter: String,
  message: String
});

// the schema is useless so far
// we need to create a model using it
var Registration = mongoose.model('Registration', registrationSchema);

// make this available to our users in our Node applications
module.exports = Registration;