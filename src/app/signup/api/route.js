import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
   const newUser = await request.json();
   try{
    const db = await connectDB();
    const userCollection = await db.collection('users');
    const exist =await userCollection.findOne({email:newUser.email});
    if(exist)
    {
        return NextResponse.json({message:"user exist"}, {status:304}) 
    }
    const hashPasssword = bcrypt.hashSync(newUser.password, 14);
    const resp = await userCollection.insertOne({...newUser,password:hashPasssword});
    return NextResponse.json({message:"user created"}, {status:200})
   }catch(err){
    return NextResponse.json({message:"something went wrong"}, {status:500})
   }
}

