const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const Person = mongoose.model('Person',{
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person