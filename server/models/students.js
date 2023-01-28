const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true, 'must provide first name']
    },
    ID:{
        type:String,
    },
    lastName:{
        type:String,
        required:[true, 'must provide last name']
    },
    studentId:{
        type:String,
        required:[true,'must provide Id'],
        index:true,
        sparse:true   
    },
    email:{
        type: String,
        require:[true, 'must provide email'],
        
    },
    password:{
        type:String,
        require:true, 
         
    },
    confirmPassword:{
        type:String,
        require:true,       
    },
    libraryCleared:{
        type: Boolean,
    },
    registrarCleared:{
        type: Boolean,      
    },
    dormitoryCleared:{
        type: Boolean,       
    }
    
},
{ timestamps: true }
)

module.exports = mongoose.model('Student', StudentSchema)