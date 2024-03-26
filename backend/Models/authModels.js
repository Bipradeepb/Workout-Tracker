
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema=mongoose.Schema;

const userSchema=new Schema({

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});

//static method for login

userSchema.statics.login=async function(email,password){

    const user= await this.findOne({email});

    if(!user)
    {
        throw Error('Invalid Email');
    }

    //try to match the given password with hashed password
    const match=await bcrypt.compare(password,user.password);

    if(!match)
    {
        throw Error('Incorrect password.');
    }

    return user;
}

//static method for sign up

userSchema.statics.signup=async function(email,password){

    const exists= await this.findOne({email});

    if(exists)
    {
        throw Error('Email already in use');
    }

    //hash the password
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);

    const user =await this.create({email,password:hash});

    return user;
}



const User=mongoose.model('User',userSchema);

export default User;