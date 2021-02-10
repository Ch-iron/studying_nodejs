const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:*****@studying1.kjwv8.mongodb.net/studying1?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))