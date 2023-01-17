import User from '../model/user';
import bcrypt from 'bcryptjs'

export const getAllUser = async(req,resp,next) => {
    let users;
    try{
        users = await User.find();
    } catch(err){
        console.log(err)
    }
    if(!users){
        return resp.status(404).json({message:"No users found"})
    }
    return resp.status(200).json({users});
}
export const signup = async (req,resp,next) => {
    const {name,email,password} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err) {
        return console.log(err);
    }
    if(existingUser){
        return resp.status(400).json({message:"User Already Exists! Login Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    });
    try{
        await user.save();
    } catch(err){
        return console.log(err);
    }
    return resp.status(201).json({user})
}

export const login = async (req,resp,next) => {
    const {email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err) {
        return console.log(err);
    }
    if(!existingUser){
        return resp.status(404).json({message:"Couldn't Find User by this Email"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return resp.status(400).json({message:"Incorect Password!"})
    }
    return resp.status(200).json({message:"Login Successful",user:existingUser})
}