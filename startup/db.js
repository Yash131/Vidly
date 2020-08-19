const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
    mongoose.connect('mongodb://localhost/Vidly-Rentals',{
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : true,
  })
    .then(() => winston.info('Connected to MongoDB...'));
}