const mongoose = require('mongoose');

const Cat = mongoose.model('Cat', { name: String });


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('BD OnLine')
    }catch(error){
        console.log('Error a la hora de iniciar la BD ver logs: ' + error.message)
    }
}

module.exports = {
    dbConnection
}