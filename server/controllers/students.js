const Student = require('../models/students')
const bcrypt = require('bcryptjs')
const emailValidator = require('deep-email-validator')
const validator = require("email-validator")

const register = async (req, res)=>{
   console.log(req.body);
    const {firstName, lastName, studentId,email, password,confirmPassword} = req.body;

    const hashedPassword = await  bcrypt.hashSync(req.body.password)

    const student = new Student({
        firstName,
        lastName,
        studentId,
        email,
        password:hashedPassword,
        libraryCleared:true,
        registrarCleared:true,
        dormitoryCleared:true
    })

    //////////////////////////

    let emailExist 
    let studentIdExist
    const validEmail = await validator.validate(email);
    try{
        emailExist = await Student.findOne({email:email})
        studentIdExist = await Student.findOne({studentId:studentId})
    }
    catch(error){
        return res.status(404).json({message:"error occur while checking email and studentId validation"})
    }


    if(!firstName || !lastName || !studentId || !email || !password || !confirmPassword){
        res.status(400).json({message:"some data missed fill all the necessary filds"})
    }
    if(!validEmail){
        res.status(400).json({message:"Please provide a valid email address"})
    }
    if(emailExist){
        return res.status(400).json({message: "user with this email already exist login instead"})
    }
    if(studentIdExist){
        return res.status(400).json({message: "user with this studentId already exist login instead"})
    }
    if (confirmPassword != password){
        return res.status(400).json({message:"the password don't match"})
    }

    try {
        await student.save()
        return res.status(202).json({message:"Successfully registered"})
    } catch (error) {
            return console.log(error);
    }


}

const login = async(req, res)=>{
    const {studentId, password} = req.body
    console.log(req.body);
    let studentIdExist 
     try {
        studentIdExist = await Student.findOne({studentId:studentId})
        console.log(studentIdExist);
     } catch (error) {
        console.log(error);
     }

     if(!studentIdExist){
        return res.status(404).json({message:"incorrect studentId or not registered"})
     }
     const isPasswordCorrect =  bcrypt.compareSync(password,studentIdExist.password)
     
     if(!isPasswordCorrect){
        return res.status(400).json({message:"password don't match"})
     }
     return res.status(200).json(studentIdExist._id)
}    

const getStudent = async (req, res)=>{
    let ID = req.params
    console.log(`here is the id ${ID}`);
    const student = await Student.findOne({_id:ID})
    if(!student){
        return res.status(404).json({message:"no student with this is found"})
    }
    return res.status(200).json(student)
}

module.exports = {
    register,
    login,
    getStudent
}