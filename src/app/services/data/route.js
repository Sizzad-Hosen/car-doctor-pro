import connectDB from "@/lib/connectDB";
import services from "@/lib/services";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection('services');

  
    await servicesCollection.deleteMany();

   
    const result = await servicesCollection.insertMany(services);

   
    return new NextResponse(JSON.stringify({ message: "Seed added successfully", insertedCount: result.insertedCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error inserting services:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to insert services' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
