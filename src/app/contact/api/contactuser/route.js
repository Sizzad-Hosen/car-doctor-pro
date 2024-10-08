import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
 
    const newContactUser = await request.json();
  
    const db = await connectDB();
    const contactCollection = db.collection('contact');
    
 
    const contactUser = await contactCollection.insertOne(newContactUser);
  
    return new NextResponse(JSON.stringify({ message: "New contact user comment successfully" }), {
      status: 201, 
    });

  } catch (error) {
    console.error('Error fetching service:', error);
    
    return new NextResponse(JSON.stringify({ error: 'Failed to add contact user' }), {
      status: 500,
    });
  }
};
