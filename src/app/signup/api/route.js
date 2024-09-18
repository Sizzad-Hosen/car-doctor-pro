import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";

export const POST = async(request)=>{
   const newUser = await request.json();
   try{
    const db = await connectDB();
    const userCollection = await db.collection('users');
    const exist =await userCollection.findOne({email:newUser.email});
    if(exist)
    {
        return Response.json({message:"user exist"}, {status:304}) 
    }
    const hashPasssword = bcrypt.hashSync(newUser.password, 14);
    const resp = await userCollection.insertOne({...newUser,password:hashPasssword});
    return Response.json({message:"user created"}, {status:200})
   }catch(err){
    return Response.json({message:"something went wrong"}, {status:500})
   }
}

