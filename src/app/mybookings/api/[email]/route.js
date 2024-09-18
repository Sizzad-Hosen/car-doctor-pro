

import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, {params})=> {
  try {
    const db = await connectDB();
    const bookingCollection = db.collection('booking');
  
    const myBookings = await bookingCollection.find({email :params.email}).toArray();
    
    return NextResponse.json({myBookings});

  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
}
