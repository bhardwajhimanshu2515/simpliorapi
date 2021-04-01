//import mongoose
const mongoose = require('mongoose');

//define Schema class here
const Schema = mongoose.Schema;

//create companySchema here
const companySchema = new Schema({
    CompanyName: { type: String, required: true },
    CompanyEmail: { type: String, required: true},
    password: { type: String, required: true, minlength:8 }
});

//export companySchema as Company
module.exports = mongoose.model('Company', companySchema);